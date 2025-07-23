export interface UserProfile {
  username: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  showEmail?: boolean;
  phone?: string;
  location?: string;
  availability?: 'available' | 'not-available' | 'open-to-offers';
  preferredLocation?: string;
  
  // Profile picture
  profilePicture?: string;
  
  // Privacy settings
  isPublic?: boolean;
  
  // Design customization
  theme?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'teal' | 'indigo' | 'emerald' | 'red' | 'amber' | 'violet' | 'cyan';
  fontFamily?: 'inter' | 'poppins' | 'dm-sans';
  headerGradient?: string;
  backgroundColor?: string;
  
  // Layout customization
  layout?: ResumeLayout;
  
  skills: SkillWithLevel[];
  socials: {
    github?: string;
    linkedin?: string;
    website?: string;
    twitter?: string;
    instagram?: string;
    behance?: string;
    dribbble?: string;
  };
  education: {
    institution: string;
    degree: string;
    year: string;
    gpa?: string;
    honors?: string;
  }[];
  experience: {
    role: string;
    company: string;
    duration: string;
    desc: string;
    location?: string;
    type?: 'full-time' | 'part-time' | 'contract' | 'internship';
  }[];
  projects: {
    name: string;
    desc: string;
    link?: string;
    technologies?: string[];
    featured?: boolean;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    date: string;
    link?: string;
    expiryDate?: string;
  }[];
  achievements?: {
    title: string;
    description: string;
    date: string;
    category?: 'award' | 'recognition' | 'publication' | 'other';
  }[];
  languages?: {
    name: string;
    proficiency: 'native' | 'fluent' | 'conversational' | 'basic';
  }[];
}

export interface SkillWithLevel {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'technical' | 'soft' | 'language' | 'tool';
}

export interface ResumeTheme {
  id: string;
  name: string;
  preview: string;
  headerGradient: string;
  primaryColor: string;
  backgroundColor: string;
}

export interface ResumeLayout {
  id: string;
  name: string;
  description: string;
  structure: 'single-column' | 'two-column' | 'three-column' | 'sidebar-left' | 'sidebar-right';
  headerStyle: 'full-width' | 'centered' | 'minimal' | 'split';
  sectionOrder: string[];
  sectionVisibility: Record<string, boolean>;
  spacing: 'compact' | 'normal' | 'spacious';
  skillsDisplay: 'bars' | 'tags' | 'list' | 'grid';
  projectsDisplay: 'cards' | 'list' | 'timeline';
  experienceDisplay: 'timeline' | 'cards' | 'list';
}

export const DEFAULT_LAYOUT: ResumeLayout = {
  id: 'default',
  name: 'Professional',
  description: 'Clean two-column layout with sidebar',
  structure: 'two-column',
  headerStyle: 'full-width',
  sectionOrder: ['socials', 'bio', 'experience', 'education', 'skills', 'projects', 'certifications', 'achievements', 'languages'],
  sectionVisibility: {
    bio: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
    achievements: true,
    languages: true,
    socials: true
  },
  spacing: 'normal',
  skillsDisplay: 'bars',
  projectsDisplay: 'cards',
  experienceDisplay: 'timeline'
};

export const LAYOUT_PRESETS: ResumeLayout[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean two-column layout perfect for corporate roles',
    structure: 'two-column',
    headerStyle: 'full-width',
    sectionOrder: ['socials', 'bio', 'experience', 'education', 'skills', 'projects', 'certifications', 'achievements', 'languages'],
    sectionVisibility: {
      bio: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      achievements: true,
      languages: true,
      socials: true
    },
    spacing: 'normal',
    skillsDisplay: 'bars',
    projectsDisplay: 'cards',
    experienceDisplay: 'timeline'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern single-column layout for designers and creatives',
    structure: 'single-column',
    headerStyle: 'centered',
    sectionOrder: ['socials', 'bio', 'projects', 'skills', 'experience', 'education', 'achievements', 'certifications', 'languages'],
    sectionVisibility: {
      bio: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      achievements: true,
      languages: true,
      socials: true
    },
    spacing: 'spacious',
    skillsDisplay: 'grid',
    projectsDisplay: 'cards',
    experienceDisplay: 'cards'
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Tech-focused layout highlighting projects and skills',
    structure: 'sidebar-left',
    headerStyle: 'split',
    sectionOrder: ['socials', 'bio', 'skills', 'projects', 'experience', 'education', 'certifications', 'achievements', 'languages'],
    sectionVisibility: {
      bio: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      achievements: true,
      languages: true,
      socials: true
    },
    spacing: 'compact',
    skillsDisplay: 'tags',
    projectsDisplay: 'list',
    experienceDisplay: 'list'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple layout with all essential information',
    structure: 'single-column',
    headerStyle: 'minimal',
    sectionOrder: ['socials', 'bio', 'experience', 'education', 'skills', 'projects', 'certifications', 'achievements', 'languages'],
    sectionVisibility: {
      bio: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      achievements: true,
      languages: true,
      socials: true
    },
    spacing: 'normal',
    skillsDisplay: 'list',
    projectsDisplay: 'list',
    experienceDisplay: 'list'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated layout for senior professionals',
    structure: 'sidebar-right',
    headerStyle: 'full-width',
    sectionOrder: ['socials', 'bio', 'experience', 'achievements', 'education', 'skills', 'projects', 'certifications', 'languages'],
    sectionVisibility: {
      bio: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      achievements: true,
      languages: true,
      socials: true
    },
    spacing: 'spacious',
    skillsDisplay: 'bars',
    projectsDisplay: 'cards',
    experienceDisplay: 'timeline'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary three-column layout with balanced sections',
    structure: 'three-column',
    headerStyle: 'centered',
    sectionOrder: ['socials', 'bio', 'skills', 'experience', 'projects', 'education', 'certifications', 'achievements', 'languages'],
    sectionVisibility: {
      bio: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      achievements: true,
      languages: true,
      socials: true
    },
    spacing: 'normal',
    skillsDisplay: 'grid',
    projectsDisplay: 'cards',
    experienceDisplay: 'cards'
  }
];