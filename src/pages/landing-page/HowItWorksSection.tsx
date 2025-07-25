import React from 'react';
import { Smartphone, Leaf, CloudSun, ChevronRight } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Smartphone,
      title: "Download Krishak AI",
      description: "Get started with a simple download that works even on basic smartphones with limited internet access."
    },
    {
      icon: Leaf,
      title: "Register Your Farm",
      description: "Enter your farm details, crop types, and location to receive personalized agricultural insights."
    },
    {
      icon: CloudSun,
      title: "Grow Better Crops!",
      description: "Access AI-powered recommendations, weather forecasts, and connect with the marketplace for better profits."
    }
  ];

  return (
    <section className="py-20 px-8 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            How Krishak AI Works
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Get personalized agricultural insights, connect with markets, and improve your yield—
            designed specifically for Nepali farmers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center">
              <div className="text-center mb-6 md:mb-0">
                <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <step.icon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center mx-8">
                  <ChevronRight className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;