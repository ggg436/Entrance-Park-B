
import React from 'react';
import Header from '@/components/layout/Header';
import HeroSection from './landing-page/HeroSection';
import IntegrationsSection from './landing-page/IntegrationsSection';
import DifferenceSection from './landing-page/DifferenceSection';
import DiscoverSection from './landing-page/DiscoverSection';
import HowItWorksSection from './landing-page/HowItWorksSection';
import DashboardSection from './landing-page/DashboardSection';
import StatsSection from './landing-page/StatsSection';
import MobileAppSection from './landing-page/MobileAppSection';
import TestimonialsSection from './landing-page/TestimonialsSection';
import Footer from '@/components/layout/Footer';
import BlogSection from './landing-page/BlogSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <DifferenceSection />
      <DiscoverSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <DashboardSection />
      <StatsSection />
      <MobileAppSection />
      <TestimonialsSection />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;
