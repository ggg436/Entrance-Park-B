import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  MapPin,
  Briefcase,
  Calendar,
  SlidersHorizontal,
  SortAsc,
  Bookmark,
  ChevronDown,
  Plus,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/hooks/useUserProfile';

const initialJobs = [
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
  },
  {
    id: 4,
    date: '20 Apr, 2025',
    company: 'Twitter',
    position: 'Senior UI/UX Designer',
    tags: ['Full time', 'Senior level', 'Distant', 'Project work'],
    hourlyRate: 250,
    location: 'San Francisco, CA',
    experience: 'Senior',
    perMonth: '$4800',
    logoUrl: null,
    logo: 'twitter',
    isDraft: false,
  },
  {
    id: 5,
    date: '20 Apr, 2025',
    company: 'Airbnb',
    position: 'Senior UI/UX Designer',
    tags: ['Full time', 'Senior level', 'Distant', 'Project work'],
    hourlyRate: 250,
    location: 'San Francisco, CA',
    experience: 'Senior',
    perMonth: '$5000',
    logoUrl: null,
    logo: 'airbnb',
    isDraft: false,
  },
  {
    id: 6,
    date: '20 Apr, 2025',
    company: 'Apple',
    position: 'Senior UI/UX Designer',
    tags: ['Full time', 'Senior level', 'Distant', 'Project work'],
    hourlyRate: 250,
    location: 'San Francisco, CA',
    experience: 'Senior',
    perMonth: '$5200',
    logoUrl: null,
    logo: 'apple',
    isDraft: false,
  }
];

const renderLogo = (logo, logoUrl) => {
  if (logoUrl)
    return (
      <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border-2 border-white">
        <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
      </div>
    );
  switch (logo) {
    case 'amazon':
      return (
        <div className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full">
          <Briefcase size={20} />
        </div>
      );
    case 'google':
      return (
        <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-gray-300">
          <span className="font-bold text-[#4285F4]">G</span>
        </div>
      );
    case 'dribbble':
      return (
        <div className="w-8 h-8 flex items-center justify-center bg-pink-500 text-white rounded-full">
          <span className="font-bold">D</span>
        </div>
      );
    case 'twitter':
      return (
        <div className="w-8 h-8 flex items-center justify-center bg-[#1DA1F2] text-white rounded-full">
          <span className="font-bold">T</span>
        </div>
      );
    case 'airbnb':
      return (
        <div className="w-8 h-8 flex items-center justify-center bg-[#FF5A5F] text-white rounded-full">
          <span className="font-bold">A</span>
        </div>
      );
    case 'apple':
      return (
        <div className="w-8 h-8 flex items-center justify-center bg-[#A2AAAD] text-white rounded-full">
          <span className="font-bold">A</span>
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full">
          <Briefcase size={20} />
        </div>
      );
  }
};

const getDraftJobs = () => {
  try {
    const raw = window.localStorage.getItem('draftJobs');
    if (raw) return JSON.parse(raw);
  } catch (error) {
    console.error('Error parsing draft jobs:', error);
    return [];
  }
  return [];
};

const JOB_CARD_BG = 'bg-[#f5e4d6]'; // Slightly darker pastel for job card

