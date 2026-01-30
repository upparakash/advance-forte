import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [examsDropdownOpen, setExamsDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const location = useLocation();
  
  const coursesDropdownRef = useRef<HTMLDivElement>(null);
  const examsDropdownRef = useRef<HTMLDivElement>(null);
  const loginDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (coursesDropdownRef.current && !coursesDropdownRef.current.contains(event.target as Node)) {
        setCoursesDropdownOpen(false);
      }
      if (examsDropdownRef.current && !examsDropdownRef.current.contains(event.target as Node)) {
        setExamsDropdownOpen(false);
      }
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target as Node)) {
        setLoginDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const courseCategories = [
    { name: 'Medical (NEET)', path: '/courses?category=NEET' },
    { name: 'Engineering (IIT-JEE)', path: '/courses?category=IIT-JEE' },
    { name: 'Foundation', path: '/courses?category=Foundation' }
  ];

  const examTypes = [
    { name: 'NEET', path: '/exams?exam=NEET' },
    { name: 'IIT-JEE', path: '/exams?exam=IIT-JEE' }
  ];

  const isActive = (path: string) => {
    if (path === '/courses' && location.pathname.startsWith('/courses')) return true;
    if (path === '/exams' && location.pathname.startsWith('/exams')) return true;
    return location.pathname === path;
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg py-2 border-b border-gray-200 transition-all duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Advance Forte Logo" className="h-14 w-auto mr-3" />
              <span className="text-2xl font-bold font-educational text-blue-700">Advance Forte</span>
              <span className="ml-1 text-lg font-medium font-educational text-green-600">IIT-JEE | NEET | FOUNDATION</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="font-medium font-educational transition-colors duration-200 hover:text-blue-600 relative px-2 py-1 text-gray-800"
              onClick={() => window.scrollTo(0, 0)}
            >
              Home
            </Link>
            
            {/* Courses Dropdown */}
            <div className="relative" ref={coursesDropdownRef}>
              <button
                onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={coursesDropdownOpen}
                className="flex items-center font-medium font-educational transition-colors duration-200 hover:text-blue-600 relative px-2 py-1 text-gray-800"
              >
                Courses
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {coursesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                  <Link
                    to="/courses"
                    className="block px-4 py-2 text-blue-600 hover:bg-blue-50 font-semibold border-b border-gray-100"
                    onClick={() => { setCoursesDropdownOpen(false); window.scrollTo(0, 0); }}
                  >
                    View All Courses
                  </Link>
                  {courseCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      onClick={() => { setCoursesDropdownOpen(false); window.scrollTo(0, 0); }}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Exams Dropdown */}
            <div className="relative" ref={examsDropdownRef}>
              <button
                onClick={() => setExamsDropdownOpen(!examsDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={examsDropdownOpen}
                className="flex items-center font-medium font-educational transition-colors duration-200 hover:text-blue-600 relative px-2 py-1 text-gray-800"
              >
                Exams
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {examsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                  {examTypes.map((exam) => (
                    <Link
                      key={exam.name}
                      to={exam.path}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      onClick={() => { setExamsDropdownOpen(false); window.scrollTo(0, 0); }}
                    >
                      {exam.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link 
              to="/faculty" 
              className="font-medium font-educational transition-colors duration-200 hover:text-blue-600 relative px-2 py-1 text-gray-800"
              onClick={() => window.scrollTo(0, 0)}
            >
              Faculty
            </Link>
            
            <Link 
              to="/blogs" 
              className="font-medium font-educational transition-colors duration-200 hover:text-blue-600 relative px-2 py-1 text-gray-800"
              onClick={() => window.scrollTo(0, 0)}
            >
              Blogs
            </Link>
            
            {/* Login Dropdown */}
            <div className="relative" ref={loginDropdownRef}>
              <button
                onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                className="flex items-center font-medium font-educational transition-colors duration-200 hover:text-blue-600 relative px-2 py-1 text-gray-800"
              >
                Login
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {loginDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => { setLoginDropdownOpen(false); window.scrollTo(0, 0); }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/login?signup=true"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => { setLoginDropdownOpen(false); window.scrollTo(0, 0); }}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              to="/scholarship" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium font-educational hover:bg-blue-700 transition-colors duration-200 shadow-md"
              onClick={() => window.scrollTo(0, 0)}
            >
              Scholarship
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none text-gray-800"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-800 font-medium font-educational hover:bg-blue-50 hover:text-blue-600 rounded-md"
              onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="block px-3 py-2 text-gray-800 font-medium font-educational hover:bg-blue-50 hover:text-blue-600 rounded-md"
              onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }}
            >
              Courses
            </Link>
            <Link
              to="/exams"
              className="block px-3 py-2 text-gray-800 font-medium font-educational hover:bg-blue-50 hover:text-blue-600 rounded-md"
              onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }}
            >
              Exams
            </Link>
            <Link
              to="/faculty"
              className="block px-3 py-2 text-gray-800 font-medium font-educational hover:bg-blue-50 hover:text-blue-600 rounded-md"
              onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }}
            >
              Faculty
            </Link>
            <Link
              to="/blogs"
              className="block px-3 py-2 text-gray-800 font-medium font-educational hover:bg-blue-50 hover:text-blue-600 rounded-md"
              onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }}
            >
              Blogs
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-gray-800 font-medium font-educational hover:bg-blue-50 hover:text-blue-600 rounded-md"
              onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }}
            >
              Login / Sign Up
            </Link>
            <Link 
              to="/scholarship" 
              className="w-full mt-2 bg-blue-600 text-white px-3 py-2 rounded-md font-medium font-educational hover:bg-blue-700 transition-colors duration-200 block text-center"
              onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }}
            >
              Scholarship
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;