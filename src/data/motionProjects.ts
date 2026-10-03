import type { MotionProject } from '../types'

/**
 * All video files present in public/videos/
 * Adding or renaming files in public/videos/ will automatically be reflected in the portfolio.
 */
export const rawVideoFilenames: string[] = [
  'Show Reel.mp4',
  'Motion graphics Reel.mp4',
  'SAAS Animation.mp4',
  '3-D text animation.mp4',
  'Final Logo Animation.mp4',
]

/**
 * Converts any video filename into a clean, human-readable display title.
 * Examples:
 * - "Show Reel.mp4" -> "SHOW REEL"
 * - "3-D text animation.mp4" -> "3D TEXT ANIMATION"
 * - "Motion graphics Reel.mp4" -> "MOTION GRAPHICS REEL"
 * - "SAAS Animation.mp4" -> "SAAS ANIMATION"
 * - "Final Logo Animation.mp4" -> "FINAL LOGO ANIMATION"
 */
export function formatVideoTitle(filename: string): string {
  // Strip file extensions
  let title = filename.replace(/\.(mp4|mov|webm|m4v|mkv|avi)$/i, '')
  
  // Format specific common terms cleanly
  title = title.replace(/\b3-D\b/gi, '3D')
  title = title.replace(/\b3d\b/gi, '3D')
  title = title.replace(/\bSAAS\b/gi, 'SaaS')
  
  // Replace underscores and hyphens with spaces
  title = title.replace(/[_-]+/g, ' ')
  
  // Collapse whitespace and trim
  title = title.replace(/\s+/g, ' ').trim()
  
  return title.toUpperCase()
}

/**
 * Automatically infers a clean category from the video filename.
 */
export function inferVideoCategory(filename: string): string {
  const lower = filename.toLowerCase()
  
  if (lower.includes('showreel') || lower.includes('show reel') || lower.includes('show_reel')) {
    return 'SHOWREEL'
  }
  if (lower.includes('motion graphics')) {
    return 'MOTION GRAPHICS'
  }
  if (lower.includes('3-d') || lower.includes('3d')) {
    return '3D MOTION'
  }
  if (lower.includes('logo')) {
    return 'BRAND / LOGO ANIMATION'
  }
  if (lower.includes('saas') || lower.includes('product') || lower.includes('ui')) {
    return 'PRODUCT & SAAS MOTION'
  }
  if (lower.includes('reel')) {
    return 'REEL / SHORT-FORM'
  }
  if (lower.includes('edit')) {
    return 'VIDEO EDITING'
  }
  
  return 'MOTION & EDITING'
}

/**
 * Generates relevant craft and discipline tags based on the video context.
 */
export function inferVideoTags(filename: string): string[] {
  const lower = filename.toLowerCase()
  
  if (lower.includes('showreel') || lower.includes('show reel')) {
    return ['Commercial Montage', 'Color Grading', 'Sound Design', 'Pacing']
  }
  if (lower.includes('motion graphics')) {
    return ['Kinetic Typography', 'Vector Animation', 'Visual Rhythm', '2D/3D']
  }
  if (lower.includes('3-d') || lower.includes('3d')) {
    return ['3D Geometry', 'Spatial Typography', 'Lighting', 'Compositing']
  }
  if (lower.includes('logo')) {
    return ['Brand Identity', 'Vector Morph', 'Sound FX', 'Fluid Motion']
  }
  if (lower.includes('saas')) {
    return ['Product Walkthrough', 'UI Motion', 'Micro-Interactions', 'Explainer']
  }
  
  return ['Motion Design', 'Editing', 'Sound FX', 'Visual Rhythm']
}

/**
 * Determines natural aspect ratio tendency based on naming heuristics.
 */
export function inferAspectRatio(filename: string): '16/9' | '9/16' | '1/1' | 'auto' {
  const lower = filename.toLowerCase()
  if (lower.includes('vertical') || lower.includes('9-16') || lower.includes('9_16') || lower.includes('story') || lower.includes('tiktok') || lower.includes('reels_vertical')) {
    return '9/16'
  }
  if (lower.includes('square') || lower.includes('1-1') || lower.includes('1_1')) {
    return '1/1'
  }
  return '16/9'
}

/**
 * Sorts video files to prioritize:
 * 1. Showreel / main reel first
 * 2. Motion graphics reels
 * 3. SaaS / Product animation
 * 4. 3D motion / text
 * 5. Logo / brand animations
 * 6. Other edits
 */
export function sortVideoFiles(files: string[]): string[] {
  return [...files].sort((a, b) => {
    const score = (file: string): number => {
      const lower = file.toLowerCase()
      if (lower.includes('showreel') || lower.includes('show reel') || lower.includes('show_reel')) return 0
      if (lower.includes('motion graphics')) return 1
      if (lower.includes('saas')) return 2
      if (lower.includes('3-d') || lower.includes('3d')) return 3
      if (lower.includes('logo')) return 4
      if (lower.includes('reel')) return 5
      return 6
    }
    return score(a) - score(b)
  })
}

/**
 * Builds the complete structured MotionProject data list from video files.
 */
export function generateMotionProjects(files: string[]): MotionProject[] {
  const sorted = sortVideoFiles(files)
  
  return sorted.map((filename, index) => {
    const title = formatVideoTitle(filename)
    const category = inferVideoCategory(filename)
    const tags = inferVideoTags(filename)
    const aspectRatio = inferAspectRatio(filename)
    const numStr = String(index + 1).padStart(2, '0')
    const encodedPath = `/videos/${encodeURIComponent(filename)}`
    
    return {
      id: `motion-${index + 1}-${filename.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      number: numStr,
      title,
      subtitle: `${category} Production`,
      category,
      aspectRatio,
      videoUrl: encodedPath,
      tags,
      role: 'Motion Designer & Video Editor',
      description: `Original ${category.toLowerCase()} project crafted with precision timing, dynamic visual rhythm, and frame-accurate motion design.`,
      isFeatured: index === 0,
    }
  })
}

// Export the live populated project list
export const motionProjectsData: MotionProject[] = generateMotionProjects(rawVideoFilenames)
