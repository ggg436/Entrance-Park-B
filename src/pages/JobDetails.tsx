import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Users, Calendar, ArrowLeft, Bookmark, FileText } from 'lucide-react';

// Mock job data (should be replaced with real data or context/store)
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
    applicants: 32,
    about: 'As a Product Designer in Travaloka, you’ll focus on design user-friendly properties features for both users and partners. You’ll work closely with product managers, engineers, and other designers to create seamless experiences.',
    qualifications: [
      'At least 2 years of relevant experience in product design or related area.',
      'Proficient in Figma and prototyping tools.',
      'Strong portfolio of design projects.'
    ],
    responsibilities: [
      'Design and prototype user interfaces for key features and products/workflows across multiple devices.',
      'Collaborate with engineers, product managers, and other designers.',
      'Conduct user research and usability testing.'
    ],
    attachments: [
      { name: 'UIUX Designer.pdf', url: '#' },
      { name: 'Company_Brochure.pdf', url: '#' }
    ],
    similarJobs: [
      { id: 2, title: 'Lead UI Designer', company: 'Local Company', type: 'Full Time', location: 'Indonesia', logo: null, logoLetter: 'L' },
      { id: 3, title: 'Sr. UX Designer', company: 'Blue Studio', type: 'Full Time', location: 'Remote', logo: null, logoLetter: 'B' },
      { id: 4, title: 'AI UI Designer', company: 'AI Studio', type: 'Contract', location: 'Remote', logo: null, logoLetter: 'A' }
    ],
    otherJobs: [
      { id: 5, title: 'Frontend Dev', company: 'Pixel Studio', type: 'Full Time', location: 'Remote', logo: null, logoLetter: 'P' }
    ]
  },
  // ... more jobs ...
];

const JobDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = JOBS.find(j => j.id === Number(id)) || JOBS[0];

  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-gray-50 flex flex-col items-center py-8 px-2">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 p-8">
          <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
          </Button>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-700">
              {job.logo ? <img src={job.logo} alt={job.company} className="w-full h-full object-cover rounded-xl" /> : job.logoLetter}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{job.title}</h1>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Briefcase className="h-4 w-4" /> {job.company}
                <MapPin className="h-4 w-4 ml-4" /> {job.location}
              </div>
            </div>
            <div className="ml-auto flex gap-2">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6"
                onClick={() => navigate(`/dashboard/jobs/apply/${id}`)}
              >
                Apply Now
              </Button>
              <Button variant="outline" size="icon" className="rounded-lg border-gray-200">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
            <Users className="h-4 w-4" /> {job.applicants} Applicants
            <Calendar className="h-4 w-4 ml-4" /> {job.posted}
            <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{job.type}</span>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">About the Role</h2>
            <p className="text-gray-700 leading-relaxed">{job.about}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Qualifications</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {job.qualifications.map((q, i) => <li key={i}>{q}</li>)}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Responsibilities</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Attachments</h2>
            <div className="flex gap-4">
              {job.attachments.map((a, i) => (
                <a key={i} href={a.url} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-blue-700">
                  <FileText className="h-4 w-4" /> {a.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="w-full md:w-80 bg-gray-50 border-l border-gray-200 p-6 flex flex-col gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Similar Jobs</h3>
            <div className="space-y-4">
              {job.similarJobs.map((sj) => (
                <div key={sj.id} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-700">{sj.logoLetter}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">{sj.title}</div>
                    <div className="text-xs text-gray-500">{sj.company} • {sj.type}</div>
                  </div>
                  <Button variant="outline" size="icon" className="rounded-lg border-gray-200">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Other Jobs from {job.company}</h3>
            <div className="space-y-4">
              {job.otherJobs.map((oj) => (
                <div key={oj.id} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-700">{oj.logoLetter}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">{oj.title}</div>
                    <div className="text-xs text-gray-500">{oj.company} • {oj.type}</div>
                  </div>
                  <Button variant="outline" size="icon" className="rounded-lg border-gray-200">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails; 