const Jobs = () => {
  const [showAddJob, setShowAddJob] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [sortBy, setSortBy] = useState('latest');
  const { profile } = useUserProfile();
  const isAgency = profile?.userType === 'agency';
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    experience: '',
    perMonth: '',
    tags: {
      fulltime: false,
      parttime: false,
      internship: false,
      projectwork: false,
      volunteering: false,
      fullday: false,
      flexibleschedule: false,
      shiftwork: false,
      distantwork: false,
      shiftmethod: false,
    },
  });
  const [isFiltering, setIsFiltering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAnyFilterActive =
      filters.search !== '' ||
      filters.location !== '' ||
      filters.experience !== '' ||
      filters.perMonth !== '' ||
      Object.values(filters.tags).some((value) => value);
    setIsFiltering(isAnyFilterActive);
  }, [filters]);

  useEffect(() => {
    const allJobs = [...getDraftJobs(), ...initialJobs];
    const sortedJobs = [...allJobs].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === 'latest' ? dateB - dateA : dateA - dateB;
    });
    setJobs(sortedJobs);
    try {
      const savedBookmarks = localStorage.getItem('bookmarkedJobs');
      if (savedBookmarks) {
        setBookmarkedJobs(JSON.parse(savedBookmarks));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  }, [sortBy]);

  const filteredJobs = isFiltering
    ? jobs.filter((job) => {
        if (
          filters.search &&
          !(
            job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
            job.position.toLowerCase().includes(filters.search.toLowerCase())
          )
        )
          return false;
        if (
          filters.location &&
          !job.location.toLowerCase().includes(filters.location.toLowerCase())
        )
          return false;
        if (
          filters.experience &&
          !job.experience.toLowerCase().includes(filters.experience.toLowerCase())
        )
          return false;
        if (
          filters.perMonth &&
          !(job.perMonth && job.perMonth.toLowerCase().includes(filters.perMonth.toLowerCase()))
        )
          return false;
        const enabledTags = Object.entries(filters.tags)
          .filter(([_, v]) => v)
          .map(([k]) => k);
        if (
          enabledTags.length > 0 &&
          job.tags &&
          !job.tags.some((tag) =>
            enabledTags.some((en) =>
              tag.toLowerCase().includes(en.replace(/work|day|schedule|method/g, '').trim())
            )
          )
        ) {
          return false;
        }
        return true;
      })
    : jobs;

  const toggleBookmark = (jobId) => {
    setBookmarkedJobs((old) =>
      old.includes(jobId) ? old.filter((id) => id !== jobId) : [...old, jobId]
    );
  };

  const handleAddJob = (job) => {
    const newJob = {
      ...job,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };
    setJobs((prev) => [newJob, ...prev]);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <div className="w-full bg-black text-white p-4">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center gap-4">
          <div className="relative min-w-[200px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              className="flex items-center w-full bg-[#1a1a1a] text-white border border-gray-700 rounded-md py-2 pl-10 pr-4 focus:outline-none whitespace-nowrap !rounded-button"
              type="text"
              placeholder="Search position or company"
              value={filters.search}
              onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            />
          </div>
          <div className="relative min-w-[200px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MapPin size={18} className="text-gray-400" />
            </div>
            <div className="relative">
              <input
                className="flex items-center w-full bg-[#1a1a1a] text-white border border-gray-700 rounded-md py-2 pl-10 pr-12 focus:outline-none whitespace-nowrap !rounded-button"
                type="text"
                placeholder="Work location"
                value={filters.location}
                onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
                list="locations"
              />
              <datalist id="locations">
                {['San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Remote', 'Chicago, IL', 'Boston, MA'].map((location, index) => (
                  <option key={index} value={location} />
                ))}
              </datalist>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
          <div className="relative min-w-[200px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Briefcase size={18} className="text-gray-400" />
            </div>
            <div className="relative">
              <input
                className="flex items-center w-full bg-[#1a1a1a] text-white border border-gray-700 rounded-md py-2 pl-10 pr-12 focus:outline-none whitespace-nowrap !rounded-button"
                type="text"
                placeholder="Experience"
                value={filters.experience}
                onChange={(e) => setFilters((f) => ({ ...f, experience: e.target.value }))}
                list="experiences"
              />
              <datalist id="experiences">
                {['Intern', 'Junior', 'Mid', 'Senior', 'Lead'].map((exp, index) => (
                  <option key={index} value={exp} />
                ))}
              </datalist>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
          <div className="relative min-w-[200px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Calendar size={18} className="text-gray-400" />
            </div>
            <input
              className="flex items-center w-full bg-[#1a1a1a] text-white border border-gray-700 rounded-md py-2 pl-10 pr-4 focus:outline-none whitespace-nowrap !rounded-button"
              type="text"
              placeholder="Per month"
              value={filters.perMonth}
              onChange={(e) => setFilters((f) => ({ ...f, perMonth: e.target.value }))}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 flex w-full bg-white">
        <div className="max-w-[1440px] mx-auto p-4 flex gap-6 flex-1 h-full">
          <div className="w-[250px]">
            <div className="relative overflow-hidden rounded-lg mb-6 bg-gradient-to-br from-blue-900 to-purple-900">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20modern%20abstract%20background%20with%20blue%20and%20purple%20gradient%2C%20elegant%20design%20for%20job%20recruitment%20platform%2C%20minimalist%20corporate%20style%2C%20high%20quality%20digital%20art&width=250&height=200&seq=1&orientation=portrait"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
              />
              <div className="relative p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">
                  Get Your best profession with LuckyJob
                </h2>
                <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white !rounded-button whitespace-nowrap">
                  Learn more
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button className="text-gray-500 hover:text-gray-800" onClick={() => {
                  setFilters({
                    search: '',
                    location: '',
                    experience: '',
                    perMonth: '',
                    tags: {
                      fulltime: false,
                      parttime: false,
                      internship: false,
                      projectwork: false,
                      volunteering: false,
                      fullday: false,
                      flexibleschedule: false,
                      shiftwork: false,
                      distantwork: false,
                      shiftmethod: false,
                    },
                  });
                }}>
                  <SlidersHorizontal size={18} />
                </button>
              </div>
              <div className="mb-6">
                <h4 className="text-sm text-gray-500 mb-3">Working schedule</h4>
                <div className="space-y-2">
                  {[
                    { id: 'fulltime', label: 'Full time' },
                    { id: 'parttime', label: 'Part time' },
                    { id: 'internship', label: 'Internship' },
                    { id: 'projectwork', label: 'Project work' },
                    { id: 'volunteering', label: 'Volunteering' },
                  ].map(({ id, label }) => (
                    <div className="flex items-center space-x-2" key={id}>
                      <Checkbox
                        id={id}
                        className="rounded-sm"
                        checked={filters.tags[id]}
                        onCheckedChange={() =>
                          setFilters((f) => ({
                            ...f,
                            tags: {
                              ...f.tags,
                              [id]: !f.tags[id],
                            },
                          }))
                        }
                      />
                      <label htmlFor={id} className="text-sm cursor-pointer">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 mb-3">Employment type</h4>
                <div className="space-y-2">
                  {[
                    { id: 'fullday', label: 'Full day' },
                    { id: 'flexibleschedule', label: 'Flexible schedule' },
                    { id: 'shiftwork', label: 'Shift work' },
                    { id: 'distantwork', label: 'Distant work' },
                    { id: 'shiftmethod', label: 'Shift method' },
                  ].map(({ id, label }) => (
                    <div className="flex items-center space-x-2" key={id}>
                      <Checkbox
                        id={id}
                        className="rounded-sm"
                        checked={filters.tags[id]}
                        onCheckedChange={() =>
                          setFilters((f) => ({
                            ...f,
                            tags: {
                              ...f.tags,
                              [id]: !f.tags[id],
                            },
                          }))
                        }
                      />
                      <label htmlFor={id} className="text-sm cursor-pointer">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {isFiltering ? 'Filtered jobs' : 'All jobs'}{' '}
                <span className="inline-block ml-2 px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {filteredJobs.length}
                </span>
              </h2>
              <div className="flex items-center gap-2">
                {isAgency && (
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium px-5 py-2 flex items-center gap-2"
                    onClick={() => setShowAddJob(true)}
                  >
                    <Plus size={18} /> Add Job
                  </Button>
                )}
                <span className="text-sm text-gray-500 ml-4">Sort by:</span>
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => setSortBy(sortBy === 'latest' ? 'oldest' : 'latest')}
                >
                  <span className="font-medium">
                    {sortBy === 'latest' ? 'Latest first' : 'Oldest first'}
                  </span>
                  {sortBy === 'latest' ? (
                    <SortAsc size={16} className="transform rotate-180" />
                  ) : (
                    <SortAsc size={16} />
                  )}
                </div>
              </div>
            </div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full flex-1 min-h-0"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
              initial="hidden"
              animate="visible"
            >
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    className={`rounded-2xl border-2 border-gray-200 overflow-hidden ${JOB_CARD_BG} shadow-sm hover:shadow-md transition-shadow min-h-[340px] flex flex-col justify-between`}
                    variants={{ hidden: { opacity: 0, y: -20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } } }}
                  >
                    <div className="p-6 relative">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-600 bg-white px-4 py-2 rounded-full">
                          {job.date}
                          {job.isDraft && (
                            <span className="ml-2 px-2 py-1 text-xs bg-yellow-200 text-yellow-900 rounded-full">Draft</span>
                          )}
                        </span>
                        <button
                          onClick={() => toggleBookmark(job.id)}
                          className="bg-white p-2 rounded-full text-gray-600 hover:text-gray-900 cursor-pointer transform transition-transform hover:scale-105"
                        >
                          {bookmarkedJobs.includes(job.id) ? (
                            <Bookmark fill="#9333ea" className="text-purple-600" />
                          ) : (
                            <Bookmark className="text-gray-400" />
                          )}
                        </button>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">{job.company}</span>
                          {renderLogo(job.logo, job.logoUrl)}
                        </div>
                        <h3 className="text-xl font-bold mt-1">{job.position}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags &&
                          job.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-white bg-opacity-90 text-sm rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-6 bg-white bg-opacity-90 border-t border-gray-200">
                      <div>
                        <div className="font-bold text-xl">${job.hourlyRate}/hr</div>
                        <div className="text-sm text-gray-500">{job.location}</div>
                      </div>
                      <Button
                        className="bg-black text-white hover:bg-gray-800 !rounded-full px-6 py-2 text-sm font-medium whitespace-nowrap transform transition-transform hover:scale-105"
                        onClick={() => navigate(`/dashboard/jobs/${job.id}`)}
                      >
                        Details
                      </Button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 flex flex-col items-center justify-center py-20 text-center">
                  <Briefcase size={64} className="text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No jobs found</h3>
                  <p className="text-gray-500 max-w-md">
                    No jobs match your current filters. Try adjusting your search criteria or add a new job.
                  </p>
                  {isAgency && (
                    <Button
                      className="mt-6 bg-purple-600 hover:bg-purple-700"
                      onClick={() => setShowAddJob(true)}
                    >
                      <Plus size={18} className="mr-2" /> Add New Job
                    </Button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* AddJobModal - only rendered if user is an agency */}
      {isAgency && (
        <AddJobModal open={showAddJob} onClose={() => setShowAddJob(false)} onAddJob={handleAddJob} />
      )}
    </div>
  );
};

// --- AddJobModal component (inlined for this file) ---
const EXPERIENCE_OPTIONS = ['Intern', 'Junior', 'Mid', 'Senior', 'Lead'];
const WORK_SCHEDULES = [
  'Full time',
  'Part time',
  'Internship',
  'Project work',
  'Volunteering',
];
const EMPLOYMENT_TYPES = [
  'Full day',
  'Flexible schedule',
  'Shift work',
  'Distant work',
  'Shift method',
];

const AddJobModal = ({ open, onClose, onAddJob }) => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [perMonth, setPerMonth] = useState('');
  const [tags, setTags] = useState([WORK_SCHEDULES[0], EMPLOYMENT_TYPES[0]]);
  const [description, setDescription] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [logoUrl, setLogoUrl] = useState(null);
  const [isDraft, setIsDraft] = useState(false);
  const fileRef = useRef(null);

  const handleTagToggle = (v) => {
    setTags((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const resetForm = () => {
    setCompany('');
    setPosition('');
    setLocation('');
    setExperience('');
    setPerMonth('');
    setTags([WORK_SCHEDULES[0], EMPLOYMENT_TYPES[0]]);
    setDescription('');
    setHourlyRate('');
    setLogoUrl(null);
    setIsDraft(false);
  };

  const handleSubmit = () => {
    if (company && position && location && experience && hourlyRate) {
      onAddJob({
        company,
        position,
        location,
        experience,
        perMonth,
        tags,
        description,
        hourlyRate: parseFloat(hourlyRate),
        logoUrl,
        isDraft,
        logo: 'default',
        bgColor: 'bg-white',
      });
      resetForm();
      onClose();
    }
  };

  const handleSaveDraft = () => {
    setIsDraft(true);
    onAddJob({
      company,
      position,
      location,
      experience,
      perMonth,
      tags,
      description,
      hourlyRate: hourlyRate ? parseFloat(hourlyRate) : 0,
      logoUrl,
      isDraft: true,
      logo: 'default',
      bgColor: 'bg-yellow-50',
    });
    resetForm();
    onClose();
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full p-0 overflow-hidden bg-white rounded-2xl shadow-2xl">
        <DialogHeader className="flex flex-row justify-between items-center px-6 pt-5 pb-2 border-b">
          <DialogTitle className="flex items-center gap-2 text-lg">Add Job</DialogTitle>
          <Button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 text-gray-500" size="icon" onClick={onClose}>
            <span className="sr-only">Close</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </Button>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">
          {/* Left 3/5 */}
          <div className="lg:col-span-3 space-y-5">
            <div>
              <Label htmlFor="jobCompany">Company Name</Label>
              <Input
                id="jobCompany"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="bg-white border-gray-200 mt-1"
                placeholder="e.g. Amazon"
              />
            </div>
            <div>
              <Label htmlFor="jobPosition">Position Title</Label>
              <Input
                id="jobPosition"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="bg-white border-gray-200 mt-1"
                placeholder="e.g. Senior UI/UX Designer"
              />
            </div>
            <div>
              <Label htmlFor="jobDesc">Job Description</Label>
              <Textarea
                id="jobDesc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white border-gray-200 mt-1 min-h-[70px]"
                placeholder="Describe the job, role, and requirements"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="jobLocation">Location</Label>
                <Input
                  id="jobLocation"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-white border-gray-200 mt-1"
                  placeholder="e.g. San Francisco, CA"
                />
              </div>
              <div>
                <Label>Experience Level</Label>
                <select
                  className="w-full bg-white border-gray-200 rounded-md mt-1 py-2 px-3"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="">Select...</option>
                  {EXPERIENCE_OPTIONS.map((ex) => (
                    <option value={ex} key={ex}>{ex}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="jobPerMonth">Per Month</Label>
                <Input
                  id="jobPerMonth"
                  value={perMonth}
                  onChange={(e) => setPerMonth(e.target.value)}
                  className="bg-white border-gray-200 mt-1"
                  placeholder="e.g. $4000"
                />
              </div>
              <div>
                <Label htmlFor="jobHourlyRate">Hourly Rate</Label>
                <Input
                  id="jobHourlyRate"
                  value={hourlyRate}
                  type="number"
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="bg-white border-gray-200 mt-1"
                  placeholder="e.g. 100"
                />
              </div>
            </div>
            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {WORK_SCHEDULES.concat(EMPLOYMENT_TYPES).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    type="button"
                    className={`px-4 py-2 rounded-full border text-xs font-medium cursor-pointer transition
                      ${tags.includes(tag)
                        ? 'bg-green-200 text-green-800 border-green-300'
                        : 'bg-gray-100 text-gray-700 border-gray-200'}
                    `}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Right 2/5 */}
          <div className="lg:col-span-2 flex flex-col items-center space-y-4">
            <Label className="mb-1">Company Logo</Label>
            {logoUrl ? (
              <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center mb-3 border-2 border-green-300">
                <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div
                className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-3 border-2 border-gray-200 cursor-pointer"
                onClick={() => fileRef.current?.click()}
              >
                <Building size={36} className="text-gray-400" />
              </div>
            )}
            <input
              type="file"
              ref={fileRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const reader = new FileReader();
                reader.onload = (ev) => setLogoUrl(ev.target?.result as string);
                reader.readAsDataURL(f);
              }}
            />
            <div className="flex flex-col items-center w-full gap-2 mt-2">
              <Button
                className="bg-green-200 hover:bg-green-300 text-green-800 border-none w-full"
                onClick={handleSubmit}
              >
                <Plus size={16} className="mr-2" /> Add Job
              </Button>
              <Button
                variant="outline"
                className="bg-white border-gray-200 text-gray-700 w-full"
                onClick={handleSaveDraft}
              >
                Save as Draft
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Jobs; 