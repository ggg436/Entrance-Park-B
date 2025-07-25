import React from 'react';
import { Twitter, Facebook, Instagram, Github, MapPin, Mail, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';

const Team = () => {
  const teamMembers = [
    {
      name: "Member 1",
      role: "Founder & CEO",
      bio: "Agricultural scientist with 15+ years of experience in sustainable farming and crop optimization.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "rajesh@drkrishak.com"
      }
    },
    {
      name: "Member 2",
      role: "Lead Data Scientist",
      bio: "AI/ML expert specializing in predictive analytics for crop yield and disease detection systems.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=150&h=150&fit=crop&crop=face",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "priya@drkrishak.com"
      }
    },
    {
      name: "Member 3",
      role: "Head of Engineering",
      bio: "Full-stack developer passionate about building scalable agricultural technology solutions.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "arjun@drkrishak.com"
      }
    },
    {
      name: "Member 4",
      role: "Product Manager",
      bio: "Product strategist focused on user experience and farmer-centric feature development.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "meera@drkrishak.com"
      }
    },
    {
      name: "Member 5",
      role: "Agricultural Advisor",
      bio: "Field expert with deep knowledge of traditional and modern farming practices across India.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "vikram@drkrishak.com"
      }
    },
    {
      name: "Member 6",
      role: "Marketing Director",
      bio: "Brand strategist helping farmers discover and adopt innovative agricultural technologies.",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "anita@drkrishak.com"
      }
    },
    {
      name: "Member 7",
      role: "Business Development",
      bio: "Partnership specialist connecting farmers with technology solutions and market opportunities.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "rohit@drkrishak.com"
      }
    },
    {
      name: "Member 8",
      role: "UX Designer",
      bio: "Design expert creating intuitive interfaces that make complex agricultural data accessible.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "kavitha@drkrishak.com"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Let's Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We are a passionate team of agricultural experts, technologists, and innovators 
            dedicated to revolutionizing farming through smart technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
              Job Openings
            </Button>
            <Button variant="outline" className="px-8 py-3 rounded-lg">
              About Us
            </Button>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  {/* Profile Image */}
                  <div className="mb-4">
                    <div
                      className="w-20 h-20 rounded-full mx-auto bg-gray-200 flex items-center justify-center"
                    >
                      <span className="text-gray-500 font-bold text-lg">
                        {member.name.split(' ')[1]}
                      </span>
                    </div>
                  </div>
                  
                  {/* Member Info */}
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex justify-center space-x-3">
                    <a 
                      href={member.social.twitter} 
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a 
                      href={member.social.linkedin} 
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a 
                      href={`mailto:${member.social.email}`} 
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Team Now
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            We're always looking for talented individuals who share our passion for 
            transforming agriculture through technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg">
              Learn More
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg">
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            We're Here to Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center space-x-3">
              <Mail className="h-6 w-6 text-blue-600" />
              <a href="mailto:info@krishakai.com" className="text-gray-700 hover:text-blue-600 transition-colors">info@krishakai.com</a>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <PhoneCall className="h-6 w-6 text-blue-600" />
              <span className="text-gray-700">+9779868597841</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;