import React, { useState, useEffect } from 'react';
import { Clock, Award, Filter, ChevronRight, X, Target, GraduationCap, BookOpen, Zap, Brain, Calculator, Microscope, Atom, CreditCard, User, Mail, Phone, MapPin } from 'lucide-react';
import { Course } from '../types';
import { courseData } from '../data/courses';

interface CoursesSectionProps {
  initialCategory?: string;
}

// Course icon mapping
const getCourseIcon = (category: string, title: string) => {
  if (category.includes('IIT-JEE') || title.includes('JEE')) {
    return { icon: Target, color: 'from-blue-500 to-blue-600' };
  }
  if (category.includes('NEET') || title.includes('NEET')) {
    return { icon: GraduationCap, color: 'from-green-500 to-green-600' };
  }
  if (category.includes('Foundation') || title.includes('Foundation')) {
    return { icon: BookOpen, color: 'from-purple-500 to-purple-600' };
  }
  if (title.includes('Crash') || title.includes('Fast')) {
    return { icon: Zap, color: 'from-orange-500 to-orange-600' };
  }
  if (title.includes('Math') || title.includes('Mathematics')) {
    return { icon: Calculator, color: 'from-indigo-500 to-indigo-600' };
  }
  if (title.includes('Physics')) {
    return { icon: Atom, color: 'from-red-500 to-red-600' };
  }
  if (title.includes('Chemistry') || title.includes('Biology')) {
    return { icon: Microscope, color: 'from-teal-500 to-teal-600' };
  }
  return { icon: Brain, color: 'from-gray-500 to-gray-600' };
};

interface CoursesSectionProps {
  initialCategory?: string;
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ initialCategory = 'All' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [expandedBatchId, setExpandedBatchId] = useState<string | null>(null);
  const [showEnrollForm, setShowEnrollForm] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState({
    studentName: '',
    email: '',
    phone: '',
    parentName: '',
    address: '',
    city: '',
    selectedCourse: ''
  });
  
  const categories = ['All', ...Array.from(new Set(courseData.map(course => course.category)))];

  useEffect(() => {
    setSelectedCategory(initialCategory);
    setExpandedBatchId(null);
  }, [initialCategory]);

