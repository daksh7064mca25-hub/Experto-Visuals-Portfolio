import React, { useRef, useState } from 'react'
import { Play, ArrowUpRight, Film } from 'lucide-react'
import type { MotionProject } from '../types'

interface MotionCardProps {
  project: MotionProject
  onSelect: (project: MotionProject) => void
  index?: number
}

export const MotionCard: React.FC<MotionCardProps> = ({ project, onSelect, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [naturalAspect, setNaturalAspect] = useState<string>(project.aspectRatio || '16/9')

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    if (video.videoWidth && video.videoHeight) {
      const ratio = video.videoWidth / video.videoHeight
      if (ratio < 0.8) {
        setNaturalAspect('9/16')
      } else if (ratio > 1.3) {
        setNaturalAspect('16/9')
      } else {
        setNaturalAspect('1/1')
      }
    }
  }

  const isVertical = naturalAspect === '9/16'

  return (
    <div
      onClick={() => onSelect(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="WATCH"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(project)
        }
      }}
      className={`group relative w-full rounded-2xl liquid-glass-card border border-white/10 p-5 sm:p-7 cursor-pointer transition-all duration-400 hover:border-white/35 hover:shadow-2xl overflow-hidden flex flex-col justify-between focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40`}
    >
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-5">
        <div className="flex items-baseline gap-2.5">
          <span className="font-mono text-base font-light text-white">
            {project.number}
          </span>
          <span className="text-white/20">/</span>
          <span className="font-mono text-[11px] text-[#A1A1A1] tracking-widest uppercase">
            {project.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-emerald-400">
            <Film className="w-3 h-3" />
            MOTION WORK
          </span>
          <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black transition-all duration-300">
            <Play className="w-3 h-3 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Video Viewport Frame with natural aspect ratio */}
      <div
        className={`relative w-full rounded-xl overflow-hidden border border-white/10 mb-5 bg-black/80 flex items-center justify-center ${
          isVertical ? 'aspect-[9/16] max-h-[540px]' : 'aspect-video'
        }`}
      >
        <video
          ref={videoRef}
          src={project.videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent opacity-60 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none" />

        {/* Floating Play Button Cue */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Tag pills in corner */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap gap-1.5 pointer-events-none">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/90"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Project Title & Meta Description */}
      <div className="space-y-1.5">
        <h3 className="font-display text-xl sm:text-2xl text-white tracking-tight uppercase group-hover:text-[#EAEAEA] transition-colors leading-tight">
          {project.title}
        </h3>
        <p className="text-xs text-[#A1A1A1] font-light leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* Card Bottom Actions */}
      <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8E8E93] group-hover:text-white transition-colors">
        <span className="tracking-widest uppercase">VIEW MOTION SPEC</span>
        <span className="flex items-center gap-1 text-[11px] text-white/60 group-hover:text-white">
          PLAY STREAM <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  )
}
