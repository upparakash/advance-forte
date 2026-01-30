import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import logo from '../assets/images/logo.svg';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Our Courses', path: '/courses' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Blogs & Updates', path: '/blogs' }
  ];

  const courses = [
    { name: 'NEET Preparation', path: '/courses?category=NEET' },
    { name: 'IIT-JEE Preparation', path: '/courses?category=IIT-JEE' },
    { name: 'Foundation Courses', path: '/courses?category=Foundation' }
  ];

  const exams = [
    { name: 'NEET', path: '/exams?exam=NEET' },
    { name: 'IIT-JEE', path: '/exams?exam=IIT-JEE' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61581999082733', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/advanceforte', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@advanceforte', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900/90 backdrop-blur-sm text-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <img src={logo} alt="Advance Forte Logo" className="h-14 w-auto mb-2" />
              <h3 className="text-2xl font-bold font-educational text-white mb-2">
                Advance Forte
              </h3>
              <p className="text-lg font-medium font-educational text-green-400 mb-4">
                IIT-JEE | NEET | FOUNDATION
              </p>
            </div>
            <p className="font-body text-gray-300 leading-relaxed">
              Empowering students to achieve their dreams through excellence in education. 
              Your trusted partner for NEET, IIT-JEE, and Foundation preparation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-educational text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="font-body text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-educational text-white">Our Courses</h4>
            <ul className="space-y-2">
              {courses.map((course, index) => (
                <li key={index}>
                  <Link
                    to={course.path}
                    className="font-body text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-educational text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                <p className="font-body text-gray-300">
                  D 60/61, 402, sewak park,<br />
                  Dwarka, New Delhi - 110059
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-400" />
                <p className="font-body text-gray-300">+91 8853123199</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-400" />
                <p className="font-body text-gray-300">advanceforte01@gmail.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-blue-400" />
                <a href="https://www.advanceforte.in" className="font-body text-blue-300 hover:text-blue-400 transition-colors duration-200" target="_blank" rel="noopener noreferrer">www.advanceforte.in</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-body text-gray-400 text-center md:text-left">
              © {currentYear} Advance Forte. All rights reserved. | Developed by <span className="text-yellow-500 font-semibold">Fedigma Forge</span>
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="font-body text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="font-body text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="font-body text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Global Back To Top Button
export const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-green-600 text-white p-3 rounded-full shadow-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      aria-label="Back to Top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default Footer;