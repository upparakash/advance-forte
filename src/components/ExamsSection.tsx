import React, { useState, useEffect } from 'react';
import { Calendar, Users, Award, Clock, BookOpen, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { Exam } from '../types';
import { examData } from '../data/exams';

interface ExamsSectionProps {
  initialExam?: string;
}

const ExamsSection: React.FC<ExamsSectionProps> = ({ initialExam = 'All' }) => {
  const [selectedExam, setSelectedExam] = useState<string>(initialExam);

  useEffect(() => {
    setSelectedExam(initialExam);
  }, [initialExam]);

  const filteredExams = selectedExam === 'All' 
    ? examData 
    : examData.filter(exam => exam.name === selectedExam);

  // If a specific exam is selected, show detailed view
  if (selectedExam !== 'All' && filteredExams.length > 0) {
    const exam = filteredExams[0];
    return <DetailedExamView exam={exam} />;
  }

  // Show all exams in grid view
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
          
          {/* Top Performers Section */}
          <div className="mt-16">
            <TopPerformersSection />
          </div>
          
          <div className="mt-16 text-center">
            <a 
              href="#contact" 
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold font-educational hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg"
            >
              Get Exam Preparation Guidance
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const TopPerformersSection: React.FC = () => {
  const achievers = [
    { id: 1, name: 'Rahul Sharma', score: 99.8, image: '/Pictures/1.jpg' },
    { id: 2, name: 'Priya Patel', score: 99.5, image: '/Pictures/2.jpg' },
    { id: 3, name: 'Amit Kumar', score: 99.2, image: '/Pictures/3.jpg' },
    { id: 4, name: 'Kavita Singh', score: 98.9, image: '/Pictures/4.jpg' },
    { id: 5, name: 'Sanjay Verma', score: 98.7, image: '/Pictures/5.jpg' }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-200">
      <h3 className="text-2xl font-bold font-educational text-blue-700 mb-8 flex items-center">
        <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm px-3 py-1 rounded-full mr-3 shadow-lg">ACHIEVERS</span>
        Our Top Performers
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {achievers.map((achiever) => (
          <div key={achiever.id} className="group bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="relative mb-4">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white/50 shadow-lg">
                <img 
                  src={achiever.image} 
                  alt={achiever.name} 
                  className="w-full h-full object-cover object-top scale-150 transition-transform duration-500 group-hover:scale-175" 
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                #{achiever.id}
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-3 mb-3">
                <div className="font-bold text-gray-900 text-sm mb-1">{achiever.name}</div>
                <div className="text-xs text-blue-600 font-semibold mb-1">JEE (Main) - 2024</div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {achiever.score}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DetailedExamView: React.FC<{ exam: Exam }> = ({ exam }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-10 p-12 text-white">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-4">
                  <div className="bg-white/20 p-3 rounded-full mr-4">
                    <Award size={32} />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold font-educational mb-2">{exam.fullName}</h1>
                    <p className="text-xl text-blue-100 font-body">{exam.name}</p>
                  </div>
                </div>
                <p className="text-lg text-blue-100 max-w-3xl font-body">
                  {exam.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Exam Overview */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-8 border border-white/50">
                <h2 className="text-2xl font-bold font-educational text-gray-900 mb-6">Exam Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Users size={20} className="text-blue-600 mr-3" />
                      <div>
                        <h4 className="font-semibold font-educational text-gray-900">Eligibility</h4>
                        <p className="text-gray-700 font-body">{exam.eligibility}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <BookOpen size={20} className="text-green-600 mr-3" />
                      <div>
                        <h4 className="font-semibold font-educational text-gray-900">Subjects</h4>
                        <p className="text-gray-700 font-body">
                          {exam.name === 'NEET' ? 'Physics, Chemistry, Biology' :
                           exam.name.includes('JEE') ? 'Physics, Chemistry, Mathematics' :
                           exam.name === 'BITSAT' ? 'Physics, Chemistry, Mathematics, English, Logical Reasoning' :
                           'Multiple subjects based on Olympiad type'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Clock size={20} className="text-purple-600 mr-3" />
                      <div>
                        <h4 className="font-semibold font-educational text-gray-900">Duration</h4>
                        <p className="text-gray-700 font-body">
                          {exam.name === 'NEET' ? '3 hours' :
                           exam.name === 'JEE Advanced' ? '6 hours (2 papers)' :
                           exam.name === 'JEE Main' ? '3 hours' :
                           exam.name === 'BITSAT' ? '3 hours' : 'Varies by Olympiad'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Target size={20} className="text-orange-600 mr-3" />
                      <div>
                        <h4 className="font-semibold font-educational text-gray-900">Mode</h4>
                        <p className="text-gray-700 font-body">
                          {exam.name === 'BITSAT' ? 'Computer-based' : 'Pen and Paper'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-8 border border-white/50">
                <h2 className="text-2xl font-bold font-educational text-gray-900 mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exam.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 font-body">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Dates */}
              {exam.importantDates && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-white/50">
                  <h2 className="text-2xl font-bold font-educational text-gray-900 mb-6">Important Dates</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exam.importantDates.map((date, index) => (
                      <div key={index} className="flex items-center">
                        <Calendar size={20} className="text-blue-600 mr-3" />
                        <span className="text-gray-700 font-body">{date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold font-educational text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-body">Exam Type:</span>
                    <span className="font-semibold font-educational">{exam.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-body">Level:</span>
                    <span className="font-semibold font-educational">
                      {exam.name === 'JEE Advanced' ? 'Advanced' :
                       exam.name === 'JEE Main' ? 'Main' :
                       exam.name === 'NEET' ? 'National' :
                       exam.name === 'BITSAT' ? 'University' : 'Competitive'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-body">Frequency:</span>
                    <span className="font-semibold font-educational">
                      {exam.name === 'JEE Main' ? 'Multiple times/year' :
                       exam.name === 'BITSAT' ? 'Once/year' :
                       exam.name === 'NEET' ? 'Once/year' :
                       exam.name === 'JEE Advanced' ? 'Once/year' : 'Varies'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Preparation Tips */}
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Preparation Tips</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Start preparation early</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Focus on NCERT books</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Practice previous year papers</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Take regular mock tests</span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white text-center">
                <h3 className="text-lg font-bold mb-3">Ready to Start?</h3>
                <p className="text-blue-100 mb-4">Join our specialized preparation program</p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center w-full">
                  Enroll Now
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </div>

          {(exam.name === 'NEET' || exam.name.includes('JEE')) && (
            <div className="mt-16">
              <TopPerformersSection />
            </div>
          )}

        </div>
      </div>
    </section>
  );
};   

const ExamCard: React.FC<{ exam: Exam }> = ({ exam }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={exam.image} 
          alt={exam.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {exam.name}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{exam.fullName}</h3>
        <p className="text-gray-700 mb-4">{exam.description}</p>
        
        <div className="mb-4">
          <div className="flex items-center text-gray-600 mb-2">
            <Users size={16} className="mr-2" />
            <span className="text-sm font-medium">Eligibility:</span>
          </div>
          <p className="text-sm text-gray-600 ml-6">{exam.eligibility}</p>
        </div>
        
        <div className="space-y-2 mb-4">
          {exam.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <p className="ml-2 text-sm text-gray-600">{feature}</p>
            </div>
          ))}
        </div>
        
        {exam.importantDates && (
          <div className="mb-4">
            <div className="flex items-center text-gray-600 mb-2">
              <Calendar size={16} className="mr-2" />
              <span className="text-sm font-medium">Important Dates:</span>
            </div>
            <div className="ml-6 space-y-1">
              {exam.importantDates.slice(0, 2).map((date, index) => (
                <p key={index} className="text-xs text-gray-600">{date}</p>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="px-6 pb-6">
        <button className="w-full bg-gray-100 hover:bg-blue-50 text-blue-600 py-2 rounded-md font-medium transition-colors duration-200">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default ExamsSection; 