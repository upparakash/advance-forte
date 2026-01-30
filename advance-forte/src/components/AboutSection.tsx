import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, Award, BookOpen, Target } from 'lucide-react';
import logo from '../assets/images/logo.jpg';
const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Eminent Faculty",
      description: "Guidance from experienced educators and subject experts committed to student success."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Proven Track Record",
      description: "Consistent results in NEET, JEE, and Olympiads with students achieving top ranks."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Comprehensive Curriculum",
      description: "Well-structured, updated study material and regular assessments."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Personalized Attention",
      description: "Small batch sizes, individual mentoring, and customized support."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-lg font-body text-gray-600 leading-relaxed">
                Welcome to <b>Advance Forte</b>, a premier coaching institute dedicated to shaping the future of aspiring engineers and doctors. Our institute is committed to providing quality education, state-of-the-art facilities, and expert mentorship to help students achieve their goals in competitive exams like IIT-JEE, NEET, and various competitions. We follow a concept-based teaching methodology that incorporates real-world applications to ensure that students grasp concepts effectively. Our interactive classroom sessions are designed to engage students and enhance their learning experience.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold font-educational text-gray-800">
                Our Mission
              </h3>
              <p className="font-body text-gray-600 leading-relaxed">
                To empower students with the knowledge and skills necessary to excel in the toughest competitive examinations, fostering holistic development and academic excellence.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold font-educational text-gray-800">
                What Sets Us Apart
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="font-body text-gray-600">• Personalized guidance and doubt-clearing sessions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-body text-gray-600">• Special grooming batches for additional support</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-body text-gray-600">• Computer-Based Test (CBT) series with adaptive testing and analytics</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-body text-gray-600">• Regular practice through topic-wise and full-length mock tests</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="font-body text-gray-600">• One-to-one doubt-clearing and personalized academic support</span>
                </li>
              </ul>
            </div>
            <Link 
              to="/about" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold font-educational rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg"
            >
              Learn More About Us
            </Link>
          </div>
          
          {/* Right Content - Image */}
          <div className="flex items-center justify-center">
            <img
              src={logo}
              alt="Institute Campus"
              className="w-80 h-80 object-cover rounded-2xl border-2 border-blue-400 shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;