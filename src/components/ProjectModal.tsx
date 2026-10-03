import React, { useEffect } from 'react'
import { X, ArrowUpRight, CheckCircle2, ExternalLink, Code2, Sparkles, Layers, ShieldCheck } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import type { Project } from '../types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
  onContactClick: () => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onContactClick }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim().length > 0)
  const hasGithubUrl = Boolean(project.githubUrl && project.githubUrl.trim().length > 0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#080808]/90 backdrop-blur-xl transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-5xl bg-[#0e0e10] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#080808]/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white/50">{project.number} // ARCHIVE SPEC</span>
            <span className="text-white/20">/</span>
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider">{project.category}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="p-2 text-white/70 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Main Screenshot Image */}
          <div className="relative w-full h-64 sm:h-96 md:h-[420px] rounded-xl overflow-hidden border border-white/10 bg-black/60">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">
                    {project.timeline}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl text-white">
                  {project.title}
                </h3>
              </div>

              {/* Direct Open Live Action if available */}
              {hasLiveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs tracking-widest uppercase font-semibold hover:bg-[#EAEAEA] transition-all shadow-lg"
                >
                  <span>OPEN LIVE PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Grid Information: Architectural Breakdown & Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {/* Project Overview */}
              <div>
                <h4 className="font-mono text-xs text-white/50 tracking-widest uppercase mb-2 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-white/60" />
                  PROJECT OVERVIEW & ARCHITECTURE
                </h4>
                <p className="text-base sm:text-lg text-[#D1D1CE] font-light leading-relaxed">
                  {project.fullOverview}
                </p>
              </div>

              {/* Key Features & Deliverables Checklist */}
              <div>
                <h4 className="font-mono text-xs text-white/50 tracking-widest uppercase mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  KEY DELIVERABLES & ENGINEERING HIGHLIGHTS
                </h4>
                <ul className="space-y-3">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#A1A1A1] bg-white/[0.02] p-3 rounded-lg border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Meta Column: Role, Technologies, Actions */}
            <div className="lg:col-span-4 space-y-6 bg-white/[0.02] p-6 rounded-xl border border-white/5 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[11px] text-white/50 tracking-widest uppercase block mb-1">
                    ROLE & CONTRIBUTION
                  </span>
                  <p className="font-mono text-sm text-white font-medium">{project.role}</p>
                </div>

                <div>
                  <span className="font-mono text-[11px] text-white/50 tracking-widest uppercase block mb-2">
                    TECHNOLOGY STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-white/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                {hasLiveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black font-mono text-xs tracking-widest uppercase font-semibold hover:bg-[#E5E5DF] transition-colors cursor-pointer"
                  >
                    <span>OPEN LIVE PROJECT</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="w-full py-3 rounded-full bg-white/5 border border-white/10 text-center font-mono text-xs tracking-widest text-white/40 uppercase">
                    DEPLOYMENT READY // CASE ARCHIVED
                  </div>
                )}

                {hasGithubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white/5 border border-white/10 text-white font-mono text-xs tracking-widest uppercase hover:bg-white/10 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>VIEW REPOSITORY</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    onContactClick()
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 font-mono text-xs tracking-widest uppercase hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span>COMMISSION SIMILAR PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
