import React from 'react';
import { Palette, Check } from 'lucide-react';

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

const themes = [
  { id: 'blue', name: 'Ocean Blue', gradient: 'from-blue-400 via-blue-500 to-blue-600', color: '#3b82f6' },
  { id: 'green', name: 'Forest Green', gradient: 'from-green-400 via-green-500 to-green-600', color: '#10b981' },
  { id: 'purple', name: 'Royal Purple', gradient: 'from-purple-400 via-purple-500 to-purple-600', color: '#8b5cf6' },
  { id: 'orange', name: 'Sunset Orange', gradient: 'from-orange-400 via-pink-400 to-purple-500', color: '#f59e0b' },
  { id: 'pink', name: 'Rose Pink', gradient: 'from-pink-400 via-rose-400 to-red-500', color: '#ec4899' },
  { id: 'teal', name: 'Ocean Teal', gradient: 'from-teal-400 via-cyan-500 to-blue-500', color: '#14b8a6' },
  { id: 'indigo', name: 'Deep Indigo', gradient: 'from-indigo-400 via-purple-500 to-pink-500', color: '#6366f1' },
  { id: 'emerald', name: 'Emerald Green', gradient: 'from-emerald-400 via-green-500 to-teal-500', color: '#10b981' },
  { id: 'red', name: 'Crimson Red', gradient: 'from-red-400 via-pink-500 to-rose-500', color: '#ef4444' },
  { id: 'amber', name: 'Golden Amber', gradient: 'from-amber-400 via-orange-500 to-red-500', color: '#f59e0b' },
  { id: 'violet', name: 'Electric Violet', gradient: 'from-violet-400 via-purple-500 to-indigo-500', color: '#8b5cf6' },
  { id: 'cyan', name: 'Electric Cyan', gradient: 'from-cyan-400 via-blue-500 to-indigo-500', color: '#06b6d4' },
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedTheme,
  onThemeChange
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Palette size={20} className="mr-2" />
          Choose Your Color Theme
        </h3>
        
        {/* Theme Colors */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select a color theme for your resume
          </label>
          <div className="grid grid-cols-3 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onThemeChange(theme.id)}
                className={`relative p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                  selectedTheme === theme.id
                    ? 'border-gray-900 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-full h-12 rounded-lg bg-gradient-to-r ${theme.gradient} mb-3`} />
                <p className="text-sm font-medium text-gray-700">{theme.name}</p>
                {selectedTheme === theme.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-medium text-gray-900 mb-2">Preview</h4>
          <p className="text-sm text-gray-600">
            Your selected theme will be applied to your resume header and accent colors. 
            You can change this anytime from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};