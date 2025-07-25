import React from 'react';
import { Settings, Headphones, Cloud, Shield, CreditCard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExceptionalSupportCard = () => (
  <div className="absolute top-0 right-0 w-64 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
      <Headphones className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="font-bold text-slate-700 text-lg mb-3">
      Expert Support
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      Our team of agricultural experts is available 24/7 to help you with any questions you may have.
    </p>
  </div>
);

const CloudBasedCard = () => (
  <div className="absolute top-32 left-0 w-64 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
      <Cloud className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="font-bold text-slate-700 text-lg mb-3">
      Cloud-Based
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      Access your farm's data from anywhere, at any time, with our secure cloud platform.
    </p>
  </div>
);

const ExtremeSecurityCard = () => (
  <div className="absolute top-48 right-0 w-64 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
      <Shield className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="font-bold text-slate-700 text-lg mb-3">
      Data Security
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      Your farm's data is protected with bank-level security and regular audits to ensure its safety.
    </p>
  </div>
);

const SimplicityCard = () => (
  <div className="absolute top-80 left-1/2 transform -translate-x-1/2 w-64 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
      <CreditCard className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="font-bold text-slate-700 text-lg mb-3">
      Simplicity
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed">
      Our platform is designed to be intuitive and easy to use, so you can focus on what you do best - farming.
    </p>
  </div>
);

const VedaFeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Features Badge */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <span className="text-orange-500 font-medium text-lg">Features</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-700 mb-6 leading-tight">
              Revolutionize Your Farming with <span className="text-slate-800">Agri-Tech</span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-2 leading-relaxed">
              From precision planting to automated harvesting, Veda provides the tools you need to optimize your farm's performance.
            </p>

            <Button 
              variant="ghost" 
              className="text-orange-500 hover:text-orange-600 p-0 h-auto font-medium mt-6 group"
            >
              Explore Our Features
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right Features Grid - Staggered Layout */}
          <div className="relative">
            <ExceptionalSupportCard />
            <CloudBasedCard />
            <ExtremeSecurityCard />
            <SimplicityCard />
            {/* Spacer to maintain height */}
            <div className="h-[500px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VedaFeaturesSection;