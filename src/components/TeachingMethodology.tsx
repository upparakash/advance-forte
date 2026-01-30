import React from 'react';
import { BookOpen, Users, Target, Clock, Monitor, Award, Brain, Zap } from 'lucide-react';

const TeachingMethodology: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-700">Teaching Methodology</span>
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">
            Our concept-based teaching methodology incorporates real-world applications to ensure that students grasp concepts effectively. Interactive classroom sessions, regular doubt-clearing, personalized guidance, and computer-based test series are key features of our approach.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Interactive classroom sessions designed to engage students</li>
              <li>Regular doubt-clearing and personalized guidance</li>
              <li>Special grooming batches for additional support</li>
              <li>Computer-Based Test (CBT) series with adaptive testing and analytics</li>
              <li>Topic-wise and full-length mock tests</li>
              <li>One-to-one doubt-clearing sessions</li>
            </ul>
          </div>
          {/* Image */}
          <div className="flex items-center justify-center">
            <img
              src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&w=800&q=80"
              alt="Teaching Methodology"
              className="w-80 h-60 object-cover rounded-2xl border-2 border-blue-400 shadow-lg"
            />
          </div>
        </div>
        {/* Success Metrics */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Methodology Success Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Concept Retention Rate</div>
              <div className="text-sm text-gray-600">Students retain concepts better through our methodology</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">87%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Problem Solving Skills</div>
              <div className="text-sm text-gray-600">Improved analytical and problem-solving abilities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">92%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Exam Confidence</div>
              <div className="text-sm text-gray-600">Students feel more confident during actual exams</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeachingMethodology; 