import React from 'react';
import { Mail, ExternalLink, Github, Linkedin, Globe, MapPin, Phone, Calendar, Award, Languages, Star, Instagram, Twitter, User } from 'lucide-react';
import { UserProfile, SkillWithLevel, ResumeLayout } from '../types/user';

interface CustomizableResumePreviewProps {
  profile: UserProfile;
  layout: ResumeLayout;
}

export const CustomizableResumePreview: React.FC<CustomizableResumePreviewProps> = ({ 
  profile, 
  layout 
}) => {
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

  const getSpacingClass = () => {
    switch (layout.spacing) {
      case 'compact':
        return 'space-y-3';
      case 'spacious':
        return 'space-y-8';
      default:
        return 'space-y-6';
    }
  };

  const gradientClass = getThemeGradient(profile.theme);
  const hasSocialLinks = Object.keys(profile.socials).some(key => profile.socials[key as keyof typeof profile.socials]);

  // Render header based on style
  const renderHeader = () => {
    const headerContent = (
      <>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Profile Picture or Initials */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mx-auto sm:mx-0 overflow-hidden">
            {profile.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt={profile.name || 'Profile'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <span className={`text-lg sm:text-xl font-bold ${profile.profilePicture ? 'hidden' : ''}`}>
              {profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
            </span>
          </div>
          <div className={layout.headerStyle === 'centered' ? 'text-center' : 'text-center sm:text-left'}>
            <h1 className="text-xl sm:text-2xl font-bold">{profile.name}</h1>
            <p className="text-white/90 text-base sm:text-lg">{profile.title}</p>
            {profile.availability && (
              <div className="mt-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityBadge(profile.availability).color} bg-white/20 text-white`}>
                  {getAvailabilityBadge(profile.availability).text}
                </span>
              </div>
            )}
          </div>
        </div>
        {/* Contact info - Always show for non-minimal layouts */}
        {layout.headerStyle !== 'minimal' && (
          <div className="text-center sm:text-right text-xs sm:text-sm space-y-1">
            {profile.showEmail && profile.email && (
              <div className="flex items-center justify-center sm:justify-end space-x-2">
                <Mail size={12} />
                <span className="break-all">{profile.email}</span>
              </div>
            )}
            {profile.phone && (
              <div className="flex items-center justify-center sm:justify-end space-x-2">
                <Phone size={12} />
                <span>{profile.phone}</span>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center justify-center sm:justify-end space-x-2">
                <MapPin size={12} />
                <span>{profile.location}</span>
              </div>
            )}
          </div>
        )}
      </>
    );

    switch (layout.headerStyle) {
      case 'split':
        return (
          <div className={`bg-gradient-to-br ${gradientClass} rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 text-white`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {headerContent}
            </div>
          </div>
        );
      case 'minimal':
        return (
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{profile.title}</p>
            {profile.availability && (
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityBadge(profile.availability).color} mb-4`}>
                {getAvailabilityBadge(profile.availability).text}
              </span>
            )}
            {/* Contact info for minimal layout - shown below the title */}
            <div className="space-y-2 text-sm text-gray-600">
              {profile.showEmail && profile.email && (
                <div className="flex items-center justify-center space-x-2">
                  <Mail size={14} />
                  <span>{profile.email}</span>
                </div>
              )}
              {profile.phone && (
                <div className="flex items-center justify-center space-x-2">
                  <Phone size={14} />
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center justify-center space-x-2">
                  <MapPin size={14} />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </div>
        );
      case 'centered':
        return (
          <div className={`bg-gradient-to-br ${gradientClass} rounded-xl p-6 mb-6 text-white text-center`}>
            {headerContent}
          </div>
        );
      default: // full-width
        return (
          <div className={`bg-gradient-to-br ${gradientClass} rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 text-white`}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
              {headerContent}
            </div>
          </div>
        );
    }
  };

  // Render skills based on display style
  const renderSkills = () => {
    if (!layout.sectionVisibility.skills || profile.skills.length === 0) return null;

    const skillsByCategory = profile.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, SkillWithLevel[]>);

    const categoryLabels = {
      technical: 'Technical Skills',
      soft: 'Soft Skills',
      tool: 'Tools & Technologies',
      language: 'Programming Languages'
    };

    switch (layout.skillsDisplay) {
      case 'tags':
        return (
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    skill.level === 'expert' ? 'bg-green-100 text-green-800' :
                    skill.level === 'advanced' ? 'bg-blue-100 text-blue-800' :
                    skill.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        );

      case 'grid':
        return (
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {profile.skills.map((skill, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="font-medium text-gray-900 text-sm">{skill.name}</div>
                  <div className="text-xs text-gray-500 capitalize mt-1">{skill.level}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'list':
        return (
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Skills & Expertise
            </h2>
            <div className="space-y-2">
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="font-semibold text-gray-700 text-sm mb-1">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {skills.map(skill => skill.name).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      default: // bars
        return (
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Skills & Expertise
            </h2>
            <div className="space-y-4">
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="font-semibold text-gray-700 text-sm mb-2">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h3>
                  <div className="space-y-2">
                    {skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-900">{skill.name}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getSkillLevelColor(skill.level)} transition-all duration-300`}
                              style={{ width: getSkillLevelWidth(skill.level) }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 capitalize w-16 text-right">
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  // Render projects based on display style
  const renderProjects = () => {
    if (!layout.sectionVisibility.projects || profile.projects.length === 0) return null;

    switch (layout.projectsDisplay) {
      case 'timeline':
        return (
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Projects
            </h2>
            <div className="space-y-4">
              {profile.projects.map((project, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-orange-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-orange-500 rounded-full"></div>
                  <div className="text-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 flex items-center">
                        {project.name}
                        {project.featured && (
                          <Star size={10} className="ml-1 text-yellow-500 fill-current" />
                        )}
                      </h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs mb-2">{project.desc}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cards':
        return (
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Projects
            </h2>
            <div className="grid gap-4">
              {profile.projects.map((project, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      {project.name}
                      {project.featured && (
                        <Star size={10} className="ml-1 text-yellow-500 fill-current" />
                      )}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{project.desc}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default: // list
        return (
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Projects
            </h2>
            <div className="space-y-3">
              {profile.projects.map((project, index) => (
                <div key={index} className="text-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      {project.name}
                      {project.featured && (
                        <Star size={10} className="ml-1 text-yellow-500 fill-current" />
                      )}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs mb-1">{project.desc}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <p className="text-xs text-gray-500">
                      <strong>Tech:</strong> {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  // Render experience based on display style
  const renderExperience = () => {
    if (!layout.sectionVisibility.experience || profile.experience.length === 0) return null;

    switch (layout.experienceDisplay) {
      case 'cards':
        return (
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Experience
            </h2>
            <div className="space-y-4">
              {profile.experience.map((exp, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-orange-600 font-medium">{exp.company}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-xs text-gray-500 mb-2 space-y-1 sm:space-y-0">
                    <span>{exp.duration}</span>
                    {exp.location && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span>{exp.location}</span>
                      </>
                    )}
                    {exp.type && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span className="capitalize">{exp.type.replace('-', ' ')}</span>
                      </>
                    )}
                  </div>
                  {exp.desc && (
                    <ul className="text-gray-600 text-sm space-y-1">
                      {exp.desc.split('\n').map((line, i) => (
                        <li key={i}>• {line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'list':
        return (
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Experience
            </h2>
            <div className="space-y-3">
              {profile.experience.map((exp, index) => (
                <div key={index} className="text-sm">
                  <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-orange-600 font-medium">{exp.company}</p>
                  <p className="text-xs text-gray-500">{exp.duration}</p>
                  {exp.desc && (
                    <p className="text-gray-600 text-xs mt-1">{exp.desc.split('\n')[0]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default: // timeline
        return (
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Experience
            </h2>
            <div className="space-y-4">
              {profile.experience.map((exp, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-orange-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-orange-500 rounded-full"></div>
                  <div className="text-sm">
                    <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-orange-600 font-medium">{exp.company}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-xs text-gray-500 mb-1 space-y-1 sm:space-y-0">
                      <span>{exp.duration}</span>
                      {exp.location && (
                        <>
                          <span className="hidden sm:inline">•</span>
                          <span>{exp.location}</span>
                        </>
                      )}
                      {exp.type && (
                        <>
                          <span className="hidden sm:inline">•</span>
                          <span className="capitalize">{exp.type.replace('-', ' ')}</span>
                        </>
                      )}
                    </div>
                    {exp.desc && (
                      <ul className="text-gray-600 text-xs space-y-1">
                        {exp.desc.split('\n').map((line, i) => (
                          <li key={i}>• {line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  // Render other sections
  const renderSection = (sectionKey: string) => {
    if (!layout.sectionVisibility[sectionKey]) return null;

    switch (sectionKey) {
      case 'bio':
        return profile.bio ? (
          <div>
            <p className="text-gray-700 leading-relaxed text-sm">{profile.bio}</p>
          </div>
        ) : null;

      case 'socials':
        return hasSocialLinks ? (
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Connect
            </h2>
            <div className="flex flex-wrap gap-2">
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
        ) : null;

      case 'education':
        return profile.education.length > 0 ? (
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {profile.education.map((edu, index) => (
                <div key={index} className="text-sm">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>{edu.year}</p>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    {edu.honors && <p>{edu.honors}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'certifications':
        return profile.certifications && profile.certifications.length > 0 ? (
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1 flex items-center">
              <Award size={14} className="mr-2" />
              Certifications
            </h2>
            <div className="space-y-3">
              {profile.certifications.map((cert, index) => (
                <div key={index} className="text-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <div className="text-xs text-gray-500">
                    <span>{cert.date}</span>
                    {cert.expiryDate && <span> • Expires: {cert.expiryDate}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'achievements':
        return profile.achievements && profile.achievements.length > 0 ? (
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1 flex items-center">
              <Star size={14} className="mr-2" />
              Achievements
            </h2>
            <div className="space-y-3">
              {profile.achievements.map((achievement, index) => (
                <div key={index} className="text-sm">
                  <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                  <p className="text-gray-600 text-xs mb-1">{achievement.description}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-xs text-gray-500 space-y-1 sm:space-y-0">
                    <span>{achievement.date}</span>
                    {achievement.category && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span className="capitalize">{achievement.category}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'languages':
        return profile.languages && profile.languages.length > 0 ? (
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1 flex items-center">
              <Languages size={14} className="mr-2" />
              Languages
            </h2>
            <div className="space-y-2">
              {profile.languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-900">{lang.name}</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'skills':
        return renderSkills();

      case 'projects':
        return renderProjects();

      case 'experience':
        return renderExperience();

      default:
        return null;
    }
  };

  // Determine layout structure
  const getLayoutStructure = () => {
    const sections = layout.sectionOrder.map(sectionKey => renderSection(sectionKey)).filter(Boolean);
    
    switch (layout.structure) {
      case 'single-column':
        return (
          <div className={getSpacingClass()}>
            {sections}
          </div>
        );

      case 'three-column':
        const thirdSize = Math.ceil(sections.length / 3);
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={getSpacingClass()}>
              {sections.slice(0, thirdSize)}
            </div>
            <div className={getSpacingClass()}>
              {sections.slice(thirdSize, thirdSize * 2)}
            </div>
            <div className={getSpacingClass()}>
              {sections.slice(thirdSize * 2)}
            </div>
          </div>
        );

      case 'sidebar-left':
        const leftSidebarSplit = Math.ceil(sections.length * 0.3);
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`lg:col-span-1 ${getSpacingClass()}`}>
              {sections.slice(0, leftSidebarSplit)}
            </div>
            <div className={`lg:col-span-2 ${getSpacingClass()}`}>
              {sections.slice(leftSidebarSplit)}
            </div>
          </div>
        );

      case 'sidebar-right':
        const rightSidebarSplit = Math.ceil(sections.length * 0.7);
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`lg:col-span-2 ${getSpacingClass()}`}>
              {sections.slice(0, rightSidebarSplit)}
            </div>
            <div className={`lg:col-span-1 ${getSpacingClass()}`}>
              {sections.slice(rightSidebarSplit)}
            </div>
          </div>
        );

      default: // two-column
        const halfSize = Math.ceil(sections.length / 2);
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={getSpacingClass()}>
              {sections.slice(0, halfSize)}
            </div>
            <div className={getSpacingClass()}>
              {sections.slice(halfSize)}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 font-inter text-xs sm:text-sm">
      {renderHeader()}
      {getLayoutStructure()}

      {/* Footer */}
      <div className="text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
        <div className="flex justify-center items-center gap-2">
          <p className="text-gray-500 text-sm">Made with</p>
          <span className="text-orange-600 font-semibold">Resumin</span>
        </div>
      </div>
    </div>
  );
};