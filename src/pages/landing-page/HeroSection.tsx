
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Check, Leaf, Cloud, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define keyframe animations as a CSS-in-JS object
const keyframeStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0) rotate(15deg); }
    50% { transform: translateY(-30px) rotate(15deg); }
  }
  @keyframes falling {
    0% { 
      transform: translateY(-10vh) translateX(0) rotate(0deg); 
      opacity: 0.8;
    }
    50% {
      transform: translateY(40vh) translateX(30px) rotate(180deg);
      opacity: 1;
    }
    100% { 
      transform: translateY(100vh) translateX(10px) rotate(360deg); 
      opacity: 0.7;
    }
  }
  @keyframes fallingReverse {
    0% { 
      transform: translateY(-10vh) translateX(0) rotate(0deg); 
      opacity: 0.8;
    }
    50% {
      transform: translateY(40vh) translateX(-20px) rotate(-180deg);
      opacity: 1;
    }
    100% { 
      transform: translateY(100vh) translateX(-10px) rotate(-360deg); 
      opacity: 0.7;
    }
  }
`;

// User avatar data
const userAvatars = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWFuJTIwZmFybWVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMGZhcm1lcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1580132849350-28fda8fef6d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFybWVyJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1589677677517-5784e74663ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFybWVyJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
];

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Handle email submission here
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Add keyframes to the document */}
      <style dangerouslySetInnerHTML={{ __html: keyframeStyles }} />
      
      {/* Falling Leaves Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[10%] text-green-500 opacity-70" style={{ animation: 'falling 15s linear infinite', animationDelay: '0s' }}>
          <Leaf size={24} />
        </div>
        <div className="absolute top-0 left-[25%] text-green-600 opacity-60" style={{ animation: 'fallingReverse 11s linear infinite', animationDelay: '2s' }}>
          <Leaf size={18} />
        </div>
        <div className="absolute top-0 left-[45%] text-green-400 opacity-80" style={{ animation: 'falling 13s linear infinite', animationDelay: '5s' }}>
          <Leaf size={20} />
        </div>
        <div className="absolute top-0 left-[65%] text-emerald-500 opacity-70" style={{ animation: 'fallingReverse 14s linear infinite', animationDelay: '1s' }}>
          <Leaf size={22} />
        </div>
        <div className="absolute top-0 left-[85%] text-emerald-600 opacity-60" style={{ animation: 'falling 16s linear infinite', animationDelay: '3s' }}>
          <Leaf size={16} />
        </div>
        <div className="absolute top-0 left-[5%] text-green-500 opacity-75" style={{ animation: 'fallingReverse 12s linear infinite', animationDelay: '7s' }}>
          <Leaf size={19} />
        </div>
        <div className="absolute top-0 left-[55%] text-emerald-400 opacity-80" style={{ animation: 'falling 14s linear infinite', animationDelay: '4s' }}>
          <Leaf size={21} />
        </div>
      </div>
      
      {/* Background is now white - all decorative blue wave elements are removed */}
      
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Text content */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
              AI-Powered Agriculture Platform
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Revolutionizing <span className="text-blue-600">Agriculture</span> with AI Technology
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Empower your farming with data-driven insights. Increase yields, reduce costs, and make better decisions through AI-driven crop monitoring, disease detection, and personalized recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 h-auto rounded-xl font-medium text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                onClick={() => navigate('/signup')}
              >
                Get Started <ArrowRight className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-6 h-auto rounded-xl font-medium text-lg"
              >
                Watch Demo
              </Button>
            </div>
            
            <div className="pt-6">
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {userAvatars.map((avatar, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                        <img 
                          src={avatar} 
                          alt={`User ${i+1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-medium">Trusted by 10,000+ farmers</span>
                </div>
                
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-600 font-medium ml-1">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Farming Machine image */}
          <div className="relative">
            <div className="relative">
              <div style={{ 
                background: "#a7e9ff",
                borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%", 
                height: "350px",
                width: "100%",
                position: "relative",
                overflow: "hidden"
              }}>
                <div className="absolute bottom-0 left-0 w-full h-1/3" style={{ background: "#7ed957" }}></div>
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2" style={{ width: "75%" }}>
                  <img 
                    src="/hero.avif" 
                    alt="Hero"
                    className="w-full h-auto drop-shadow-2xl rounded-xl"
                  />
                </div>
                <div className="absolute bottom-12 left-12">
                  <div className="w-16 h-16 bg-yellow-300 rounded-full"></div>
                </div>
                <div className="absolute bottom-8 right-24">
                  <div className="w-12 h-12 bg-yellow-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
