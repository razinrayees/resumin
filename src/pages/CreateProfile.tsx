import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { UserProfile, SkillWithLevel, DEFAULT_LAYOUT } from '../types/user';
import { StepNavigation } from '../components/StepNavigation';
import { CustomizableResumePreview } from '../components/CustomizableResumePreview';
import { SkillInput } from '../components/SkillInput';
import { SocialLinksInput } from '../components/SocialLinksInput';
import { ThemeSelector } from '../components/ThemeSelector';
import { LayoutSelector } from '../components/LayoutSelector';
import { UsernameInput } from '../components/UsernameInput';
import { PrivacySettings } from '../components/PrivacySettings';
import { ProfilePictureUpload } from '../components/ProfilePictureUpload';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Link, 
  Palette, 
  Save,
  ArrowLeft,
  ArrowRight,
  Settings,
  Eye,
  Menu,
  X,
  Camera,
  Layout
} from 'lucide-react';
import toast from 'react-hot-toast';

const steps = [
  { id: 'basic', title: 'Basic Info', icon: User },
  { id: 'picture', title: 'Picture', icon: Camera },
  { id: 'experience', title: 'Experience', icon: Briefcase },
  { id: 'education', title: 'Education', icon: GraduationCap },
  { id: 'skills', title: 'Skills', icon: Code },
  { id: 'projects', title: 'Projects', icon: Link },
  { id: 'socials', title: 'Social Links', icon: Link },
  { id: 'theme', title: 'Theme', icon: Palette },
  { id: 'layout', title: 'Layout', icon: Layout },
  { id: 'privacy', title: 'Privacy', icon: Settings },
  { id: 'preview', title: 'Preview', icon: Eye },
];

