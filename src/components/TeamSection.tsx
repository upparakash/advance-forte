import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { TeamMember } from '../types';
import { teamData } from '../data/team';

const TeamSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamData.map((member) => (
              <FacultyCard key={member.id} member={member} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-700 mb-4 font-body">
              Interested in joining our faculty team?
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold font-educational hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const FacultyCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <div className="group bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className="relative h-80 overflow-hidden">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        {member.specialization && (
          <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg">
            {member.specialization}
          </div>
        )}
        
        {/* Floating Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-xl p-4 shadow-xl">
            <h3 className="text-lg font-bold text-black mb-1">{member.name}</h3>
            <p className="text-blue-800 font-semibold text-sm">{member.role}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-700 text-sm leading-relaxed mb-4 font-body">{member.bio}</p>
        
        {member.socialLinks && (
          <div className="flex justify-center space-x-4">
            {member.socialLinks.linkedin && (
              <a 
                href={member.socialLinks.linkedin} 
                className="bg-white/20 backdrop-blur-sm border border-white/30 p-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-white/40 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={16} />
              </a>
            )}
            {member.socialLinks.twitter && (
              <a 
                href={member.socialLinks.twitter} 
                className="bg-white/20 backdrop-blur-sm border border-white/30 p-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-white/40 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={16} />
              </a>
            )}
            {member.socialLinks.email && (
              <a 
                href={`mailto:${member.socialLinks.email}`} 
                className="bg-white/20 backdrop-blur-sm border border-white/30 p-2 rounded-full text-gray-600 hover:text-blue-600 hover:bg-white/40 transition-all duration-300"
              >
                <Mail size={16} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamSection;