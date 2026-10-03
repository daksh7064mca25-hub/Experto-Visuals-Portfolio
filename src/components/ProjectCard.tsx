import React from 'react'
import { ArrowUpRight, ExternalLink, Sparkles, Layers } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import type { Project } from '../types'

interface ProjectCardProps {
  project: Project
  onSelect: (project: Project) => void
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim().length > 0)
  const hasGithubUrl = Boolean(project.githubUrl && project.githubUrl.trim().length > 0)

  const handleCardClick = () => {
    onSelect(project)
  }

  const handleLiveClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleGithubClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      onClick={handleCardClick}
      data-cursor="VIEW"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(project)
        }
      }}
      className="group relative w-full sm:w-[460px] lg:w-[520px] xl:w-[560px] shrink-0 rounded-2xl liquid-glass-card border border-white/10 p-5 sm:p-7 cursor-pointer transition-all duration-400 hover:border-white/30 hover:shadow-2xl overflow-hidden flex flex-col justify-between focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
    >
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-5">
        <div className="flex items-baseline gap-2.5">
          <span className="font-mono text-base sm:text-lg font-light text-white">
            {project.number}
          </span>
          <span className="text-white/20">/</span>
          <span className="font-mono text-[11px] sm:text-xs text-[#A1A1A1] tracking-widest uppercase">
            {project.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {hasGithubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGithubClick}
              data-cursor="GITHUB"
              title="View Repository"
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black transition-all duration-300">
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>

      {/* Project Screenshot Showcase Image with Depth */}
      <div className="relative w-full h-48 sm:h-60 md:h-64 rounded-xl overflow-hidden border border-white/10 mb-5 bg-black/60">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent opacity-75 group-hover:opacity-35 transition-opacity duration-300" />

        {/* Live Status Badge */}
        <div className="absolute top-3.5 right-3.5">
          {hasLiveUrl ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              DEPLOYED LIVE
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/70">
              ARCHIVE CASE
            </span>
          )}
        </div>

        {/* Floating tech stack pills in corner */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/90"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Project Details Typography */}
      <div className="space-y-1.5">
        <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-white tracking-tight uppercase group-hover:text-[#EAEAEA] transition-colors leading-tight">
          {project.title}
        </h3>
        <p className="text-xs sm:text-[13px] text-[#A1A1A1] font-light leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>

      {/* Card Bottom Actions */}
      <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleCardClick}
          className="text-xs font-mono text-[#8E8E93] group-hover:text-white tracking-widest uppercase transition-colors cursor-pointer"
        >
          VIEW CASE SPEC →
        </button>

        {hasLiveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLiveClick}
            data-cursor="LAUNCH"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black font-mono text-[11px] tracking-wider font-semibold hover:bg-[#EAEAEA] transition-all cursor-pointer shadow-md"
          >
            <span>VIEW LIVE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="text-[10px] font-mono text-white/40 italic">
            DEPLOYMENT IN PROGRESS
          </span>
        )}
      </div>
    </div>
  )
}
