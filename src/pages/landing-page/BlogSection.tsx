import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Sustainable Rice Farming Practices in Terai Region of Nepal",
      category: "Agriculture",
      date: "May 15, 2024",
      image: "https://images.unsplash.com/photo-1595339589628-3d8a8e1644ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Nepal's Coffee Revolution: Small Farmers Reaching Global Markets",
      category: "Markets", 
      date: "May 10, 2024",
      image: "https://images.unsplash.com/photo-1599930113854-d6d7fd522204?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Climate-Resilient Agriculture: Adapting to Changing Weather Patterns",
      category: "Climate",
      date: "May 05, 2024", 
      image: "https://images.unsplash.com/photo-1585132004237-dd248ba70067?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Traditional Seed Preservation in Remote Mountain Communities",
      category: "Heritage",
      date: "April 28, 2024",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Millet Renaissance: Reviving Nepal's Forgotten Super Grain",
      category: "Nutrition",
      date: "April 22, 2024",
      image: "https://images.unsplash.com/photo-1586201375813-78ca47ae29b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Agricultural Cooperatives Transforming Rural Nepal's Economy",
      category: "Community",
      date: "April 17, 2024",
      image: "https://images.unsplash.com/photo-1593260654784-4aa47cd0c803?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-4">
            Nepal Agriculture Insights
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Explore the latest trends, innovations, and success stories from Nepal's diverse agricultural landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-3xl">
              <div className="aspect-[4/3] overflow-hidden rounded-t-3xl">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4 text-sm text-zinc-600">
                  <span className="font-medium">{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 leading-tight hover:text-zinc-700 transition-colors cursor-pointer">
                  {post.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;