import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Download, FileText, Plus, Trash2, Upload, Zap, Loader2, Save } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { getAISuggestions, enhanceJobDescription } from '@/services/aiService';
import { generatePDF, generatePDFFromTemplate } from '@/services/pdfService';
import { saveCV, saveCVDraft, getAllCVDrafts, loadCV } from '@/services/storageService';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { CVPreview } from '@/components/CVPreview';

// Direct declaration of mock jobs for the CV Analyzer
const jobs = [
  {
    id: 1,
    date: '20 Apr, 2025',
    company: 'Amazon',
    position: 'Senior UI/UX Designer',
    tags: ['Full time', 'Senior level', 'Distant', 'Project work'],
    hourlyRate: 250,
    location: 'San Francisco, CA',
    experience: 'Senior',
    perMonth: '$4000',
    logoUrl: null,
    logo: 'amazon',
    isDraft: false,
  },
  {
    id: 2,
    date: '20 Apr, 2025',
    company: 'Google',
    position: 'Senior UI/UX Designer',
    tags: ['Full time', 'Senior level', 'Distant', 'Project work'],
    hourlyRate: 250,
    location: 'San Francisco, CA',
    experience: 'Senior',
    perMonth: '$4200',
    logoUrl: null,
    logo: 'google',
    isDraft: false,
  },
  {
    id: 3,
    date: '20 Apr, 2025',
    company: 'Dribbble',
    position: 'Senior UI/UX Designer',
    tags: ['Full time', 'Senior level', 'Distant', 'Project work'],
    hourlyRate: 250,
    location: 'San Francisco, CA',
    experience: 'Senior',
    perMonth: '$4500',
    logoUrl: null,
    logo: 'dribbble',
    isDraft: false,
  }
];

// Mock course data for the CV Analyzer
const courses = [
  {
    id: 1,
    title: 'Python Programming Fundamentals',
    instructor: 'Dr. Rajesh Sharma',
    level: 'Beginner',
    duration: '6 weeks',
    lessons: 24,
    students: 1250,
    rating: 4.8,
    price: '$59',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-blue-600',
    popular: true,
    category: 'Programming'
  },
  {
    id: 2,
    title: 'Data Science Essentials',
    instructor: 'Arun Patel',
    level: 'Intermediate',
    duration: '8 weeks',
    lessons: 32,
    students: 875,
    rating: 4.6,
    price: '$79',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-green-600',
    popular: true,
    category: 'Data Science'
  },
  {
    id: 3,
    title: 'Web Development with React',
    instructor: 'Priya Gupta',
    level: 'Intermediate',
    duration: '10 weeks',
    lessons: 40,
    students: 1120,
    rating: 4.9,
    price: '$89',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-purple-600',
    popular: true,
    category: 'Web Development'
  },
  {
    id: 4,
    title: 'Machine Learning for Business',
    instructor: 'Dr. Mira Khan',
    level: 'Advanced',
    duration: '12 weeks',
    lessons: 48,
    students: 950,
    rating: 4.7,
    price: '$129',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-red-600',
    popular: false,
    category: 'Machine Learning'
  },
  {
    id: 5,
    title: 'Digital Marketing Masterclass',
    instructor: 'Vikram Singh',
    level: 'Beginner',
    duration: '6 weeks',
    lessons: 24,
    students: 1560,
    rating: 4.5,
    price: '$69',
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-orange-600',
    popular: true,
    category: 'Marketing'
  }
];

type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
};

type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
};

type Skill = {
  id: string;
  name: string;
  level: number;
};

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  url: string;
};

type CVData = {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
    photo: string | null;
  };
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  languages: { language: string; proficiency: string }[];
  references: { name: string; position: string; company: string; contact: string }[];
};

