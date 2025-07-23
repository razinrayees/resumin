import React from 'react';
import { Eye, EyeOff, Globe, Lock, Info } from 'lucide-react';

interface PrivacySettingsProps {
  isPublic: boolean;
  onPrivacyChange: (isPublic: boolean) => void;
  showEmailPublicly: boolean;
  onShowEmailChange: (showEmail: boolean) => void;
}

export const PrivacySettings: React.FC<PrivacySettingsProps> = ({
  isPublic,
  onPrivacyChange,
  showEmailPublicly,
  onShowEmailChange
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Lock size={20} className="mr-2" />
          Privacy Settings
        </h3>
        
        {/* Profile Visibility */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isPublic ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {isPublic ? (
                <Globe size={24} className="text-green-600" />
              ) : (
                <Lock size={24} className="text-gray-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold text-gray-900">
                  Profile Visibility
                </h4>
                <button
                  onClick={() => onPrivacyChange(!isPublic)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isPublic ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isPublic ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                {isPublic 
                  ? 'Your profile is public and can be viewed by anyone with the link'
                  : 'Your profile is private and only you can view it'
                }
              </p>
              
              <div className={`p-4 rounded-lg border-l-4 ${
                isPublic 
                  ? 'bg-green-50 border-green-400' 
                  : 'bg-gray-50 border-gray-400'
              }`}>
                <div className="flex items-start space-x-2">
                  <Info size={16} className={isPublic ? 'text-green-600' : 'text-gray-600'} />
                  <div className="text-sm">
                    {isPublic ? (
                      <div>
                        <p className="font-medium text-green-800 mb-1">Public Profile</p>
                        <ul className="text-green-700 space-y-1">
                          <li>• Visible to anyone with your link</li>
                          <li>• Can be shared with employers and recruiters</li>
                          <li>• Indexed by search engines</li>
                        </ul>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium text-gray-800 mb-1">Private Profile</p>
                        <ul className="text-gray-700 space-y-1">
                          <li>• Only visible to you when logged in</li>
                          <li>• Not accessible via public link</li>
                          <li>• Perfect for testing and editing</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Email Visibility */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              showEmailPublicly ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              {showEmailPublicly ? (
                <Eye size={24} className="text-blue-600" />
              ) : (
                <EyeOff size={24} className="text-gray-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold text-gray-900">
                  Show Email Address
                </h4>
                <button
                  onClick={() => onShowEmailChange(!showEmailPublicly)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showEmailPublicly ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  disabled={!isPublic}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showEmailPublicly ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-gray-600 mb-2">
                {showEmailPublicly 
                  ? 'Your email address will be visible on your public profile'
                  : 'Your email address will be hidden from your public profile'
                }
              </p>
              {!isPublic && (
                <p className="text-sm text-gray-500 italic">
                  This setting only applies when your profile is public
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};