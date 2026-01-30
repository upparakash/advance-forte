import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Globe, Users, Award, BookOpen } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-20 relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-green-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your journey with Advance Forte? We're here to help you every step of the way.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Quick Stats */}
            <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">5000+</h3>
                <p className="text-gray-600 font-medium">Students Enrolled</p>
              </div>
            </div>
            
            <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">15+</h3>
                <p className="text-gray-600 font-medium">Years Experience</p>
              </div>
            </div>
            
            <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
                <p className="text-gray-600 font-medium">Expert Faculty</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="group flex items-start space-x-4 p-6 bg-white/40 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 hover:bg-white/50 transition-all duration-300 hover:scale-105">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Main Office</h4>
                    <p className="text-gray-600 leading-relaxed">
                      D 60/61, 402, sewak park,<br />
                      Dwarka Mor, New Delhi - 110059<br />
                      India
                    </p>
                  </div>
                </div>
                <div className="group flex items-start space-x-4 p-6 bg-white/40 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 hover:bg-white/50 transition-all duration-300 hover:scale-105">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Phone Number</h4>
                    <p className="text-gray-600">
                      <a href="tel:+918853123199" className="hover:text-blue-600 transition-colors duration-200">+91 8853123199</a>
                    </p>
                  </div>
                </div>
                <div className="group flex items-start space-x-4 p-6 bg-white/40 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 hover:bg-white/50 transition-all duration-300 hover:scale-105">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Email Address</h4>
                    <p className="text-gray-600">
                      <a href="mailto:advanceforte01@gmail.com" className="hover:text-blue-600 transition-colors duration-200">advanceforte01@gmail.com</a>
                    </p>
                  </div>
                </div>
                <div className="group flex items-start space-x-4 p-6 bg-white/40 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 hover:bg-white/50 transition-all duration-300 hover:scale-105">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Office Hours</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Monday - Saturday: 9:00 AM - 7:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
                <div className="group flex items-start space-x-4 p-6 bg-white/40 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 hover:bg-white/50 transition-all duration-300 hover:scale-105">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Globe size={22} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Website</h4>
                    <p className="text-blue-600">
                      <a href="https://www.advanceforte.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors duration-200">www.advanceforte.in</a>
                    </p>
                  </div>
                </div>
              </div>
              {/* Quick Actions */}
              <div className="p-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h4>
                <div className="space-y-4">
                  <a 
                    href="tel:+918853123199" 
                    className="group flex items-center space-x-4 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300">
                      <Phone size={18} />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-200">Call for Admissions</span>
                  </a>
                  <a 
                    href="mailto:advanceforte01@gmail.com" 
                    className="group flex items-center space-x-4 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300">
                      <Mail size={18} />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-200">Email for Information</span>
                  </a>
                  <a 
                    href="https://www.advanceforte.in" 
                    className="group flex items-center space-x-4 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300 hover:scale-105 shadow-lg"
                    target="_blank" rel="noopener noreferrer"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300">
                      <Globe size={18} />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-200">Visit Website</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h3>
              {isSubmitted ? (
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-xl border border-green-300/50 rounded-2xl p-10 text-center shadow-2xl">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <CheckCircle size={40} className="text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-green-800 mb-4">Message Sent Successfully!</h4>
                  <p className="text-green-700 text-lg">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 bg-white/40 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-white/30">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all duration-300 hover:bg-white/70"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all duration-300 hover:bg-white/70"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all duration-300 hover:bg-white/70"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-3">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all duration-300 hover:bg-white/70"
                      >
                        <option value="">Select a subject</option>
                        <option value="admissions">Admissions Inquiry</option>
                        <option value="courses">Course Information</option>
                        <option value="fees">Fee Structure</option>
                        <option value="faculty">Faculty Information</option>
                        <option value="centres">Centre Locations</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-5 py-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all duration-300 hover:bg-white/70 resize-none"
                      placeholder="Please describe your inquiry in detail..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-3xl hover:scale-105 transform"
                  >
                    <Send size={20} className="mr-3" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;