export const CreateProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    name: '',
    title: '',
    bio: '',
    email: currentUser?.email || '',
    showEmail: true,
    phone: '',
    location: '',
    availability: 'available',
    isPublic: true,
    theme: 'orange',
    profilePicture: '',
    layout: DEFAULT_LAYOUT,
    skills: [],
    socials: {},
    education: [],
    experience: [],
    projects: [],
    certifications: [],
    achievements: [],
    languages: [],
  });

  // Load existing profile if it exists
  useEffect(() => {
    const loadExistingProfile = async () => {
      if (!currentUser) return;
      
      try {
        const userDoc = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userDoc);
        
        if (docSnap.exists()) {
          const existingProfile = docSnap.data() as UserProfile;
          setProfile({
            ...existingProfile,
            // Ensure new fields have default values
            isPublic: existingProfile.isPublic ?? true,
            showEmail: existingProfile.showEmail ?? true,
            profilePicture: existingProfile.profilePicture ?? '',
            layout: existingProfile.layout ?? DEFAULT_LAYOUT,
          });
        }
      } catch (error) {
        console.error('Error loading existing profile:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadExistingProfile();
  }, [currentUser]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const addExperience = () => {
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, { role: '', company: '', duration: '', desc: '' }]
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (index: number) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', year: '' }]
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index: number) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    setProfile(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', desc: '' }]
    }));
  };

  const updateProject = (index: number, field: string, value: string | string[] | boolean) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  const removeProject = (index: number) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const saveProfile = async () => {
    if (!currentUser) return;

    // Validation
    if (!profile.username.trim()) {
      toast.error('Username is required');
      setCurrentStep('basic');
      return;
    }

    if (!profile.name.trim()) {
      toast.error('Name is required');
      setCurrentStep('basic');
      return;
    }

    if (!profile.title.trim()) {
      toast.error('Title is required');
      setCurrentStep('basic');
      return;
    }

    setLoading(true);
    try {
      const userDoc = doc(db, 'users', currentUser.uid);
      await setDoc(userDoc, {
        ...profile,
        username: profile.username.toLowerCase(),
        updatedAt: new Date().toISOString(),
      });

      toast.success('Profile saved successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Error saving profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStepIndex = () => steps.findIndex(step => step.id === currentStep);
  const isLastStep = getCurrentStepIndex() === steps.length - 1;
  const isFirstStep = getCurrentStepIndex() === 0;

  const nextStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const prevStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Basic Information</h2>
              
              <div className="space-y-4 sm:space-y-6">
                <UsernameInput
                  username={profile.username}
                  onUsernameChange={(username) => updateProfile({ username })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => updateProfile({ name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Title *
                    </label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) => updateProfile({ title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Software Engineer"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Bio
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => updateProfile({ bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Tell us about yourself, your experience, and what makes you unique..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profile.phone || ''}
                      onChange={(e) => updateProfile({ phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profile.location || ''}
                      onChange={(e) => updateProfile({ location: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="San Francisco, CA"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability Status
                  </label>
                  <select
                    value={profile.availability}
                    onChange={(e) => updateProfile({ availability: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="available">Available for Work</option>
                    <option value="open-to-offers">Open to Offers</option>
                    <option value="not-available">Not Available</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'picture':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Profile Picture</h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Add a professional profile picture to make your resume more personal and memorable.
              </p>
              
              <ProfilePictureUpload
                currentImageUrl={profile.profilePicture}
                onImageChange={(imageUrl) => updateProfile({ profilePicture: imageUrl || '' })}
                userId={currentUser?.uid || ''}
              />
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Work Experience</h2>
              <button
                onClick={addExperience}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm sm:text-base"
              >
                Add Experience
              </button>
            </div>

            <div className="space-y-6">
              {profile.experience.map((exp, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Experience #{index + 1}</h3>
                    <button
                      onClick={() => removeExperience(index)}
                      className="text-red-500 hover:text-red-700 transition-colors text-sm self-start sm:self-auto"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(index, 'role', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Job Title"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Company Name"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Jan 2020 - Present"
                    />
                    <input
                      type="text"
                      value={exp.location || ''}
                      onChange={(e) => updateExperience(index, 'location', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Location"
                    />
                    <select
                      value={exp.type || ''}
                      onChange={(e) => updateExperience(index, 'type', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="">Employment Type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>

                  <textarea
                    value={exp.desc}
                    onChange={(e) => updateExperience(index, 'desc', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              ))}

              {profile.experience.length === 0 && (
                <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-xl">
                  <Briefcase size={40} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">No work experience added yet</p>
                  <button
                    onClick={addExperience}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm sm:text-base"
                  >
                    Add Your First Experience
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Education</h2>
              <button
                onClick={addEducation}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm sm:text-base"
              >
                Add Education
              </button>
            </div>

            <div className="space-y-6">
              {profile.education.map((edu, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Education #{index + 1}</h3>
                    <button
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700 transition-colors text-sm self-start sm:self-auto"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Degree (e.g., Bachelor of Science in Computer Science)"
                    />
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Institution Name"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => updateEducation(index, 'year', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Year (e.g., 2018-2022)"
                    />
                    <input
                      type="text"
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="GPA (optional)"
                    />
                    <input
                      type="text"
                      value={edu.honors || ''}
                      onChange={(e) => updateEducation(index, 'honors', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Honors (optional)"
                    />
                  </div>
                </div>
              ))}

              {profile.education.length === 0 && (
                <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-xl">
                  <GraduationCap size={40} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">No education added yet</p>
                  <button
                    onClick={addEducation}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm sm:text-base"
                  >
                    Add Your Education
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Skills & Expertise</h2>
            <SkillInput
              skills={profile.skills}
              onSkillsChange={(skills) => updateProfile({ skills })}
            />
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Projects</h2>
              <button
                onClick={addProject}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm sm:text-base"
              >
                Add Project
              </button>
            </div>

            <div className="space-y-6">
              {profile.projects.map((project, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Project #{index + 1}</h3>
                    <button
                      onClick={() => removeProject(index)}
                      className="text-red-500 hover:text-red-700 transition-colors text-sm self-start sm:self-auto"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => updateProject(index, 'name', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Project Name"
                    />
                    <input
                      type="url"
                      value={project.link || ''}
                      onChange={(e) => updateProject(index, 'link', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Project URL (optional)"
                    />
                  </div>

                  <textarea
                    value={project.desc}
                    onChange={(e) => updateProject(index, 'desc', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-4 text-sm sm:text-base"
                    placeholder="Describe your project..."
                  />

                  <div className="mb-4">
                    <input
                      type="text"
                      value={project.technologies?.join(', ') || ''}
                      onChange={(e) => updateProject(index, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Technologies used (comma-separated)"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`featured-${index}`}
                      checked={project.featured || false}
                      onChange={(e) => updateProject(index, 'featured', e.target.checked)}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`featured-${index}`} className="ml-2 text-sm text-gray-700">
                      Featured project
                    </label>
                  </div>
                </div>
              ))}

              {profile.projects.length === 0 && (
                <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-xl">
                  <Code size={40} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">No projects added yet</p>
                  <button
                    onClick={addProject}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm sm:text-base"
                  >
                    Add Your First Project
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 'socials':
        return (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Social Links</h2>
            <SocialLinksInput
              socials={profile.socials}
              onSocialsChange={(socials) => updateProfile({ socials })}
            />
          </div>
        );

      case 'theme':
        return (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Customize Your Theme</h2>
            <ThemeSelector
              selectedTheme={profile.theme || 'orange'}
              onThemeChange={(theme) => updateProfile({ theme: theme as any })}
            />
          </div>
        );

      case 'layout':
        return (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Customize Your Layout</h2>
            <LayoutSelector
              selectedLayout={profile.layout || DEFAULT_LAYOUT}
              onLayoutChange={(layout) => updateProfile({ layout })}
            />
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Privacy Settings</h2>
            <PrivacySettings
              isPublic={profile.isPublic ?? true}
              onPrivacyChange={(isPublic) => updateProfile({ isPublic })}
              showEmailPublicly={profile.showEmail ?? true}
              onShowEmailChange={(showEmail) => updateProfile({ showEmail })}
            />
          </div>
        );

      case 'preview':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Preview Your Resume</h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                This is how your resume will look to visitors. You can always come back and make changes.
              </p>
            </div>
            
            <div className="bg-gray-100 rounded-xl p-2 sm:p-4">
              <CustomizableResumePreview 
                profile={profile} 
                layout={profile.layout || DEFAULT_LAYOUT} 
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Ready to go live?</h3>
              <p className="text-blue-800 mb-4 text-sm sm:text-base">
                Your profile will be {profile.isPublic ? 'publicly accessible' : 'private'} at:{' '}
                <span className="font-mono font-medium break-all">resumin.link/{profile.username}</span>
              </p>
              <button
                onClick={saveProfile}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Save size={20} />
                <span>{loading ? 'Saving...' : 'Save & Publish Profile'}</span>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
    <img 
      src="https://raw.githubusercontent.com/razinrayees/razinrayees/master/1logo.png" 
      alt="Resumin Logo" 
      className="w-20 h-20 sm:w-24 sm:h-24 object-contain" 
      loading="lazy"
    />
  </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile Preview Toggle */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                {showPreview ? <X size={16} /> : <Eye size={16} />}
                <span className="ml-1">{showPreview ? 'Form' : 'Preview'}</span>
              </button>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
              >
                <ArrowLeft size={16} className="mr-1" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        {/* Step Navigation - Hidden on mobile when preview is shown */}
        <div className={`${showPreview ? 'hidden lg:block' : 'block'} mb-6 sm:mb-8`}>
          <StepNavigation
            steps={steps.map(step => ({
              id: step.id,
              title: step.title,
              completed: steps.findIndex(s => s.id === step.id) < getCurrentStepIndex()
            }))}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Form - Hidden on mobile when preview is shown */}
          <div className={`${showPreview ? 'hidden lg:block' : 'block'} bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8`}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 space-y-4 sm:space-y-0">
              <button
                onClick={prevStep}
                disabled={isFirstStep}
                className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <ArrowLeft size={16} className="mr-2" />
                Previous
              </button>

              {!isLastStep ? (
                <button
                  onClick={nextStep}
                  className="flex items-center justify-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm sm:text-base"
                >
                  Next
                  <ArrowRight size={16} className="ml-2" />
                </button>
              ) : (
                <button
                  onClick={saveProfile}
                  disabled={loading}
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <Save size={16} className="mr-2" />
                  {loading ? 'Saving...' : 'Save Profile'}
                </button>
              )}
            </div>
          </div>

          {/* Live Preview - Shown on mobile when preview is toggled */}
          <div className={`${showPreview ? 'block lg:block' : 'hidden lg:block'} bg-white rounded-2xl shadow-xl p-4 sm:p-6 sticky top-8 max-h-[calc(100vh-4rem)] overflow-hidden`}>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
            <div className="h-full overflow-y-auto">
              <CustomizableResumePreview 
                profile={profile} 
                layout={profile.layout || DEFAULT_LAYOUT} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};