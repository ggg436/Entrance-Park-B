import React from 'react';
import CVAnalyzerComponent from '@/components/CVAnalyzer';

// Mock job data for the CV Analyzer
const jobs = [
  {
    id: 1,
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
    company: 'Google',
    position: 'Frontend Developer',
    tags: ['Full time', 'Mid level', 'Remote', 'Project work'],
    hourlyRate: 220,
    location: 'Remote',
    experience: 'Mid',
    perMonth: '$4200',
    logoUrl: null,
    logo: 'google',
    isDraft: false,
  },
  {
    id: 3,
    company: 'Microsoft',
    position: 'Backend Engineer',
    tags: ['Full time', 'Senior level', 'Remote'],
    hourlyRate: 280,
    location: 'Remote',
    experience: 'Senior',
    perMonth: '$4800',
    logoUrl: null,
    logo: 'microsoft',
    isDraft: false,
  },
  {
    id: 4,
    company: 'Apple',
    position: 'Product Designer',
    tags: ['Full time', 'Senior level', 'Onsite'],
    hourlyRate: 300,
    location: 'Cupertino, CA',
    experience: 'Senior',
    perMonth: '$5200',
    logoUrl: null,
    logo: 'apple',
    isDraft: false,
  },
  {
    id: 5,
    company: 'LinkedIn',
    position: 'UX Researcher',
    tags: ['Full time', 'Mid level', 'Hybrid'],
    hourlyRate: 190,
    location: 'New York, NY',
    experience: 'Mid',
    perMonth: '$3800',
    logoUrl: null,
    logo: 'linkedin',
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
  },
  {
    id: 6,
    title: 'UI/UX Design Principles',
    instructor: 'Anita Desai',
    level: 'Intermediate',
    duration: '8 weeks',
    lessons: 30,
    students: 1320,
    rating: 4.9,
    price: '$89',
    image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-pink-600',
    popular: true,
    category: 'Design'
  },
  {
    id: 7,
    title: 'JavaScript Mastery',
    instructor: 'Rahul Kumar',
    level: 'Intermediate to Advanced',
    duration: '12 weeks',
    lessons: 45,
    students: 2150,
    rating: 4.8,
    price: '$99',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-yellow-600',
    popular: true,
    category: 'Programming'
  }
];

const CVAnalyzer = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Remove the header as it's already in the component */}
      <CVAnalyzerComponent jobs={jobs} courses={courses} />
    </div>
  );
};

export default CVAnalyzer; 