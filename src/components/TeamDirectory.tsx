import React, { useState } from 'react';
import { X, Mail, Phone, Linkedin, Award, BookOpen, Users, Scale, ArrowLeft } from 'lucide-react';
import { teamMembers, TeamMember } from '../data/teamData';

interface TeamDirectoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamDirectory: React.FC<TeamDirectoryProps> = ({ isOpen, onClose }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  if (!isOpen) return null;

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const handleBackToDirectory = () => {
    setSelectedMember(null);
  };

  const handleClose = () => {
    setSelectedMember(null);
    onClose();
  };

  if (selectedMember) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="min-h-screen px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl">
            {/* Header */}
            <div className="relative p-6 border-b border-gray-200">
              <button
                onClick={handleBackToDirectory}
                className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Team Directory
              </button>
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Member Profile */}
            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Profile Image and Basic Info */}
                <div className="lg:col-span-1">
                  <div className="text-center">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-lg"
                    />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMember.name}</h2>
                    <p className="text-lg font-semibold text-yellow-600 mb-2">{selectedMember.role}</p>
                    <p className="text-gray-600 mb-6">{selectedMember.specialization}</p>
                    
                    {/* Contact Info */}
                    <div className="space-y-3">
                      <a
                        href={`mailto:${selectedMember.email}`}
                        className="flex items-center justify-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{selectedMember.email}</span>
                      </a>
                      <a
                        href={`tel:${selectedMember.phone}`}
                        className="flex items-center justify-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">{selectedMember.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">About</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedMember.description}</p>
                  </div>

                  {/* Experience */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Experience</h3>
                    <p className="text-gray-600">{selectedMember.experience}</p>
                  </div>

                  {/* Expertise */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Areas of Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.expertise.map((area, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Education</h3>
                    <ul className="space-y-2">
                      {selectedMember.education.map((edu, index) => (
                        <li key={index} className="text-gray-600 flex items-start">
                          <BookOpen className="h-4 w-4 mt-1 mr-2 text-yellow-600 flex-shrink-0" />
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Admissions */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Admissions</h3>
                    <ul className="space-y-2">
                      {selectedMember.admissions.map((admission, index) => (
                        <li key={index} className="text-gray-600 flex items-start">
                          <Scale className="h-4 w-4 mt-1 mr-2 text-yellow-600 flex-shrink-0" />
                          {admission}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Key Achievements</h3>
                    <ul className="space-y-2">
                      {selectedMember.achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-600 flex items-start">
                          <Award className="h-4 w-4 mt-1 mr-2 text-yellow-600 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Languages */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.languages.map((language, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="relative p-6 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900">Our Legal Team</h2>
            <p className="text-gray-600 mt-2">Meet our experienced team of legal professionals</p>
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Team Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => handleMemberClick(member)}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                >
                  <div className="text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm font-semibold text-yellow-600 mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600 mb-3">{member.specialization}</p>
                    <p className="text-xs text-gray-500">{member.experience}</p>
                    
                    {/* Qualifications */}
                    <div className="mt-3 flex flex-wrap justify-center gap-1">
                      {member.qualifications.slice(0, 2).map((qual, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {qual}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDirectory;