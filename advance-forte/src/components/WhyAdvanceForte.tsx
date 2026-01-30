import React from 'react';
import { CheckCircle, UsersRound } from 'lucide-react';

const WhyAdvanceForte: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-blue-700">Advance Forte</span>
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">
            Discover what makes Advance Forte the preferred choice for students and parents across India.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* USPs from prospectus */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Highly Experienced Faculty</h3>
            <p className="text-gray-700">Guidance from top educators with years of experience in competitive exam coaching.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Hybrid Model & Digital Classrooms</h3>
            <p className="text-gray-700">Flexible learning with both offline and online options, and modern digital classrooms.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Academic Excellence</h3>
            <p className="text-gray-700">Doubt resolution, DPPs, tests, assignments, and personalized mentorship for every student.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Performance Tracking</h3>
            <p className="text-gray-700">Regular mock exams, test series, and analytics to track and improve performance.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Student Support & Well-Being</h3>
            <p className="text-gray-700">Workshops, seminars, stress-free programs, and 24/7 support for holistic student well-being.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Holistic Development</h3>
            <p className="text-gray-700">PTMs, scholarship programs, group discussions, and peer learning for all-round growth.</p>
          </div>
        </div>
        {/* Statistics Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Our Commitment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <CheckCircle className="h-10 w-10 text-blue-600 mb-2" />
              <div className="text-lg font-bold text-blue-600 mb-2">Consistent Results</div>
              <div className="text-sm text-gray-600 text-center">Our students regularly achieve success in competitive exams through dedicated support and guidance.</div>
            </div>
            <div className="flex flex-col items-center">
              <UsersRound className="h-10 w-10 text-green-600 mb-2" />
              <div className="text-lg font-bold text-green-600 mb-2">Student-Centric Approach</div>
              <div className="text-sm text-gray-600 text-center">We focus on holistic development and personalized mentorship for every learner.</div>
            </div>
          </div>
        </div>
        
        {/* Testimonials Preview */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">What Our Students Say</h3>
            <p className="text-blue-100">Join thousands of satisfied students who achieved their dreams with Advance Forte</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "Advance Forte helped me achieve my dream of getting into IIT Bombay. The faculty is exceptional!", author: "Rahul Sharma", achievement: "AIR 156 - JEE Advanced" },
              { text: "The NEET preparation was outstanding. I scored 720/720 and got admission in AIIMS Delhi.", author: "Priya Patel", achievement: "720/720 - NEET" },
              { text: "Personalized attention and comprehensive study material made all the difference in my success.", author: "Amit Kumar", achievement: "BITS Pilani" }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4">
                <p className="text-sm mb-3">"{testimonial.text}"</p>
                <div className="text-xs">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-blue-200">{testimonial.achievement}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAdvanceForte; 