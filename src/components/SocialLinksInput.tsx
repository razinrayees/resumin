import React from 'react';
import { Github, Linkedin, Globe, Twitter, Instagram, ExternalLink } from 'lucide-react';

interface SocialLinksInputProps {
  socials: Record<string, string>;
  onSocialsChange: (socials: Record<string, string>) => void;
}

const socialPlatforms = [
  { id: 'github', label: 'GitHub', icon: Github, placeholder: 'https://github.com/username', color: 'text-gray-700' },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/username', color: 'text-blue-600' },
  { id: 'website', label: 'Personal Website', icon: Globe, placeholder: 'https://yourwebsite.com', color: 'text-green-600' },
  { id: 'twitter', label: 'Twitter', icon: Twitter, placeholder: 'https://twitter.com/username', color: 'text-blue-400' },
  { id: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/username', color: 'text-pink-600' },
  { id: 'behance', label: 'Behance', icon: ExternalLink, placeholder: 'https://behance.net/username', color: 'text-blue-500' },
  { id: 'dribbble', label: 'Dribbble', icon: ExternalLink, placeholder: 'https://dribbble.com/username', color: 'text-pink-500' },
];

export const SocialLinksInput: React.FC<SocialLinksInputProps> = ({ socials, onSocialsChange }) => {
  const updateSocial = (platform: string, url: string) => {
    onSocialsChange({
      ...socials,
      [platform]: url
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links & Portfolio</h3>
      <div className="grid gap-4">
        {socialPlatforms.map((platform) => {
          const IconComponent = platform.icon;
          return (
            <div key={platform.id} className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center ${platform.color}`}>
                <IconComponent size={18} />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {platform.label}
                </label>
                <input
                  type="url"
                  value={socials[platform.id] || ''}
                  onChange={(e) => updateSocial(platform.id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
                  placeholder={platform.placeholder}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};