import React, { useState } from 'react';
import { Plus, X, TrendingUp } from 'lucide-react';
import { SkillWithLevel } from '../types/user';

interface SkillInputProps {
  skills: SkillWithLevel[];
  onSkillsChange: (skills: SkillWithLevel[]) => void;
}

const skillLevels = [
  { id: 'beginner', label: 'Beginner', color: 'bg-red-100 text-red-800', width: '25%' },
  { id: 'intermediate', label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800', width: '50%' },
  { id: 'advanced', label: 'Advanced', color: 'bg-blue-100 text-blue-800', width: '75%' },
  { id: 'expert', label: 'Expert', color: 'bg-green-100 text-green-800', width: '100%' },
];

const skillCategories = [
  { id: 'technical', label: 'Technical' },
  { id: 'soft', label: 'Soft Skills' },
  { id: 'language', label: 'Languages' },
  { id: 'tool', label: 'Tools' },
];

export const SkillInput: React.FC<SkillInputProps> = ({ skills, onSkillsChange }) => {
  const [newSkill, setNewSkill] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<SkillWithLevel['level']>('intermediate');
  const [selectedCategory, setSelectedCategory] = useState<SkillWithLevel['category']>('technical');

  const addSkill = () => {
    if (newSkill.trim() && !skills.some(skill => skill.name.toLowerCase() === newSkill.toLowerCase())) {
      const skill: SkillWithLevel = {
        name: newSkill.trim(),
        level: selectedLevel,
        category: selectedCategory
      };
      onSkillsChange([...skills, skill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter(skill => skill.name !== skillToRemove));
  };

  const updateSkillLevel = (skillName: string, level: SkillWithLevel['level']) => {
    onSkillsChange(skills.map(skill => 
      skill.name === skillName ? { ...skill, level } : skill
    ));
  };

  const getLevelInfo = (level: SkillWithLevel['level']) => {
    return skillLevels.find(l => l.id === level) || skillLevels[1];
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center">
          <TrendingUp size={16} className="mr-2" />
          Your Skills & Expertise
        </label>
        
        {/* Add New Skill */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
              placeholder="Add a skill..."
            />
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as SkillWithLevel['category'])}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
            >
              {skillCategories.map(category => (
                <option key={category.id} value={category.id}>{category.label}</option>
              ))}
            </select>
            
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as SkillWithLevel['level'])}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900"
            >
              {skillLevels.map(level => (
                <option key={level.id} value={level.id}>{level.label}</option>
              ))}
            </select>
            
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
            >
              <Plus size={16} className="mr-1" />
              Add
            </button>
          </div>
        </div>

        {/* Skills List */}
        <div className="space-y-4">
          {skills.map((skill, index) => {
            const levelInfo = getLevelInfo(skill.level);
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-gray-900">{skill.name}</h4>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {skillCategories.find(c => c.id === skill.category)?.label}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill.name)}
                    className="p-1 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="skill-progress">
                      <div 
                        className="skill-progress-fill" 
                        style={{ width: levelInfo.width }}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {skillLevels.map(level => (
                      <button
                        key={level.id}
                        type="button"
                        onClick={() => updateSkillLevel(skill.name, level.id as SkillWithLevel['level'])}
                        className={`px-2 py-1 text-xs rounded-full transition-colors ${
                          skill.level === level.id
                            ? level.color
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};