import React from 'react';
import { 
  CloudRain, 
  Wheat, 
  BarChart2, 
  ShoppingCart, 
  LineChart 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Create a custom soil icon since it's not available in lucide-react
const SoilIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M2 19h20" />
    <path d="M4 15h16" />
    <path d="M6 11c1.5 0 3 .5 3 2-2 0-3 .5-3 2" />
    <path d="M10 11c1.5 0 3 .5 3 2-2 0-3 .5-3 2" />
    <path d="M14 11c1.5 0 3 .5 3 2-2 0-3 .5-3 2" />
    <path d="M18 11c1.5 0 3 .5 3 2-2 0-3 .5-3 2" />
  </svg>
);

// Define pattern styles
const patternStyles = `
  .bg-pattern {
    background-color: #f9fafb;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
`;

const DifferenceSection = () => {
  const features = [
    {
      icon: SoilIcon,
      title: "Smart Soil Analysis",
      description: "Real-time soil health monitoring and recommendations tailored to your farm's specific soil composition."
    },
    {
      icon: CloudRain,
      title: "Precision Weather Forecasting",
      description: "Hyperlocal weather predictions to plan irrigation, planting, and harvesting with confidence."
    },
    {
      icon: Wheat,
      title: "Crop Disease Detection",
      description: "Early identification of crop diseases and pests through AI image analysis, saving crops before it's too late."
    },
    {
      icon: BarChart2,
      title: "Yield Prediction Tools",
      description: "Advanced analytics to forecast harvest yields and optimize crop planning for maximum productivity."
    },
    {
      icon: ShoppingCart,
      title: "Marketplace Direct Access",
      description: "Sell your produce directly to consumers and businesses, eliminating middlemen and increasing profits."
    },
    {
      icon: LineChart,
      title: "Farm Performance Tracking",
      description: "Monitor all aspects of your farm's performance with easy-to-understand reports and recommendations."
    }
  ];

  return (
    <section className="py-20 px-8 bg-pattern relative">
      {/* Add pattern styles */}
      <style dangerouslySetInnerHTML={{ __html: patternStyles }} />
      
      {/* Diagonal color band */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -right-1/4 h-full bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 transform -rotate-6"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Krishak AI?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Krishak AI combines cutting-edge technology with deep agricultural expertise to help Nepali 
            farmers increase yields, reduce costs, and farm more sustainably.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;