import React, { useState } from 'react';
import { Layout, Grid, Sidebar, Columns, Eye, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { ResumeLayout, LAYOUT_PRESETS, DEFAULT_LAYOUT } from '../types/user';

interface LayoutSelectorProps {
  selectedLayout: ResumeLayout;
  onLayoutChange: (layout: ResumeLayout) => void;
}

export const LayoutSelector: React.FC<LayoutSelectorProps> = ({
  selectedLayout,
  onLayoutChange
}) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [customLayout, setCustomLayout] = useState<ResumeLayout>(selectedLayout);

  const getStructureIcon = (structure: string) => {
    switch (structure) {
      case 'single-column':
        return <Layout size={20} />;
      case 'two-column':
        return <Columns size={20} />;
      case 'three-column':
        return <Grid size={20} />;
      case 'sidebar-left':
      case 'sidebar-right':
        return <Sidebar size={20} />;
      default:
        return <Layout size={20} />;
    }
  };

  const handlePresetSelect = (preset: ResumeLayout) => {
    setCustomLayout(preset);
    onLayoutChange(preset);
  };

  const handleCustomLayoutChange = (updates: Partial<ResumeLayout>) => {
    const updatedLayout = { ...customLayout, ...updates };
    setCustomLayout(updatedLayout);
    onLayoutChange(updatedLayout);
  };

  const toggleSectionVisibility = (section: string) => {
    const updatedVisibility = {
      ...customLayout.sectionVisibility,
      [section]: !customLayout.sectionVisibility[section]
    };
    handleCustomLayoutChange({ sectionVisibility: updatedVisibility });
  };

  const moveSectionUp = (index: number) => {
    if (index > 0) {
      const newOrder = [...customLayout.sectionOrder];
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
      handleCustomLayoutChange({ sectionOrder: newOrder });
    }
  };

  const moveSectionDown = (index: number) => {
    if (index < customLayout.sectionOrder.length - 1) {
      const newOrder = [...customLayout.sectionOrder];
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
      handleCustomLayoutChange({ sectionOrder: newOrder });
    }
  };

  const sectionLabels = {
    bio: 'About/Bio',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    certifications: 'Certifications',
    achievements: 'Achievements',
    languages: 'Languages',
    socials: 'Social Links'
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Layout size={20} className="mr-2" />
          Resume Layout
        </h3>
        
        {/* Layout Presets */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose a Layout Style
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LAYOUT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                className={`p-4 rounded-xl border-2 transition-all hover:scale-105 text-left ${
                  selectedLayout.id === preset.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedLayout.id === preset.id ? 'bg-orange-100' : 'bg-gray-100'
                  }`}>
                    {getStructureIcon(preset.structure)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{preset.name}</h4>
                    <p className="text-xs text-gray-500">{preset.structure.replace('-', ' ')}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{preset.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Layout Options */}
        <div className="bg-gray-50 rounded-xl p-6">
          <button
            onClick={() => setShowCustomization(!showCustomization)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center space-x-2">
              <Settings size={20} className="text-gray-600" />
              <h4 className="font-semibold text-gray-900">Customize Layout</h4>
            </div>
            {showCustomization ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showCustomization && (
            <div className="mt-6 space-y-6">
              {/* Structure Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Layout Structure
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: 'single-column', name: 'Single Column', icon: Layout },
                    { id: 'two-column', name: 'Two Column', icon: Columns },
                    { id: 'three-column', name: 'Three Column', icon: Grid },
                    { id: 'sidebar-left', name: 'Left Sidebar', icon: Sidebar },
                    { id: 'sidebar-right', name: 'Right Sidebar', icon: Sidebar }
                  ].map((structure) => {
                    const IconComponent = structure.icon;
                    return (
                      <button
                        key={structure.id}
                        onClick={() => handleCustomLayoutChange({ structure: structure.id as any })}
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          customLayout.structure === structure.id
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <IconComponent size={20} className="mx-auto mb-2" />
                        <span className="text-xs font-medium">{structure.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Header Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Header Style
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'full-width', name: 'Full Width' },
                    { id: 'centered', name: 'Centered' },
                    { id: 'minimal', name: 'Minimal' },
                    { id: 'split', name: 'Split' }
                  ].map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleCustomLayoutChange({ headerStyle: style.id as any })}
                      className={`p-3 rounded-lg border text-center transition-colors ${
                        customLayout.headerStyle === style.id
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm font-medium">{style.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Spacing */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Section Spacing
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'compact', name: 'Compact' },
                    { id: 'normal', name: 'Normal' },
                    { id: 'spacious', name: 'Spacious' }
                  ].map((spacing) => (
                    <button
                      key={spacing.id}
                      onClick={() => handleCustomLayoutChange({ spacing: spacing.id as any })}
                      className={`p-3 rounded-lg border text-center transition-colors ${
                        customLayout.spacing === spacing.id
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm font-medium">{spacing.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Styles */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Skills Display
                  </label>
                  <select
                    value={customLayout.skillsDisplay}
                    onChange={(e) => handleCustomLayoutChange({ skillsDisplay: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="bars">Progress Bars</option>
                    <option value="tags">Tags</option>
                    <option value="list">Simple List</option>
                    <option value="grid">Grid Layout</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Projects Display
                  </label>
                  <select
                    value={customLayout.projectsDisplay}
                    onChange={(e) => handleCustomLayoutChange({ projectsDisplay: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="cards">Cards</option>
                    <option value="list">List</option>
                    <option value="timeline">Timeline</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Experience Display
                  </label>
                  <select
                    value={customLayout.experienceDisplay}
                    onChange={(e) => handleCustomLayoutChange({ experienceDisplay: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="timeline">Timeline</option>
                    <option value="cards">Cards</option>
                    <option value="list">List</option>
                  </select>
                </div>
              </div>

              {/* Section Order and Visibility */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Section Order & Visibility
                </label>
                <div className="space-y-2">
                  {customLayout.sectionOrder.map((section, index) => (
                    <div key={section} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={customLayout.sectionVisibility[section]}
                          onChange={() => toggleSectionVisibility(section)}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <span className="font-medium text-gray-900">
                          {sectionLabels[section as keyof typeof sectionLabels] || section}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => moveSectionUp(index)}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          onClick={() => moveSectionDown(index)}
                          disabled={index === customLayout.sectionOrder.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronDown size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};