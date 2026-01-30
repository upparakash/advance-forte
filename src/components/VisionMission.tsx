import React from 'react';
import { Award, HeartHandshake, BrainCircuit, Blocks } from 'lucide-react';

const VisionMission: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-700">Vision</span> & <span className="text-green-600">Mission</span>
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">
            Our vision is to empower students to become successful professionals and responsible citizens, and our mission is to provide world-class education, mentorship, and holistic development for academic and personal excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Vision */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To empower students with the knowledge and skills necessary to excel in the toughest competitive examinations, and to foster a student-centric environment where every individual receives the attention and guidance they deserve.
              </p>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-200 rounded-full opacity-30"></div>
          </div>

          {/* Mission */}
          <div className="relative">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide quality education, state-of-the-art facilities, and expert mentorship, nurturing talent and guiding students to success in competitive exams like IIT-JEE, NEET, and various competitions, while fostering character development and leadership qualities.
              </p>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-200 rounded-full opacity-30"></div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h4>
              <p className="text-sm text-gray-600">Striving for the highest standards in everything we do</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Blocks className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Integrity</h4>
              <p className="text-sm text-gray-600">Maintaining honesty and ethical practices in all interactions</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BrainCircuit className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h4>
              <p className="text-sm text-gray-600">Embracing new technologies and teaching methodologies</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <HeartHandshake className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Compassion</h4>
              <p className="text-sm text-gray-600">Caring for each student's individual growth and well-being</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission; 