const CVMaker = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [templateStyle, setTemplateStyle] = useState('modern');
  const [aiSuggestions, setAiSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [skillSuggestions, setSkillSuggestions] = useState<string[]>([]);
  
  const [cvData, setCVData] = useState<CVData>({
    personalInfo: {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      summary: '',
      photo: null,
    },
    experiences: [],
    education: [],
    skills: [],
    projects: [],
    languages: [],
    references: []
  });

  const [currentExperience, setCurrentExperience] = useState<Experience>({
    id: '',
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false,
  });
  
  const [currentSkill, setCurrentSkill] = useState({ name: '', level: 3 });

  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const [showDraftsDialog, setShowDraftsDialog] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [draftName, setDraftName] = useState('');
  const [pdfGenerating, setPdfGenerating] = useState(false);

  // Load saved data from local storage on initial load
  useEffect(() => {
    const savedData = localStorage.getItem('cv_maker_data');
    if (savedData) {
      try {
        setCVData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved CV data:', error);
      }
    }
  }, []);
  
  // Effect to generate title suggestions when AI is enabled
  useEffect(() => {
    if (aiSuggestions && 
        cvData.personalInfo.fullName && 
        (cvData.experiences.length > 0 || cvData.skills.length > 0)) {
      generateTitleSuggestions();
    }
  }, [aiSuggestions, cvData.personalInfo.fullName]);

  // Effect to save data to local storage when it changes
  useEffect(() => {
    localStorage.setItem('cv_maker_data', JSON.stringify(cvData));
  }, [cvData]);
  
  // Load drafts when dialog opens
  useEffect(() => {
    if (showDraftsDialog) {
      const allDrafts = getAllCVDrafts();
      setDrafts(allDrafts);
    }
  }, [showDraftsDialog]);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCVData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const addExperience = () => {
    const newExperience = {
      ...currentExperience,
      id: Date.now().toString(),
    };
    
    setCVData({
      ...cvData,
      experiences: [...cvData.experiences, newExperience],
    });
    
    setCurrentExperience({
      id: '',
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false,
    });
    
    if (aiSuggestions) {
      generateSkillSuggestions();
    }
  };

  const removeExperience = (id: string) => {
    setCVData({
      ...cvData,
      experiences: cvData.experiences.filter(exp => exp.id !== id),
    });
  };

  const addSkill = () => {
    if (currentSkill.name.trim() !== '') {
      setCVData({
        ...cvData,
        skills: [...cvData.skills, { ...currentSkill, id: Date.now().toString() }],
      });
      setCurrentSkill({ name: '', level: 3 });
    }
  };

  const removeSkill = (id: string) => {
    setCVData({
      ...cvData,
      skills: cvData.skills.filter(skill => skill.id !== id),
    });
  };

  const generateAISummary = async () => {
    if (!cvData.personalInfo.fullName || (!cvData.experiences.length && !cvData.skills.length)) {
      toast.warning('Please add your name and at least one experience or skill first');
      return;
    }
    
    setIsLoading(true);
    try {
      // Gather context for the AI
      const expContext = cvData.experiences.map(exp => 
        `${exp.position} at ${exp.company}`
      ).join(', ');
      
      const skillContext = cvData.skills.map(skill => skill.name).join(', ');
      
      const context = `Name: ${cvData.personalInfo.fullName}
                      Title: ${cvData.personalInfo.title}
                      Experience: ${expContext}
                      Skills: ${skillContext}`;
      
      const [summary] = await getAISuggestions({
        type: 'summary',
        content: context
      });
      
      setCVData({
        ...cvData,
        personalInfo: {
          ...cvData.personalInfo,
          summary
        }
      });
      
      toast.success('AI summary generated successfully!');
    } catch (error) {
      console.error('Error generating AI summary:', error);
      toast.error('Failed to generate AI summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const enhanceDescription = async () => {
    if (!currentExperience.description.trim()) {
      toast.warning('Please add a description first');
      return;
    }
    
    setIsLoading(true);
    try {
      const enhancedDescription = await enhanceJobDescription(currentExperience.description);
      
      setCurrentExperience({
        ...currentExperience,
        description: enhancedDescription
      });
      
      toast.success('Description enhanced successfully!');
    } catch (error) {
      console.error('Error enhancing description:', error);
      toast.error('Failed to enhance description. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const generateTitleSuggestions = async () => {
    setIsLoading(true);
    try {
      // Create context from experiences and skills
      const context = cvData.experiences.map(exp => 
        `${exp.position} at ${exp.company}`
      ).join(', ');
      
      const skills = cvData.skills.map(skill => skill.name).join(', ');
      
      const fullContext = `${context}. Skills: ${skills}`;
      
      const suggestions = await getAISuggestions({
        type: 'title',
        content: fullContext || cvData.personalInfo.title || 'professional'
      });
      
      setTitleSuggestions(suggestions);
    } catch (error) {
      console.error('Error generating title suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const generateSkillSuggestions = async () => {
    if (!cvData.experiences.length && !cvData.personalInfo.title) {
      return;
    }
    
    setIsLoading(true);
    try {
      // Create context from experiences or job title
      let context = cvData.personalInfo.title;
      
      if (cvData.experiences.length > 0) {
        context = cvData.experiences.map(exp => 
          `${exp.position} at ${exp.company}`
        ).join(', ');
      }
      
      const suggestions = await getAISuggestions({
        type: 'skills',
        content: context
      });
      
      setSkillSuggestions(suggestions.filter(skill => 
        !cvData.skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
      ));
    } catch (error) {
      console.error('Error generating skill suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const addSkillFromSuggestion = (skill: string) => {
    setCVData({
      ...cvData,
      skills: [...cvData.skills, { name: skill, level: 3, id: Date.now().toString() }]
    });
    
    setSkillSuggestions(skillSuggestions.filter(s => s !== skill));
  };
  
  const useTitle = (title: string) => {
    setCVData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        title
      }
    });
  };

  const generateCV = async () => {
    if (!cvData.personalInfo.fullName) {
      toast.warning('Please add your name first');
      return;
    }
    
    setPdfGenerating(true);
    try {
      // Generate the PDF based on template
      const filename = `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`;
      
      // Use direct template-based generation for better formatting
      const success = await generatePDFFromTemplate(cvData, templateStyle, filename);
      
      if (success) {
        toast.success('CV generated successfully!');
      } else {
        toast.error('Failed to generate CV. Please try again.');
      }
    } catch (error) {
      console.error('Error generating CV:', error);
      toast.error('Failed to generate CV. Please try again.');
    } finally {
      setPdfGenerating(false);
    }
  };

  const generatePreviewPDF = async () => {
    setIsPdfGenerating(true);
    try {
      const filename = `${cvData.personalInfo.fullName || 'CV'}_preview.pdf`;
      const success = await generatePDF('cv-preview', filename);
      
      if (success) {
        toast.success('Preview downloaded');
      } else {
        toast.error('Failed to generate preview');
      }
    } catch (error) {
      console.error('Error generating preview:', error);
      toast.error('Failed to generate preview');
    } finally {
      setIsPdfGenerating(false);
    }
  };

  const saveDraft = () => {
    if (!cvData.personalInfo.fullName && !draftName) {
      toast.warning('Please provide a name for your draft');
      return;
    }
    
    const name = draftName || cvData.personalInfo.fullName || `Draft ${new Date().toLocaleString()}`;
    const id = saveCVDraft(name, cvData);
    
    if (id) {
      toast.success(`Draft saved: ${name}`);
      setDraftName('');
    } else {
      toast.error('Failed to save draft');
    }
  };
  
  const loadDraft = (draft: any) => {
    setCVData(draft.data);
    setShowDraftsDialog(false);
    toast.success(`Draft loaded: ${draft.name}`);
  };

  // Add photo upload handling functionality to the CVMaker component

  // In the CVMaker component, add a file input reference and photo handling functions
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Photo size should be less than 2MB');
      return;
    }
    
    // Check file type
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const photoData = e.target?.result as string;
      setCVData({
        ...cvData,
        personalInfo: {
          ...cvData.personalInfo,
          photo: photoData
        }
      });
      toast.success('Photo uploaded successfully');
    };
    reader.onerror = () => {
      toast.error('Failed to upload photo. Please try again.');
    };
    reader.readAsDataURL(file);
  };
  
  const triggerPhotoUpload = () => {
    fileInputRef.current?.click();
  };
  
  const removePhoto = () => {
    setCVData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        photo: null
      }
    });
    toast.success('Photo removed');
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <Card className="shadow-lg border-0 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-3xl font-bold">AI CV Maker</CardTitle>
                  <CardDescription className="text-blue-100 mt-1">Create a professional CV in minutes with AI assistance</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Label htmlFor="ai-toggle" className="text-sm text-blue-100">AI Suggestions</Label>
                  <Switch
                    id="ai-toggle"
                    checked={aiSuggestions}
                    onCheckedChange={setAiSuggestions}
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full rounded-none grid grid-cols-6 bg-slate-100">
                  <TabsTrigger value="personal" className="data-[state=active]:bg-white rounded-t-lg">Personal</TabsTrigger>
                  <TabsTrigger value="experience" className="data-[state=active]:bg-white rounded-t-lg">Experience</TabsTrigger>
                  <TabsTrigger value="education" className="data-[state=active]:bg-white rounded-t-lg">Education</TabsTrigger>
                  <TabsTrigger value="skills" className="data-[state=active]:bg-white rounded-t-lg">Skills</TabsTrigger>
                  <TabsTrigger value="projects" className="data-[state=active]:bg-white rounded-t-lg">Projects</TabsTrigger>
                  <TabsTrigger value="more" className="data-[state=active]:bg-white rounded-t-lg">More</TabsTrigger>
                </TabsList>
                
                {/* Remove the CV Analyzer tab content */}
                
                <TabsContent value="personal" className="p-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-3/4 flex flex-col gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input 
                            id="fullName" 
                            name="fullName" 
                            placeholder="John Doe"
                            value={cvData.personalInfo.fullName}
                            onChange={handlePersonalInfoChange}
                            className="mt-1 rounded-xl"
                          />
                        </div>
                        <div>
                          <Label htmlFor="title">Professional Title</Label>
                          <Input 
                            id="title" 
                            name="title" 
                            placeholder="Software Engineer"
                            value={cvData.personalInfo.title}
                            onChange={handlePersonalInfoChange}
                            className="mt-1 rounded-xl"
                          />
                          {aiSuggestions && titleSuggestions.length > 0 && (
                            <div className="mt-2 flex gap-2 flex-wrap">
                              {titleSuggestions.map((title, index) => (
                                <Badge 
                                  key={index} 
                                  variant="outline" 
                                  className="cursor-pointer bg-blue-50 hover:bg-blue-100"
                                  onClick={() => useTitle(title)}
                                >
                                  {title}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-1/4 flex flex-col items-center">
                        <div 
                          className="w-32 h-32 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border-2 border-dashed border-slate-300 cursor-pointer relative"
                          onClick={triggerPhotoUpload}
                          style={{ 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundImage: cvData.personalInfo.photo ? `url(${cvData.personalInfo.photo})` : 'none'
                          }}
                        >
                          {!cvData.personalInfo.photo && (
                            <Upload className="w-8 h-8 text-slate-400" />
                          )}
                          
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center transition-all duration-200">
                            <Upload className="w-6 h-6 text-white opacity-0 hover:opacity-100" />
                          </div>
                        </div>
                        
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handlePhotoUpload}
                          accept="image/jpeg,image/png,image/gif"
                          className="hidden"
                        />
                        
                        <div className="flex gap-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs rounded-xl" 
                            onClick={triggerPhotoUpload}
                          >
                            {cvData.personalInfo.photo ? 'Change Photo' : 'Upload Photo'}
                          </Button>
                          {cvData.personalInfo.photo && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs text-red-500 hover:text-red-600 rounded-xl" 
                              onClick={removePhoto}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="john@example.com"
                          value={cvData.personalInfo.email}
                          onChange={handlePersonalInfoChange}
                          className="mt-1 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          placeholder="+1 123 456 7890"
                          value={cvData.personalInfo.phone}
                          onChange={handlePersonalInfoChange}
                          className="mt-1 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          name="location" 
                          placeholder="City, Country"
                          value={cvData.personalInfo.location}
                          onChange={handlePersonalInfoChange}
                          className="mt-1 rounded-xl"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website/Portfolio</Label>
                        <Input 
                          id="website" 
                          name="website" 
                          placeholder="https://yourportfolio.com"
                          value={cvData.personalInfo.website}
                          onChange={handlePersonalInfoChange}
                          className="mt-1 rounded-xl"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea 
                        id="summary" 
                        name="summary" 
                        placeholder="Write a compelling professional summary..."
                        value={cvData.personalInfo.summary}
                        onChange={handlePersonalInfoChange}
                        className="mt-1 h-32 rounded-xl"
                      />
                      {aiSuggestions && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2" 
                          onClick={generateAISummary}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                          ) : (
                            <><Zap className="w-4 h-4 mr-2" /> Generate AI Summary</>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="experience" className="p-6">
                  <div className="space-y-6">
                    <Card className="border border-slate-200 rounded-2xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl">Add Work Experience</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="position">Position/Title</Label>
                              <Input 
                                id="position"
                                value={currentExperience.position}
                                onChange={(e) => setCurrentExperience({...currentExperience, position: e.target.value})}
                                placeholder="Senior Developer"
                                className="mt-1 rounded-xl"
                              />
                            </div>
                            <div>
                              <Label htmlFor="company">Company</Label>
                              <Input 
                                id="company"
                                value={currentExperience.company}
                                onChange={(e) => setCurrentExperience({...currentExperience, company: e.target.value})}
                                placeholder="Acme Inc."
                                className="mt-1 rounded-xl"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="startDate">Start Date</Label>
                              <Input 
                                id="startDate"
                                type="month"
                                value={currentExperience.startDate}
                                onChange={(e) => setCurrentExperience({...currentExperience, startDate: e.target.value})}
                                className="mt-1 rounded-xl"
                              />
                            </div>
                            <div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="endDate">End Date</Label>
                                <div className="flex items-center gap-2">
                                  <Label htmlFor="current" className="text-sm">Current</Label>
                                  <Switch
                                    id="current"
                                    checked={currentExperience.current}
                                    onCheckedChange={(checked) => setCurrentExperience({...currentExperience, current: checked})}
                                  />
                                </div>
                              </div>
                              <Input 
                                id="endDate"
                                type="month"
                                value={currentExperience.endDate}
                                onChange={(e) => setCurrentExperience({...currentExperience, endDate: e.target.value})}
                                disabled={currentExperience.current}
                                className="mt-1 rounded-xl"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="description">Description & Achievements</Label>
                            <Textarea 
                              id="description"
                              value={currentExperience.description}
                              onChange={(e) => setCurrentExperience({...currentExperience, description: e.target.value})}
                              placeholder="Describe your responsibilities and achievements..."
                              className="mt-1 h-24 rounded-xl"
                            />
                            {aiSuggestions && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mt-2" 
                                onClick={enhanceDescription}
                                disabled={isLoading || !currentExperience.description.trim()}
                              >
                                {isLoading ? (
                                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enhancing...</>
                                ) : (
                                  <><Zap className="w-4 h-4 mr-2" /> Enhance Description</>
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button 
                          onClick={addExperience} 
                          className="rounded-xl"
                          disabled={
                            !currentExperience.position.trim() || 
                            !currentExperience.company.trim() || 
                            !currentExperience.startDate || 
                            (!currentExperience.endDate && !currentExperience.current)
                          }
                        >
                          <Plus className="w-4 h-4 mr-2" /> Add Experience
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    {cvData.experiences.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Added Experiences</h3>
                        {cvData.experiences.map((exp) => (
                          <Card key={exp.id} className="rounded-xl bg-slate-50">
                            <CardContent className="p-4">
                              <div className="flex justify-between">
                                <div>
                                  <h4 className="font-medium">{exp.position}</h4>
                                  <p className="text-sm text-slate-600">{exp.company}</p>
                                  <p className="text-xs text-slate-500">
                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                  </p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)}>
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="skills" className="p-6">
                  <div className="space-y-6">
                    <Card className="border border-slate-200 rounded-2xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl">Add Skills</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <Label htmlFor="skillName">Skill Name</Label>
                            <Input 
                              id="skillName"
                              value={currentSkill.name}
                              onChange={(e) => setCurrentSkill({...currentSkill, name: e.target.value})}
                              placeholder="JavaScript"
                              className="mt-1 rounded-xl"
                            />
                          </div>
                          <div className="w-1/3">
                            <Label htmlFor="skillLevel">Skill Level</Label>
                            <Select 
                              value={currentSkill.level.toString()} 
                              onValueChange={(value) => setCurrentSkill({...currentSkill, level: parseInt(value)})}
                            >
                              <SelectTrigger className="mt-1 rounded-xl">
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">Beginner</SelectItem>
                                <SelectItem value="2">Elementary</SelectItem>
                                <SelectItem value="3">Intermediate</SelectItem>
                                <SelectItem value="4">Advanced</SelectItem>
                                <SelectItem value="5">Expert</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-end">
                            <Button 
                              onClick={addSkill} 
                              className="rounded-xl mb-0.5"
                              disabled={!currentSkill.name.trim()}
                            >
                              <Plus className="w-4 h-4 mr-2" /> Add
                            </Button>
                          </div>
                        </div>
                        {aiSuggestions && (
                          <div className="mt-4">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm mb-2 block">Suggested Skills Based on Your Experience</Label>
                              {!skillSuggestions.length && !isLoading && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={generateSkillSuggestions}
                                  disabled={isLoading}
                                >
                                  <Zap className="w-4 h-4 mr-2" /> Get Suggestions
                                </Button>
                              )}
                            </div>
                            
                            {isLoading ? (
                              <div className="flex justify-center py-4">
                                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                              </div>
                            ) : (
                              <div className="flex gap-2 flex-wrap">
                                {skillSuggestions.map((skill, index) => (
                                  <Badge 
                                    key={index} 
                                    variant="outline" 
                                    className="cursor-pointer bg-blue-50 hover:bg-blue-100"
                                    onClick={() => addSkillFromSuggestion(skill)}
                                  >
                                    + {skill}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    {cvData.skills.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Added Skills</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {cvData.skills.map((skill) => (
                            <Card key={skill.id} className="rounded-xl bg-slate-50">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h4 className="font-medium">{skill.name}</h4>
                                    <div className="flex mt-1">
                                      {Array(5).fill(0).map((_, i) => (
                                        <div 
                                          key={i} 
                                          className={`w-6 h-2 mr-1 rounded-full ${i < skill.level ? 'bg-blue-500' : 'bg-slate-300'}`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="icon" onClick={() => removeSkill(skill.id)}>
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="education" className="p-6">
                  <div className="flex items-center justify-center h-48 text-slate-500">
                    Education section content would go here
                  </div>
                </TabsContent>
                
                <TabsContent value="projects" className="p-6">
                  <div className="flex items-center justify-center h-48 text-slate-500">
                    Projects section content would go here
                  </div>
                </TabsContent>
                
                <TabsContent value="more" className="p-6">
                  <div className="flex items-center justify-center h-48 text-slate-500">
                    Additional information section would go here
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex justify-between p-6 border-t">
              <Dialog open={showDraftsDialog} onOpenChange={setShowDraftsDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-xl">
                    <Upload className="w-4 h-4 mr-2" /> Load Draft
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Load Saved Draft</DialogTitle>
                    <DialogDescription>
                      Select a previously saved draft to continue working on it.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="max-h-[300px] overflow-y-auto space-y-2 my-4">
                    {drafts.length > 0 ? (
                      drafts.map(draft => (
                        <div 
                          key={draft.id} 
                          className="p-3 border rounded-lg cursor-pointer hover:bg-slate-50"
                          onClick={() => loadDraft(draft)}
                        >
                          <div className="font-medium">{draft.name}</div>
                          <div className="text-xs text-slate-500">
                            Last updated: {new Date(draft.updatedAt).toLocaleString()}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-4 text-slate-500">
                        No saved drafts found
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowDraftsDialog(false)}>Cancel</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="rounded-xl">
                      <Save className="w-4 h-4 mr-2" /> Save Draft
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Save Draft</DialogTitle>
                      <DialogDescription>
                        Give your draft a name to easily find it later.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Label htmlFor="draftName" className="text-sm">Draft Name</Label>
                      <Input 
                        id="draftName"
                        value={draftName}
                        onChange={(e) => setDraftName(e.target.value)}
                        placeholder={cvData.personalInfo.fullName || "My CV Draft"}
                        className="mt-1"
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDraftName('')}>Cancel</Button>
                      <Button onClick={saveDraft}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button 
                  className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600"
                  onClick={generateCV}
                  disabled={pdfGenerating}
                >
                  {pdfGenerating ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                  ) : (
                    <><FileText className="w-4 h-4 mr-2" /> Generate CV</>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div className="w-full lg:w-1/3">
          <div className="sticky top-24">
            <Card className="shadow-lg border-0 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <CardTitle className="text-xl font-bold">Preview & Templates</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm mb-2 block">Choose Template</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        className={`border-2 rounded-xl overflow-hidden cursor-pointer ${templateStyle === 'modern' ? 'border-blue-500' : 'border-slate-200'}`}
                        onClick={() => setTemplateStyle('modern')}
                      >
                        <div className="bg-slate-800 h-4"></div>
                        <div className="p-2">
                          <div className="w-1/3 h-2 bg-slate-200 mb-1 rounded-full"></div>
                          <div className="w-1/2 h-2 bg-slate-200 mb-3 rounded-full"></div>
                          <div className="w-full h-1 bg-slate-100 mb-1"></div>
                          <div className="w-full h-1 bg-slate-100 mb-1"></div>
                          <div className="w-2/3 h-1 bg-slate-100 mb-1"></div>
                        </div>
                        <div className="text-xs text-center py-1 text-slate-600">Modern</div>
                      </div>
                      <div 
                        className={`border-2 rounded-xl overflow-hidden cursor-pointer ${templateStyle === 'classic' ? 'border-blue-500' : 'border-slate-200'}`}
                        onClick={() => setTemplateStyle('classic')}
                      >
                        <div className="bg-slate-100 p-2 text-center">
                          <div className="w-2/3 h-2 bg-slate-300 mx-auto mb-1 rounded-full"></div>
                        </div>
                        <div className="p-2">
                          <div className="w-1/3 h-2 bg-slate-200 mb-1 rounded-full"></div>
                          <div className="w-full h-1 bg-slate-100 mb-1"></div>
                          <div className="w-full h-1 bg-slate-100 mb-1"></div>
                          <div className="w-2/3 h-1 bg-slate-100 mb-1"></div>
                        </div>
                        <div className="text-xs text-center py-1 text-slate-600">Classic</div>
                      </div>
                      <div 
                        className={`border-2 rounded-xl overflow-hidden cursor-pointer ${templateStyle === 'creative' ? 'border-blue-500' : 'border-slate-200'}`}
                        onClick={() => setTemplateStyle('creative')}
                      >
                        <div className="flex h-12">
                          <div className="w-1/3 bg-slate-800"></div>
                          <div className="w-2/3 p-2">
                            <div className="w-2/3 h-1 bg-slate-200 mb-1 rounded-full"></div>
                            <div className="w-1/2 h-1 bg-slate-200 mb-1 rounded-full"></div>
                          </div>
                        </div>
                        <div className="text-xs text-center py-1 text-slate-600">Creative</div>
                      </div>
                      <div 
                        className={`border-2 rounded-xl overflow-hidden cursor-pointer ${templateStyle === 'minimal' ? 'border-blue-500' : 'border-slate-200'}`}
                        onClick={() => setTemplateStyle('minimal')}
                      >
                        <div className="p-2">
                          <div className="w-1/3 h-2 bg-slate-200 mb-3 rounded-full"></div>
                          <div className="w-full h-1 bg-slate-100 mb-1"></div>
                          <div className="w-full h-1 bg-slate-100 mb-1"></div>
                          <div className="w-2/3 h-1 bg-slate-100 mb-1"></div>
                        </div>
                        <div className="text-xs text-center py-1 text-slate-600">Minimal</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2 block">CV Preview</Label>
                    <div 
                      id="cv-preview" 
                      className="aspect-[3/4] bg-white rounded-xl border border-slate-200 relative overflow-hidden shadow-sm"
                    >
                      <CVPreview data={cvData} templateStyle={templateStyle} />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-xl"
                      onClick={generatePreviewPDF}
                      disabled={isPdfGenerating}
                    >
                      {isPdfGenerating ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> 
                      ) : (
                        <Download className="w-4 h-4 mr-2" />
                      )}
                      Download Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVMaker; 