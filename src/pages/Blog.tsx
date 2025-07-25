import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Sustainable Rice Farming Practices in Terai Region of Nepal",
      author: "Binod Sharma",
      date: "15 May 2024",
      description: "Innovative approaches to sustainable rice cultivation in Nepal's fertile Terai region, focusing on water conservation and organic methods...",
      image: "https://images.unsplash.com/photo-1595339589628-3d8a8e1644ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Nepal's Coffee Revolution: Small Farmers Reaching Global Markets",
      author: "Anisha Gurung", 
      date: "10 May 2024",
      description: "How Nepali hill farmers are transforming their livelihoods through specialty coffee production and international market access...",
      image: "https://images.unsplash.com/photo-1599930113854-d6d7fd522204?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Climate-Resilient Agriculture: Adapting to Changing Weather Patterns in Nepal",
      author: "Rajan Thapa",
      date: "5 May 2024",
      description: "Strategies being implemented by Nepali farmers to adapt to increasingly unpredictable monsoons and changing climate conditions...",
      image: "https://images.unsplash.com/photo-1585132004237-dd248ba70067?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Traditional Seed Preservation Efforts in Remote Mountain Communities",
      author: "Kamala Bhattarai",
      date: "28 Apr 2024",
      description: "How indigenous communities in Nepal's mountains are working to preserve ancient crop varieties and agricultural biodiversity...",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Millet Renaissance: Reviving Nepal's Forgotten Super Grain",
      author: "Deepak Adhikari",
      date: "22 Apr 2024",
      description: "The growing movement to revive millet cultivation in Nepal's mid-hills, highlighting its nutritional benefits and climate resilience...",
      image: "https://images.unsplash.com/photo-1586201375813-78ca47ae29b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Agricultural Cooperatives Transforming Rural Nepal's Economy",
      author: "Sarita Poudel",
      date: "17 Apr 2024",
      description: "How farmer-led cooperatives are improving market access, providing technical support, and increasing incomes across Nepal...",
      image: "https://images.unsplash.com/photo-1593260654784-4aa47cd0c803?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      title: "Digital Revolution in Nepali Agriculture: Mobile Apps for Farmers",
      author: "Rajesh KC",
      date: "12 Apr 2024",
      description: "New mobile technologies helping Nepali farmers access weather forecasts, market prices, and agricultural advice in remote areas...",
      image: "https://images.unsplash.com/photo-1570358934836-6802981e481e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 8,
      title: "Organic Vegetable Farming Success Stories from Kathmandu Valley",
      author: "Sushila Tamang",
      date: "8 Apr 2024",
      description: "How farmers near Kathmandu are meeting growing urban demand for organic, locally grown vegetables through innovative practices...",
      image: "https://images.unsplash.com/photo-1567106367129-2a3c095acde4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 9,
      title: "Beekeeping as Sustainable Livelihood in Nepal's Foothills",
      author: "Mohan Lama",
      date: "3 Apr 2024",
      description: "The growing beekeeping industry in Nepal, contributing to pollination, honey production, and additional income for smallholder farmers...",
      image: "https://images.unsplash.com/photo-1587382060906-770bc99cae43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 10,
      title: "Cardamom Farming: Nepal's High-Value Cash Crop Changing Lives",
      author: "Prakash Magar",
      date: "28 Mar 2024",
      description: "How large cardamom cultivation is providing lucrative opportunities for farmers in eastern Nepal's hills and improving livelihoods...",
      image: "https://images.unsplash.com/photo-1622821775081-0a85aeec5e02?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "Women-Led Farming Initiatives Transforming Rural Nepal",
      date: "18 May 2024",
      image: "https://images.unsplash.com/photo-1534187746990-28d25986a21f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "Nepal's Agricultural Export Potential: Challenges and Opportunities",
      date: "12 May 2024",
      image: "https://images.unsplash.com/photo-1595338656178-e0b202c35173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      title: "Innovative Irrigation Systems for Water-Scarce Regions in Nepal",
      date: "6 May 2024",
      image: "https://images.unsplash.com/photo-1532467411038-57680e3dc0f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const latestPosts = [
    {
      id: 1,
      title: "Government Launches New Agricultural Subsidy Program for Nepal's Farmers",
      date: "20 May 2024",
      image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "Nepal Agricultural Research Council Develops Drought-Resistant Rice Variety",
      date: "19 May 2024",
      image: "https://images.unsplash.com/photo-1602763754573-47ef237f3857?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-blue-600 font-medium mb-4">Blog</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nepal Agriculture Insights
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Explore the latest trends, innovations, and success stories from Nepal's diverse agricultural landscape, 
            from traditional farming techniques to modern sustainable practices.
          </p>
          
          {/* Search Bar */}
          <div className="flex gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search agricultural topics" 
                className="pl-10 rounded-xl border-gray-200"
              />
            </div>
            <Button className="px-6 py-2 rounded-xl">
              Find Now
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Agricultural Knowledge Hub
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
                        <span className="font-medium text-blue-600">{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                      <Link to={`/blog/${post.id}`}>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight hover:text-blue-600 cursor-pointer transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <Link to={`/blog/${post.id}`}>
                        <Button variant="link" className="text-blue-600 font-medium p-0 h-auto hover:text-blue-700">
                          Read More →
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Featured Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Featured</h3>
                <div className="space-y-4">
                  {featuredPosts.map((post) => (
                    <div key={post.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">{post.date}</p>
                        <h4 className="text-sm font-semibold text-gray-900 leading-tight hover:text-blue-600 cursor-pointer">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Latest Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Latest</h3>
                <div className="space-y-4">
                  {latestPosts.map((post) => (
                    <div key={post.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">{post.date}</p>
                        <h4 className="text-sm font-semibold text-gray-900 leading-tight hover:text-blue-600 cursor-pointer">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;