  const handleEnrollClick = (courseId: string, courseTitle: string) => {
    setEnrollmentData(prev => ({ ...prev, selectedCourse: courseTitle }));
    setShowEnrollForm(courseId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnrollmentData({
      ...enrollmentData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handlePayment = () => {
    alert('Payment gateway integration - Redirecting to payment...');
    setShowEnrollForm(null);
    setShowPayment(false);
  };

  // Group courses by category
  const groupedCourses = courseData.reduce((acc, course) => {
    if (!acc[course.category]) acc[course.category] = [];
    acc[course.category].push(course);
    return acc;
  }, {} as Record<string, typeof courseData>);

  // Filtered categories to display
  const displayCategories = selectedCategory === 'All' ? Object.keys(groupedCourses) : [selectedCategory];

  // Find the expanded course
  const expandedCourse = expandedBatchId ? courseData.find(c => c.id === expandedBatchId) : null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <div className="flex items-center text-gray-700 mr-2">
              <Filter size={18} className="mr-1" />
              <span className="font-educational">Filter:</span>
            </div>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => { setSelectedCategory(category); setExpandedBatchId(null); }}
                className={`px-4 py-2 rounded-full text-sm font-medium font-educational transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Batches grouped by category */}
          {displayCategories.map(category => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold font-educational text-blue-700 mb-6">{category} Batches</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupedCourses[category].map((course) => (
                  <CourseCard 
                    key={course.id}
                    course={course} 
                    onLearnMore={() => setExpandedBatchId(course.id)}
                    onEnroll={() => handleEnrollClick(course.id, course.title)}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="mt-16 text-center">
            <a 
              href="#contact" 
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold font-educational hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg"
            >
              Inquire About Admissions
              <ChevronRight size={18} className="ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Modal for batch details */}
      {expandedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition-colors"
              onClick={() => setExpandedBatchId(null)}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className={`bg-gradient-to-br ${getCourseIcon(expandedCourse.category, expandedCourse.title).color} w-16 h-16 rounded-2xl flex items-center justify-center`}>
                {React.createElement(getCourseIcon(expandedCourse.category, expandedCourse.title).icon, { className: "text-white", size: 28 })}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{expandedCourse.title}</h3>
            </div>
            <p className="text-gray-700 mb-2">{expandedCourse.description}</p>
            <div className="mb-2">
              <span className="font-semibold text-blue-700">Duration:</span> {expandedCourse.duration}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-blue-700">Fee:</span> {expandedCourse.fee || 'Contact for details'}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-blue-700">Features:</span>
              <ul className="list-disc pl-6 text-gray-700">
                {expandedCourse.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* Enrollment Form Modal */}
      {showEnrollForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {!showPayment ? (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Enroll in Course</h3>
                  <button
                    onClick={() => setShowEnrollForm(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-primary-700">Selected Course:</h4>
                  <p className="text-gray-800">{enrollmentData.selectedCourse}</p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User size={16} className="inline mr-1" />
                        Student Name *
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        required
                        value={enrollmentData.studentName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter student's full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail size={16} className="inline mr-1" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={enrollmentData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone size={16} className="inline mr-1" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={enrollmentData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User size={16} className="inline mr-1" />
                        Parent/Guardian Name *
                      </label>
                      <input
                        type="text"
                        name="parentName"
                        required
                        value={enrollmentData.parentName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter parent's name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin size={16} className="inline mr-1" />
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={enrollmentData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter complete address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin size={16} className="inline mr-1" />
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={enrollmentData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter city"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <CreditCard size={24} />
                    Proceed to Payment
                    <ChevronRight size={20} />
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-8 text-center">
                <CreditCard className="mx-auto text-primary-600 mb-4" size={64} />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Complete Payment</h3>
                <p className="text-gray-600 mb-6">Secure payment gateway integration</p>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Course Fee:</span>
                    <span className="font-bold text-xl">₹15,000</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">GST (18%):</span>
                    <span className="font-bold">₹2,700</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Registration Fee:</span>
                    <span className="font-bold">₹1,000</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total Amount:</span>
                    <span className="text-2xl font-bold text-primary-600">₹18,700</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <button
                    onClick={handlePayment}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Pay with UPI
                  </button>
                  <button
                    onClick={handlePayment}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Debit/Credit Card
                  </button>
                  <button
                    onClick={handlePayment}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Net Banking
                  </button>
                </div>

                <button
                  onClick={() => setShowPayment(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ← Back to Form
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

const CourseCard: React.FC<{ course: Course; onLearnMore?: () => void; onEnroll?: () => void }> = ({ course, onLearnMore, onEnroll }) => {
  const { icon: IconComponent, color } = getCourseIcon(course.category, course.title);
  
  return (
    <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Icon Header */}
      <div className="relative h-32 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50"></div>
        <div className={`relative z-10 bg-gradient-to-br ${color} w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg`}>
          <IconComponent className="text-white" size={36} />
        </div>
        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {course.category}
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold font-educational text-gray-800 mb-2">{course.title}</h3>
        <p className="text-gray-700 mb-4 line-clamp-2 font-body">{course.description}</p>
        
        <div className="flex items-center mb-4 gap-4">
          <div className="flex items-center text-gray-600">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-1 rounded-full mr-2">
              <Clock size={12} className="text-white" />
            </div>
            <span className="text-sm font-body">{course.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-1 rounded-full mr-2">
              <Award size={12} className="text-white" />
            </div>
            <span className="text-sm font-body">{course.level}</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          {course.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-500 to-green-600"></div>
              </div>
              <p className="ml-3 text-sm text-gray-600 font-body">{feature}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-6 pb-6 mt-auto space-y-3">
        <button 
          onClick={onLearnMore}
          className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-2 rounded-xl font-medium font-educational transition-all duration-200 flex items-center justify-center border border-gray-300 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300"
        >
          Learn More
          <ChevronRight size={16} className="ml-1" />
        </button>
        <button 
          onClick={onEnroll}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-xl font-bold font-educational transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105"
        >
          <CreditCard size={16} className="mr-2" />
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CoursesSection;