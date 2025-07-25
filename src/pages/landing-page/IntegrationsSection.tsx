import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageCircle, ShoppingBag, MessageSquare, Twitter, Palette } from 'lucide-react';

const IntegrationsSection = () => {
  const integrations = [
    {
      name: 'Email Alerts',
      description: 'Get real-time notifications about weather changes, crop status, and market prices directly in your inbox.',
      icon: Mail,
      color: 'text-red-600'
    },
    {
      name: 'Farm Chat',
      description: 'Connect with other farmers, share knowledge, and collaborate on farming best practices.',
      icon: MessageCircle, 
      color: 'text-blue-600'
    },
    {
      name: 'AgriMarket',
      description: 'Integrated marketplace for buying and selling farming equipment, seeds, and produce.',
      icon: ShoppingBag,
      color: 'text-green-600'
    },
    {
      name: 'Support Center',
      description: 'Get instant help and support from our agricultural experts and community members.',
      icon: MessageSquare,
      color: 'text-blue-500'
    },
    {
      name: 'Social Updates',
      description: 'Share your farming journey and connect with the agricultural community on social media.',
      icon: Twitter,
      color: 'text-blue-400'
    },
    {
      name: 'Design Tools',
      description: 'Plan and design your farm layouts with integrated design and visualization tools.',
      icon: Palette,
      color: 'text-yellow-600'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Integrate with essential apps
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect your farming operations with powerful integrations designed to streamline your agricultural workflow and boost productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {integrations.map((integration, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gray-100 ${integration.color}`}>
                    <integration.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <CardDescription>Direct Integration</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{integration.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Check all 1,593 applications
          </a>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;