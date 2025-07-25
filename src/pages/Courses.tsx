import React from 'react';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  Clock, 
  Star, 
  Book, 
  Play,
  Users,
  BarChart,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock course data
const COURSES = [
  {
    id: 1,
    title: 'Modern Agricultural Practices',
    instructor: 'Dr. Rajesh Sharma',
    level: 'Intermediate',
    duration: '6 weeks',
    lessons: 24,
    students: 1250,
    rating: 4.8,
    price: '$59',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8e8d94f8?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-green-600',
    popular: true,
    category: 'Farming Techniques'
  },
  {
    id: 2,
    title: 'Organic Farming Certification',
    instructor: 'Arun Patel',
    level: 'Advanced',
    duration: '8 weeks',
    lessons: 32,
    students: 875,
    rating: 4.6,
    price: '$79',
    image: 'https://images.unsplash.com/photo-1536657464919-892534f79d9f?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-blue-600',
    popular: true,
    category: 'Organic Farming'
  },
  {
    id: 3,
    title: 'Sustainable Water Management',
    instructor: 'Priya Gupta',
    level: 'Beginner',
    duration: '4 weeks',
    lessons: 16,
    students: 620,
    rating: 4.5,
    price: '$39',
    image: 'https://images.unsplash.com/photo-1588964935831-3841ad64f4e8?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-cyan-600',
    popular: false,
    category: 'Water Management'
  },
  {
    id: 4,
    title: 'Soil Health and Fertility',
    instructor: 'Dr. Mira Khan',
    level: 'Intermediate',
    duration: '5 weeks',
    lessons: 20,
    students: 950,
    rating: 4.7,
    price: '$49',
    image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-amber-600',
    popular: false,
    category: 'Soil Management'
  },
  {
    id: 5,
    title: 'Agricultural Business Management',
    instructor: 'Vikram Singh',
    level: 'Advanced',
    duration: '10 weeks',
    lessons: 40,
    students: 760,
    rating: 4.9,
    price: '$99',
    image: 'https://images.unsplash.com/photo-1598372539930-5c45bd133a10?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-purple-600',
    popular: true,
    category: 'Business'
  },
  {
    id: 6,
    title: 'Climate-Smart Agriculture',
    instructor: 'Ananya Desai',
    level: 'Intermediate',
    duration: '7 weeks',
    lessons: 28,
    students: 890,
    rating: 4.7,
    price: '$69',
    image: 'https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-red-600',
    popular: false,
    category: 'Climate Adaptation'
  },
  // --- Python and Tech Courses ---
  {
    id: 7,
    title: 'Python for Beginners',
    instructor: 'Emily Carter',
    level: 'Beginner',
    duration: '5 weeks',
    lessons: 20,
    students: 2100,
    rating: 4.9,
    price: '$39',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-yellow-600',
    popular: true,
    category: 'Programming'
  },
  {
    id: 8,
    title: 'Intermediate Python Projects',
    instructor: 'Michael Lee',
    level: 'Intermediate',
    duration: '6 weeks',
    lessons: 24,
    students: 950,
    rating: 4.7,
    price: '$49',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-yellow-700',
    popular: false,
    category: 'Programming'
  },
  {
    id: 9,
    title: 'Data Science with Python',
    instructor: 'Dr. Sophia Kim',
    level: 'Advanced',
    duration: '8 weeks',
    lessons: 32,
    students: 1200,
    rating: 4.8,
    price: '$79',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-blue-700',
    popular: true,
    category: 'Data Science'
  },
  {
    id: 10,
    title: 'Web Development Bootcamp',
    instructor: 'Alex Johnson',
    level: 'Beginner',
    duration: '10 weeks',
    lessons: 40,
    students: 3000,
    rating: 4.9,
    price: '$99',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-indigo-600',
    popular: true,
    category: 'Web Development'
  },
  {
    id: 11,
    title: 'Machine Learning Essentials',
    instructor: 'Dr. Alan Turing',
    level: 'Advanced',
    duration: '8 weeks',
    lessons: 36,
    students: 1100,
    rating: 4.8,
    price: '$89',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-green-700',
    popular: false,
    category: 'Data Science'
  },
  {
    id: 12,
    title: 'Business Analytics with Excel',
    instructor: 'Sarah Williams',
    level: 'Intermediate',
    duration: '6 weeks',
    lessons: 22,
    students: 800,
    rating: 4.6,
    price: '$59',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-blue-900',
    popular: false,
    category: 'Business'
  },
  {
    id: 13,
    title: 'Digital Marketing Fundamentals',
    instructor: 'Jessica Brown',
    level: 'Beginner',
    duration: '4 weeks',
    lessons: 16,
    students: 1400,
    rating: 4.5,
    price: '$35',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=300&h=200',
    color: 'bg-pink-600',
    popular: false,
    category: 'Marketing'
  }
];

