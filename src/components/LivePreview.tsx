import React from 'react';
import { Mail, ExternalLink, Github, Linkedin, Globe, MapPin, Phone, Calendar, Award, Languages, Star, Instagram, Twitter, User } from 'lucide-react';
import { UserProfile, SkillWithLevel } from '../types/user';

interface LivePreviewProps {
  profile: UserProfile;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ profile }) => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return <Github size={12} />;
      case 'linkedin':
        return <Linkedin size={12} />;
      case 'website':
        return <Globe size={12} />;
      case 'twitter':
        return <Twitter size={12} />;
      case 'instagram':
        return <Instagram size={12} />;
      case 'behance':
        return <ExternalLink size={12} />;
      case 'dribbble':
        return <ExternalLink size={12} />;
      default:
        return <ExternalLink size={12} />;
    }
  };

  const getThemeGradient = (theme: string = 'orange') => {
    const gradients = {
      blue: 'from-blue-400 via-blue-500 to-blue-600',
      green: 'from-green-400 via-green-500 to-green-600',
      purple: 'from-purple-400 via-purple-500 to-purple-600',
      orange: 'from-orange-400 via-pink-400 to-purple-500',
      pink: 'from-pink-400 via-rose-400 to-red-500',
      teal: 'from-teal-400 via-cyan-500 to-blue-500',
      indigo: 'from-indigo-400 via-purple-500 to-pink-500',
      emerald: 'from-emerald-400 via-green-500 to-teal-500',
      red: 'from-red-400 via-pink-500 to-rose-500',
      amber: 'from-amber-400 via-orange-500 to-red-500',
      violet: 'from-violet-400 via-purple-500 to-indigo-500',
      cyan: 'from-cyan-400 via-blue-500 to-indigo-500',
    };
    return gradients[theme as keyof typeof gradients] || gradients.orange;
  };

  const getSkillLevelWidth = (level: SkillWithLevel['level']) => {
    const widths = {
      beginner: '25%',
      intermediate: '50%',
      advanced: '75%',
      expert: '100%',
    };
    return widths[level];
  };

  const getSkillLevelColor = (level: SkillWithLevel['level']) => {
    const colors = {
      beginner: 'bg-red-400',
      intermediate: 'bg-yellow-400',
      advanced: 'bg-blue-400',
      expert: 'bg-green-400',
    };
    return colors[level];
  };

  const getAvailabilityBadge = (availability: string) => {
    const badges = {
      available: { text: 'Available for Work', color: 'bg-green-100 text-green-800' },
      'not-available': { text: 'Not Available', color: 'bg-red-100 text-red-800' },
      'open-to-offers': { text: 'Open to Offers', color: 'bg-blue-100 text-blue-800' },
    };
    return badges[availability as keyof typeof badges] || badges.available;
  };

  const gradientClass = getThemeGradient(profile.theme);
  const hasSocialLinks = Object.keys(profile.socials).some(key => profile.socials[key as keyof typeof profile.socials]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 h-full overflow-y-auto font-inter text-xs sm:text-sm">
      {/* Header with gradient background */}
      <div className={`relative bg-gradient-to-br ${gradientClass} rounded-lg p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4 lg:mb-6 text-white`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-4">
            {/* Profile Picture or Initials */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mx-auto sm:mx-0 overflow-hidden">
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt={profile.name || 'Profile'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <span className={`text-sm sm:text-base lg:text-xl font-bold ${profile.profilePicture ? 'hidden' : ''}`}>
                {profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
              </span>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-base sm:text-lg lg:text-2xl font-bold">{profile.name || 'Your Name'}</h1>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg">{profile.title || 'Your Title'}</p>
              {profile.availability && (
                <div className="mt-1 sm:mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityBadge(profile.availability).color} bg-white/20 text-white`}>
                    {getAvailabilityBadge(profile.availability).text}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="text-center sm:text-right text-xs space-y-1">
            {profile.showEmail && profile.email && (
              <div className="flex items-center justify-center sm:justify-end space-x-1 sm:space-x-2">
                <Mail size={10} />
                <span className="break-all">{profile.email}</span>
              </div>
            )}
            {profile.phone && (
              <div className="flex items-center justify-center sm:justify-end space-x-1 sm:space-x-2">
                <Phone size={10} />
                <span>{profile.phone}</span>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center justify-center sm:justify-end space-x-1 sm:space-x-2">
                <MapPin size={10} />
                <span>{profile.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Social Links */}
      {hasSocialLinks && (
        <div className="mb-3 sm:mb-4 lg:mb-6">
          <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-200 pb-1">
            Connect
          </h2>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {Object.entries(profile.socials).map(([platform, url]) => {
              if (!url) return null;
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-xs text-gray-600 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full"
                >
                  {getSocialIcon(platform)}
                  <span className="capitalize">{platform}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Bio Section */}
      {profile.bio && (
        <div className="mb-3 sm:mb-4 lg:mb-6">
          <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">{profile.bio}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-3 sm:space-y-4 lg:space-y-6">
          {/* Experience */}
          {profile.experience.length > 0 && (
            <div>
              <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-200 pb-1">
                Experience
              </h2>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                {profile.experience.slice(0, 3).map((exp, index) => (
                  <div key={index} className="text-xs">
                    <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-orange-600 font-medium">{exp.company}</p>
                    <div className="flex flex-col space-y-1 text-xs text-gray-500 mb-1">
                      <span>{exp.duration}</span>
                      {exp.location && <span>{exp.location}</span>}
                      {exp.type && <span className="capitalize">{exp.type.replace('-', ' ')}</span>}
                    </div>
                    {exp.desc && (
                      <p className="text-gray-600 text-xs line-clamp-2">
                        {exp.desc.split('\n')[0]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {profile.education.length > 0 && (
            <div>
              <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-200 pb-1">
                Education
              </h2>
              <div className="space-y-2 sm:space-y-3">
                {profile.education.slice(0, 2).map((edu, index) => (
                  <div key={index} className="text-xs">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <div className="text-xs text-gray-500">
                      <p>{edu.year}</p>
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {profile.languages && profile.languages.length > 0 && (
            <div>
              <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-200 pb-1 flex items-center">
                <Languages size={12} className="mr-1 sm:mr-2" />
                Languages
              </h2>
              <div className="space-y-1 sm:space-y-2">
                {profile.languages.slice(0, 3).map((lang, index) => (
                  <div key={index} className="flex justify-between items-center text-xs">
                    <span className="font-medium text-gray-900">{lang.name}</span>
                    <span className="text-xs px-1 sm:px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4 lg:space-y-6">
          {/* Skills */}
          {profile.skills.length > 0 && (
            <div>
              <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-200 pb-1">
                Skills & Expertise
              </h2>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                {['technical', 'soft', 'tool', 'language'].map(category => {
                  const categorySkills = profile.skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  const categoryLabels = {
                    technical: 'Technical Skills',
                    soft: 'Soft Skills',
                    tool: 'Tools & Technologies',
                    language: 'Programming Languages'
                  };

                  return (
                    <div key={category}>
                      <h3 className="font-semibold text-gray-700 text-xs mb-1 sm:mb-2">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </h3>
                      <div className="space-y-1 sm:space-y-2">
                        {categorySkills.slice(0, 4).map((skill, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-xs text-gray-900">{skill.name}</span>
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <div className="w-8 sm:w-12 lg:w-16 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${getSkillLevelColor(skill.level)} transition-all duration-300`}
                                  style={{ width: getSkillLevelWidth(skill.level) }}
                                />
                              </div>
                              <span className="text-xs text-gray-500 capitalize w-8 sm:w-12 lg:w-16 text-right">
                                {skill.level.slice(0, 3)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Projects */}
          {profile.projects.length > 0 && (
            <div>
              <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 sm:mb-3 border-b border-gray-200 pb-1">
                Projects
              </h2>
              <div className="space-y-2 sm:space-y-3">
                {profile.projects.slice(0, 3).map((project, index) => (
                  <div key={index} className="text-xs">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 flex items-center">
                        {project.name}
                        {project.featured && (
                          <Star size={8} className="ml-1 text-yellow-500 fill-current" />
                        )}
                      </h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs mb-1 line-clamp-2">{project.desc}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span key={techIndex} className="px-1 sm: px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
        <div className="flex justify-center items-center gap-2">
          <p className="text-gray-500 text-xs sm:text-sm">Made with</p>
          <a 
            href="https://resumin.link" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="-mt-1 inline-block"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20">
              <img 
                src="https://raw.githubusercontent.com/razinrayees/razinrayees/master/1logo.png" 
                alt="Resumin Logo" 
                className="w-full h-full object-contain" 
                loading="lazy"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};