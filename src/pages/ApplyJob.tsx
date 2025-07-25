import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Upload, Briefcase, MapPin, Calendar } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

// Mock job data - in real app this would come from an API
const JOBS = [
  {
    id: 1,
    title: 'UI/UX Designer',
    company: 'Pixel Studio',
    location: 'Yogyakarta, Indonesia',
    logo: null,
    logoLetter: 'P',
    type: 'Full Time',
    posted: '2 days ago',
    salary: '$4,000 - $6,000/month',
    about: 'As a Product Designer in Travaloka, you\'ll focus on design user-friendly properties features for both users and partners. You\'ll work closely with product managers, engineers, and other designers to create seamless experiences.',
    qualifications: [
      'At least 2 years of relevant experience in product design or related area.',
      'Proficient in Figma and prototyping tools.',
      'Strong portfolio of design projects.'
    ],
    responsibilities: [
      'Design and prototype user interfaces for key features and products/workflows across multiple devices.',
      'Collaborate with engineers, product managers, and other designers.',
      'Conduct user research and usability testing.'
    ]
  },
  // More jobs can be added here
];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  resumeFile: File | null;
  portfolioUrl: string;
  linkedinUrl: string;
  isNotified: boolean;
  termsAccepted: boolean;
  salaryExpectation: string;
  availableFrom: string;
  referral: string;
  questions: Record<string, string>;
}

const ApplyJob: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useUserProfile();
  
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resumeFileName, setResumeFileName] = useState<string>('');
  
  const [formData, setFormData] = useState<FormData>({
    fullName: profile?.displayName || '',
    email: profile?.email || '',
    phone: '',
    experience: '',
    coverLetter: '',
    resumeFile: null,
    portfolioUrl: '',
    linkedinUrl: '',
    isNotified: true,
    termsAccepted: false,
    salaryExpectation: '',
    availableFrom: '',
    referral: '',
    questions: {
      willingToRelocate: '',
      reasonForApplying: '',
      biggestStrength: ''
    }
  });
  
  useEffect(() => {
    // In a real app, fetch job data from API
    const jobId = Number(id);
    const foundJob = JOBS.find(j => j.id === jobId);
    
    if (foundJob) {
      setJob(foundJob);
    } else {
      // If job not found, show error and redirect
      toast.error('Job not found');
      navigate('/dashboard/jobs');
    }
    
    setLoading(false);
  }, [id, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleQuestionChange = (question: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      questions: {
        ...prev.questions,
        [question]: value
      }
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Resume file must be smaller than 5MB');
        return;
      }
      
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }
      
      setFormData(prev => ({ ...prev, resumeFile: file }));
      setResumeFileName(file.name);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone || !formData.experience || !formData.resumeFile || !formData.termsAccepted) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setSubmitting(true);
    
    try {
      // In a real app, this would send the data to an API
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Success message
      toast.success('Your application has been submitted successfully!');
      
      // Redirect to jobs page after submission
      navigate('/dashboard/jobs');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/dashboard/jobs')}>
            Browse All Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="max-w-3xl w-full">
        {/* Header with job info */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
          <Button variant="ghost" className="mb-4" onClick={() => navigate(`/dashboard/jobs/${id}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Job Details
          </Button>
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-700 flex-shrink-0">
              {job.logo ? <img src={job.logo} alt={job.company} className="w-full h-full object-cover rounded-xl" /> : job.logoLetter}
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm mt-1">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" /> {job.company}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" /> {job.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" /> Posted {job.posted}
                </div>
              </div>
              <div className="mt-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {job.type}
                </span>
                <span className="ml-2 text-sm font-medium text-gray-700">{job.salary}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Application Form */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold mb-6">Apply for {job.title} at {job.company}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Your phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience <span className="text-red-500">*</span></Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('experience', value)}
                    value={formData.experience}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">Less than 1 year</SelectItem>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Application Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Application Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're interested in this position and why you'd be a great fit"
                  className="min-h-[150px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="resumeFile">
                  Resume/CV <span className="text-red-500">*</span> <span className="text-gray-400 text-sm">(PDF or Word, max 5MB)</span>
                </Label>
                <div className="flex items-center gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => document.getElementById('resumeFile')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload File
                  </Button>
                  <input
                    id="resumeFile"
                    name="resumeFile"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                  {resumeFileName && (
                    <span className="text-sm text-gray-600">{resumeFileName}</span>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                  <Input
                    id="portfolioUrl"
                    name="portfolioUrl"
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={handleInputChange}
                    placeholder="https://your-portfolio.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    name="linkedinUrl"
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salaryExpectation">Salary Expectation</Label>
                  <Input
                    id="salaryExpectation"
                    name="salaryExpectation"
                    value={formData.salaryExpectation}
                    onChange={handleInputChange}
                    placeholder="Your expected salary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="availableFrom">Available From</Label>
                  <Input
                    id="availableFrom"
                    name="availableFrom"
                    type="date"
                    value={formData.availableFrom}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="referral">How did you hear about this position?</Label>
                <Input
                  id="referral"
                  name="referral"
                  value={formData.referral}
                  onChange={handleInputChange}
                  placeholder="LinkedIn, Company Website, Referral, etc."
                />
              </div>
            </div>
            
            {/* Additional Questions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Additional Questions</h3>
              
              <div className="space-y-2">
                <Label htmlFor="willingToRelocate">Are you willing to relocate for this position?</Label>
                <Select 
                  onValueChange={(value) => handleQuestionChange('willingToRelocate', value)}
                  value={formData.questions.willingToRelocate}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select answer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="negotiable">Negotiable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reasonForApplying">Why are you interested in working at {job.company}?</Label>
                <Textarea
                  id="reasonForApplying"
                  value={formData.questions.reasonForApplying}
                  onChange={(e) => handleQuestionChange('reasonForApplying', e.target.value)}
                  placeholder="Your answer"
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="biggestStrength">What's your biggest strength related to this role?</Label>
                <Textarea
                  id="biggestStrength"
                  value={formData.questions.biggestStrength}
                  onChange={(e) => handleQuestionChange('biggestStrength', e.target.value)}
                  placeholder="Your answer"
                  className="min-h-[100px]"
                />
              </div>
            </div>
            
            {/* Terms and Submission */}
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="isNotified" 
                  checked={formData.isNotified} 
                  onCheckedChange={(checked) => handleCheckboxChange('isNotified', checked === true)} 
                />
                <Label htmlFor="isNotified" className="text-sm leading-tight">
                  Notify me about similar job opportunities from {job.company}
                </Label>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="termsAccepted" 
                  checked={formData.termsAccepted} 
                  onCheckedChange={(checked) => handleCheckboxChange('termsAccepted', checked === true)} 
                  required
                />
                <Label htmlFor="termsAccepted" className="text-sm leading-tight">
                  I confirm that the information provided is accurate and I consent to the processing of my personal data for the purpose of this job application <span className="text-red-500">*</span>
                </Label>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob; 