import React from 'react';
import { Search, BookOpen, GraduationCap, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define wave background styles
const waveStyles = `
  .wave-bg {
    position: relative;
    background: linear-gradient(180deg, #ffffff 0%, #f0f7ff 100%);
  }
  
  .wave-bg::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 150px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%230066ff'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%230066ff'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%230066ff' opacity='.2'%3E%3C/path%3E%3C/svg%3E");
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 1;
  }
`;

const DiscoverSection = () => {
  const features = [
    {
      icon: Search,
      title: "Intelligent Job Matching",
      description: "Our AI technology matches your skills and experience to the perfect job opportunities, saving you time and increasing your chances of landing your dream role."
    },
    {
      icon: Briefcase,
      title: "CV Builder & Analyzer",
      description: "Create a standout resume with our professional templates and AI-powered recommendations. Get instant feedback to improve your resume's effectiveness."
    },
    {
      icon: GraduationCap,
      title: "Skill Development",
      description: "Identify skill gaps and access targeted courses to enhance your employability in today's competitive job market."
    },
    {
      icon: Users,
      title: "Professional Network",
      description: "Connect with industry professionals, participate in discussions, and expand your network to discover new career opportunities."
    }
  ];

  return (
    <section className="py-20 px-8 wave-bg relative">
      {/* Add wave styles */}
      <style dangerouslySetInnerHTML={{ __html: waveStyles }} />
      
      {/* Floating dots decoration */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-2 h-2 bg-blue-600 rounded-full"
            style={{ 
              top: `${Math.floor(Math.random() * 100)}%`, 
              left: `${Math.floor(Math.random() * 100)}%`,
              animation: `float ${5 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="absolute top-1/3 right-10 w-32 h-32 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-2 h-2 bg-purple-600 rounded-full"
            style={{ 
              top: `${Math.floor(Math.random() * 100)}%`, 
              left: `${Math.floor(Math.random() * 100)}%`,
              animation: `float ${5 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
          Supercharge Your Career Journey
        </h2>
        
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Job In Point combines AI technology with powerful career tools to help you find opportunities that match your skills and ambitions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg">
            Start Your Career Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;