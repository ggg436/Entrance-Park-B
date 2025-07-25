
import { Twitter, Facebook, Instagram, Github, Linkedin, Youtube } from 'lucide-react';

export const footerLinks = {
  quickLinks: [
    { title: 'About Us', href: '/about-us' },
    { title: 'Services', href: '/services' },
    { title: 'Products', href: '/products' },
    { title: 'Blog', href: '/blog' },
    { title: 'Contact', href: '/contact' }
  ],
  supportLinks: [
    { title: 'Careers', href: '/careers' },
    { title: 'Privacy Policy', href: '/privacy-policy' },
    { title: 'Terms of Service', href: '/terms-of-service' },
    { title: 'FAQ', href: '/faq' },
    { title: 'Support', href: '/support' }
  ]
};

export const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/sanjok.gc.98' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' }
];

export const contactInfo = {
  address: 'Kathmandu, Nepal',
  phone: '+9779868597841',
  phoneHours: 'Monday to Friday, 9am to 6pm',
  primaryEmail: 'info@krishakai.com',
  secondaryEmail: 'sanjokgharti01@gmail.com',
  website: 'www.krishakai.com',
  workingHours: {
    weekdays: 'Mon - Fri: 9:00 AM - 6:00 PM',
    saturday: 'Sat: 10:00 AM - 2:00 PM'
  }
}; 