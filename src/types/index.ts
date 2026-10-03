export interface Project {
  id: string
  number: string
  title: string
  subtitle: string
  category: string
  timeline: string
  role: string
  description: string
  fullOverview: string
  technologies: string[]
  highlights: string[]
  image: string
  accentColor?: string
  liveUrl?: string
  githubUrl?: string
}

export interface MotionProject {
  id: string
  number: string
  title: string
  subtitle?: string
  category: string
  aspectRatio?: '16/9' | '9/16' | '1/1' | 'auto'
  videoUrl: string
  poster?: string
  duration?: string
  role?: string
  tags: string[]
  description?: string
  highlights?: string[]
  isFeatured?: boolean
}

export interface ServiceItem {
  number: string
  category: string
  title: string
  tags: string[]
  description: string
  deliverables: string[]
  previewImage: string
}

export interface InquiryFormData {
  name: string
  email: string
  projectType: string
  budget: string
  message: string
}
