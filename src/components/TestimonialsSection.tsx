import React from 'react';
import { Quote } from 'lucide-react';
import { Testimonial } from '../types';
import { testimonialData } from '../data/testimonials';

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Student <span className="text-blue-700">Success Stories</span>
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">
            Hear from our successful students who have achieved their dreams of getting into premier institutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialData.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0 mr-4">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
          <p className="text-blue-600 font-medium">{testimonial.role}</p>
          {testimonial.achievement && (
            <div className="mt-1">
              <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                {testimonial.achievement}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="relative">
        <Quote className="absolute -top-2 -left-2 text-blue-200 w-8 h-8" />
        <p className="text-gray-700 text-sm leading-relaxed pl-6">
          "{testimonial.message}"
        </p>
      </div>
    </div>
  );
};

export default TestimonialsSection;