import React from 'react';
import { Quote, Award, Users, BookOpen } from 'lucide-react';
import faculty1 from '../assets/images/faculty/IMG-20250712-WA0002.jpg';
const FoundersMessage: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Director's Image */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
                <img
                  src={faculty1}
                  alt="Director Portrait"
                  className="w-48 h-48 rounded-full object-cover border-2 border-blue-400 mb-6 shadow-lg"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. LP Prabhakar</h3>
                <p className="text-blue-600 font-semibold mb-4">Director, Mathematics Faculty (PhD, Maths)</p>
                <div className="flex flex-col items-center text-sm text-gray-600">
                  <span>Ex-Narayana, Guidance</span>
                </div>
              </div>
            </div>
            {/* Message Content */}
            <div>
              <div className="mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Director's <span className="text-blue-700">Message</span>
                </h2>
                <div className="w-20 h-1 bg-blue-600 mb-6"></div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Dear Students and Parents,<br/>
                At ADVANCE FORTE, our vision is to empower students with the knowledge and skills necessary to excel in the toughest competitive examinations. Our team of dedicated faculty members works tirelessly to create a conducive learning environment where students can thrive academically and personally. We believe in a student-centric approach, ensuring that every individual receives the attention and guidance they deserve. Success is not just about hard work; it is about smart work, perseverance, and the right mentorship. Our comprehensive curriculum, advanced teaching methodologies, and robust support system will help you achieve your dreams. Join us in this journey towards excellence, and together, let us build a brighter future.
              </p>
              <p className="font-semibold mt-8">Warm regards,<br/>Dr. LP Prabhakar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersMessage; 