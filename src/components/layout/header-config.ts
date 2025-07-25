
import { Tractor, Wheat, Sprout, Cpu, Users, BookOpen } from 'lucide-react';

export const navLinks = [
  {
    title: 'Company',
    items: [
      {
        title: 'Our Story',
        description: 'Founded by Sanjok Gharti, Krishak AI is dedicated to transforming agriculture in Nepal and beyond through technology and innovation.',
        href: '/about-us'
      },
      {
        title: 'Social Impact',
        description: "How we're improving agricultural sustainability and farmer livelihoods across Nepal",
        href: '/social-impact'
      },
      {
        title: 'Our Team',
        description: 'Meet the experts and innovators behind Krishak AI',
        href: '/team'
      }
    ]
  },
  {
    title: 'Services',
    items: [
      {
        title: 'Our Services',
        description: 'Comprehensive agricultural solutions for Nepali farmers',
        href: '/services',
        icon: Tractor
      },
      {
        title: 'Our Technology',
        description: "Discover the innovation behind Krishak AI's agricultural tools",
        href: '/technology',
        icon: Cpu
      },
      {
        title: 'Success Stories',
        description: 'See how real farmers are transforming their practices with our solutions',
        href: '/success-stories',
        icon: Users
      }
    ]
  },
  {
    title: 'Products',
    href: '/products'
  },
  {
    title: 'Resources',
    items: [
      {
        title: 'Farming Knowledge Base',
        description: 'Agricultural guides, crop calendars and farming best practices',
        href: '/knowledge-base',
        icon: BookOpen
      },
      {
        title: 'Help Center',
        description: 'Get support for all your Krishak AI platform questions',
        href: '/help'
      },
      {
        title: 'Agricultural Blog',
        description: 'Latest farming news, crop insights and success stories',
        href: '/blog'
      },
      {
        title: 'Farming FAQ',
        description: 'Common agricultural questions answered by experts',
        href: '/faq'
      }
    ]
  },
  {
    title: 'Contact',
    items: [
      {
        title: 'Farmer Support',
        description: '24/7 agricultural assistance for all your farming needs',
        href: '/contact/support'
      },
      {
        title: 'Business Inquiries',
        description: 'Partnership opportunities and B2B solutions',
        href: '/contact/business'
      },
      {
        title: 'Regional Offices',
        description: 'Find Krishak AI representatives in your district',
        href: '/contact/offices'
      }
    ]
  }
]; 