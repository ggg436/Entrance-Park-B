import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Upload, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  ChevronRight,
  ExternalLink,
  BarChart,
  Clock,
  Star,
  Users
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { analyzeResume } from '@/services/aiService';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface CVAnalyzerProps {
  jobs: any[];
  courses: any[];
}

const CVAnalyzer: React.FC<CVAnalyzerProps> = ({ jobs, courses }) => {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('feedback');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type (PDF or DOC/DOCX)
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error('Please upload a PDF or Word document');
        return;
      }
      
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      setFile(selectedFile);
      
      // For demo purposes, we'll simulate extracting text from the file
      // In a real implementation, you would use a PDF/DOCX parsing library
      // For now, we'll just use the file name and a mock text
      setResumeText(`Resume for ${selectedFile.name.split('.')[0]}\n\nSKILLS\n- JavaScript\n- React\n- Node.js\n- UI/UX Design\n- Project Management\n\nEXPERIENCE\nSenior Frontend Developer at Tech Corp (2020-Present)\n- Led development of responsive web applications\n- Optimized performance by 40%\n- Mentored junior developers\n\nUI Developer at Creative Agency (2018-2020)\n- Designed and developed user interfaces\n- Collaborated with UX designers\n\nEDUCATION\nBachelor of Computer Science, University of Technology (2014-2018)`);
      
      toast.success('Resume uploaded successfully');
    }
  };
  
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  const analyzeCV = async () => {
    if (!resumeText) {
      toast.error('Please upload a resume first');
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // In a real implementation, we would extract text from the PDF/DOCX here
      // Then pass the text to the analyzeResume function
      const analysisResults = await analyzeResume(resumeText, jobs, courses)
        .catch(error => {
          console.error('Error in resume analysis:', error);
          return {
            skills: [],
            missingSkills: [],
            relevantJobs: [],
            recommendedCourses: [],
            overallFeedback: "There was an error analyzing your resume. Please try again.",
            improvementAreas: [],
            strengthAreas: [],
            careerPathSuggestions: []
          };
        });
        
      setResults(analysisResults);
      setActiveTab('feedback');
      
      if (analysisResults.overallFeedback === "There was an error analyzing your resume. Please try again.") {
        toast.error('Failed to analyze resume. Please try again.');
      } else {
        toast.success('Analysis completed successfully');
      }
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setResults({
        skills: [],
        missingSkills: [],
        relevantJobs: [],
        recommendedCourses: [],
        overallFeedback: "There was an error analyzing your resume. Please try again.",
        improvementAreas: [],
        strengthAreas: [],
        careerPathSuggestions: []
      });
      toast.error('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="shadow-lg border-0 rounded-3xl overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6">
        <h2 className="text-3xl font-bold">CV Analyzer</h2>
        <p className="text-purple-100 mt-1">
          Upload your resume for AI analysis, job recommendations, and skills assessment
        </p>
      </div>
      
      <CardContent className="p-6">
        {!file ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Upload Your Resume</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Upload your resume in PDF or Word format to get AI-powered analysis, 
              job matches, and skill recommendations
            </p>
            <Button 
              onClick={triggerFileUpload} 
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Upload className="mr-2 h-4 w-4" /> Upload Resume
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />
          </div>
        ) : !results ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-800">{file.name}</h3>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • Uploaded {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={triggerFileUpload}
              >
                Change File
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 border">
              <div className="text-sm font-medium text-gray-700 mb-2">Resume Preview</div>
              <div className="bg-white border rounded-lg p-4 text-sm text-gray-600 max-h-60 overflow-y-auto whitespace-pre-wrap">
                {resumeText}
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={analyzeCV} 
                disabled={isAnalyzing}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8"
              >
                {isAnalyzing ? (
                  <>
                    <span className="mr-2">Analyzing...</span>
                    <div className="animate-spin w-4 h-4 border-2 border-white rounded-full border-t-transparent" />
                  </>
                ) : (
                  <>Analyze Resume</>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-800">{file.name}</h3>
                  <p className="text-sm text-gray-500">
                    Analysis Complete • {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setFile(null);
                  setResumeText('');
                  setResults(null);
                }}
              >
                Upload New Resume
              </Button>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b mb-4">
                <div className="flex space-x-6">
                  <button 
                    className={`pb-2 px-1 ${activeTab === 'feedback' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('feedback')}
                  >
                    Feedback
                  </button>
                  <button 
                    className={`pb-2 px-1 ${activeTab === 'skills' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('skills')}
                  >
                    Skills Analysis
                  </button>
                  <button 
                    className={`pb-2 px-1 ${activeTab === 'jobs' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('jobs')}
                  >
                    Recommended Jobs
                  </button>
                  <button 
                    className={`pb-2 px-1 ${activeTab === 'courses' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('courses')}
                  >
                    Recommended Courses
                  </button>
                </div>
              </div>
              
              <TabsContent value="feedback" className="mt-6 space-y-6">
                <div className={`rounded-xl p-6 ${results.overallFeedback.includes('error') ? 'bg-blue-50 border border-blue-200' : 'bg-blue-50 border border-blue-200'}`}>
                  <h3 className="text-lg font-medium text-blue-700 mb-3">Overall Assessment</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {results.overallFeedback}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-green-700 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Key Strengths
                    </h3>
                    <ul className="space-y-2">
                      {results.strengthAreas.map((strength: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-amber-700 mb-3 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {results.improvementAreas.map((area: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <AlertCircle className="w-4 h-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-purple-700 mb-3">Suggested Career Paths</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.careerPathSuggestions.map((path: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-white text-purple-700 border-purple-300 px-3 py-1 text-sm">
                        {path}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="skills" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Your Skills</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {results.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="pt-4 border-t">
                      <div className="text-sm font-medium text-gray-700 mb-1">Skills Match Score</div>
                      <Progress value={75} className="h-2" />
                      <p className="text-sm text-gray-600 mt-2">
                        Your skills align well with your career path. Continue developing them for greater opportunities.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white border rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Skills to Develop</h3>
                    <div className="flex flex-wrap gap-2">
                      {results.missingSkills.map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t text-sm text-gray-600">
                      <p>Developing these skills will significantly improve your job prospects and career advancement opportunities.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-blue-700 mb-3">Skill Development Strategy</h3>
                  <p className="text-gray-700 mb-4">
                    Based on your current skills and career path, we recommend focusing on these skill areas:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {['Technical Skills', 'Communication', 'Leadership'].map((area, index) => (
                      <div key={index} className="bg-white rounded-lg border p-4">
                        <h4 className="font-medium text-gray-800 mb-2">{area}</h4>
                        <p className="text-sm text-gray-600">
                          {area === 'Technical Skills' 
                            ? 'Focus on expanding your technical expertise in your core area.'
                            : area === 'Communication'
                            ? 'Improve written and verbal communication for better team collaboration.'
                            : 'Develop leadership skills to advance your career to senior positions.'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="jobs" className="mt-6">
                <div className="space-y-4">
                  {results.relevantJobs.length > 0 ? (
                    results.relevantJobs.map((job: any, index: number) => (
                      <div key={index} className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg text-gray-800">{job.position}</h3>
                            <p className="text-gray-600">{job.company}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {job.tags.slice(0, 3).map((tag: string, idx: number) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-gray-50">
                                  {tag}
                                </Badge>
                              ))}
                              {job.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs bg-gray-50">
                                  +{job.tags.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">${job.hourlyRate}/hr</div>
                            <div className="text-sm text-gray-500">{job.location}</div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-3 border-t">
                          <div className="flex items-center text-sm text-gray-500">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {job.experience || 'All levels'}
                          </div>
                          <Link to={`/dashboard/jobs/${job.id}`}>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4">
                              View Job <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                      <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium text-gray-900">No matching jobs found</h3>
                      <p className="mt-2 text-gray-500">
                        We couldn't find jobs matching your profile. Try exploring all available positions.
                      </p>
                      <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white" asChild>
                        <Link to="/dashboard/jobs">Browse All Jobs</Link>
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 text-center">
                  <Link to="/dashboard/jobs">
                    <Button variant="outline" className="text-blue-600 border-blue-200">
                      View All Available Jobs <ExternalLink className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
              
              <TabsContent value="courses" className="mt-6">
                <div className="space-y-4">
                  {results.recommendedCourses.length > 0 ? (
                    results.recommendedCourses.map((course: any, index: number) => (
                      <div key={index} className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex">
                          <div 
                            className="w-16 h-16 rounded-lg mr-4 bg-cover bg-center flex-shrink-0"
                            style={{
                              backgroundImage: `url(${course.image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=300&h=200'})`,
                              backgroundColor: course.color || '#4f46e5'
                            }}
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-lg text-gray-800">{course.title}</h3>
                            <p className="text-gray-600 text-sm">{course.instructor}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {course.duration}
                              </div>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                {course.rating}
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {course.students.toLocaleString()} students
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="font-bold text-gray-800">{course.price}</div>
                            <Badge variant="outline" className="mt-1 bg-gray-50">
                              {course.level}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-3 border-t">
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                            {course.category}
                          </Badge>
                          <Link to="/dashboard/courses">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4">
                              View Course <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                      <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium text-gray-900">No course recommendations yet</h3>
                      <p className="mt-2 text-gray-500">
                        Based on your profile, we don't have specific course recommendations.
                        Browse our full catalog to find courses you're interested in.
                      </p>
                      <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white" asChild>
                        <Link to="/dashboard/courses">Browse All Courses</Link>
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 text-center">
                  <Link to="/dashboard/courses">
                    <Button variant="outline" className="text-green-600 border-green-200">
                      View All Available Courses <ExternalLink className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
      
      {!file && (
        <CardFooter className="bg-gray-50 border-t p-4">
          <div className="flex items-center text-gray-600 text-sm">
            <BarChart className="w-4 h-4 mr-2 text-gray-500" />
            The CV Analyzer uses AI to assess your resume, recommend relevant jobs and courses, 
            and provide personalized career insights.
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default CVAnalyzer; 