// Mock category data
const CATEGORIES = [
  { name: 'Programming', count: 12, color: 'bg-yellow-100 text-yellow-700' },
  { name: 'Data Science', count: 8, color: 'bg-blue-100 text-blue-700' },
  { name: 'Web Development', count: 10, color: 'bg-indigo-100 text-indigo-700' },
  { name: 'Marketing', count: 7, color: 'bg-pink-100 text-pink-700' },
  { name: 'Business', count: 9, color: 'bg-purple-100 text-purple-700' },
  { name: 'Farming Techniques', count: 24, color: 'bg-green-100 text-green-700' },
  { name: 'Organic Farming', count: 18, color: 'bg-blue-100 text-blue-700' },
  { name: 'Water Management', count: 12, color: 'bg-cyan-100 text-cyan-700' },
  { name: 'Soil Management', count: 15, color: 'bg-amber-100 text-amber-700' },
  { name: 'Climate Adaptation', count: 14, color: 'bg-red-100 text-red-700' }
];

const Courses: React.FC = () => {
  const popularCourses = COURSES.filter(course => course.popular);
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-blue-600" />
            Agricultural Courses
          </h1>
          <p className="text-gray-600 mt-1">Enhance your farming knowledge with expert-led courses</p>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for courses by title, instructor, or category..."
                className="pl-9 bg-gray-50 border-gray-200"
              />
            </div>
            
            <div className="flex gap-2">
              <select className="px-3 py-2 rounded-md border border-gray-200 bg-gray-50 text-sm">
                <option>All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.name}>{cat.name}</option>
                ))}
              </select>
              
              <select className="px-3 py-2 rounded-md border border-gray-200 bg-gray-50 text-sm">
                <option>All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
        
        {/* Featured Courses */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Featured Courses</h2>
            <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularCourses.map(course => (
              <Card key={course.id} className="overflow-hidden hover:shadow-md transition-all duration-200">
                <div className="relative">
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    <div className={`absolute inset-0 ${course.color} opacity-20`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GraduationCap className="h-16 w-16 text-white opacity-30" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white text-gray-800 shadow-sm">
                      {course.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button variant="outline" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white border-0 rounded-full shadow-sm">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 line-clamp-2">
                      {course.title}
                    </h3>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {course.level}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-yellow-500 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} fill="currentColor" className="w-3.5 h-3.5" />
                      ))}
                    </span>
                    <span className="text-sm font-medium">{course.rating}</span>
                    <span className="text-gray-500 text-xs">({course.students} students)</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1 mr-4">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Book className="h-3.5 w-3.5" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="text-sm">{course.instructor}</span>
                    </div>
                    <span className="text-blue-600 font-bold">{course.price}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Course Categories */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map(category => (
              <Card key={category.name} className="cursor-pointer hover:shadow-md transition-all duration-200">
                <div className="p-4 text-center">
                  <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center bg-gray-100">
                    <GraduationCap className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{category.count} courses</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* All Courses */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Courses</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map(course => (
              <div key={course.id} className="flex bg-white border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
                <div className="w-1/3 bg-gray-200 relative">
                  <div className={`absolute inset-0 ${course.color} opacity-20`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-white opacity-50" />
                  </div>
                </div>
                <div className="w-2/3 p-4">
                  <Badge className={`mb-2 ${CATEGORIES.find(c => c.name === course.category)?.color}`}>
                    {course.category}
                  </Badge>
                  <h3 className="font-medium text-gray-800 line-clamp-2 mb-1">
                    {course.title}
                  </h3>
                  <div className="flex items-center text-sm mb-2">
                    <Star fill="currentColor" className="w-3.5 h-3.5 text-yellow-500 mr-1" />
                    <span>{course.rating}</span>
                    <span className="text-gray-500 text-xs ml-1">({course.students})</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-600 font-bold">{course.price}</span>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Statistics */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-center">Our Platform Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Courses', value: '120+', icon: <Book className="h-5 w-5 text-blue-600" /> },
              { label: 'Expert Instructors', value: '35+', icon: <Users className="h-5 w-5 text-green-600" /> },
              { label: 'Active Students', value: '12,000+', icon: <GraduationCap className="h-5 w-5 text-purple-600" /> },
              { label: 'Success Rate', value: '94%', icon: <BarChart className="h-5 w-5 text-orange-600" /> },
            ].map((stat, index) => (
              <Card key={index} className="bg-white">
                <div className="p-4 text-center">
                  <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center bg-gray-50">
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses; 