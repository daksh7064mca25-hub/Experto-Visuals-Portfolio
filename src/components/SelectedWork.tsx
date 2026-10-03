import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Sparkles, Layers } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ProjectCard } from './ProjectCard'
import { projectsData } from '../data/projects'
import type { Project } from '../types'

gsap.registerPlugin(ScrollTrigger)

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDesktop = window.innerWidth >= 1024

    if (!isDesktop || prefersReducedMotion) return

    const track = trackRef.current
    const pinContainer = pinContainerRef.current

    if (!track || !pinContainer) return

    // Calculate total horizontal distance to travel
    const totalDistance = track.scrollWidth - window.innerWidth + 120

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -totalDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: pinContainer,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${totalDistance * 1.05}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * projectsData.length),
              projectsData.length - 1
            )
            setActiveIndex(index)
          },
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollTrack = (direction: 'prev' | 'next') => {
    if (!trackRef.current) return
    const cardWidth = 480
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth
    trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full bg-[#080808] text-[#F5F5F2] border-t border-white/5 py-16 sm:py-24"
    >
      {/* Viewport Container */}
      <div
        ref={pinContainerRef}
        className="w-full min-h-[85vh] lg:min-h-screen flex flex-col justify-between"
      >
        {/* Work Section Top Bar */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 mb-6 sm:mb-8 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#A1A1A1] tracking-widest uppercase">03 / SECTION</span>
            <span className="text-white/20">/</span>
            <h2 className="font-mono text-xs text-white tracking-widest uppercase">SELECTED WORK</h2>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-[#A1A1A1] tracking-widest">
            {/* Quick Navigation Buttons (Desktop & Tablet) */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scrollTrack('prev')}
                aria-label="Previous project"
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollTrack('next')}
                aria-label="Next project"
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white font-medium">0{activeIndex + 1}</span>
              <span className="text-white/30">/</span>
              <span>0{projectsData.length}</span>
            </div>
          </div>
        </div>

        {/* Project Showcase Horizontal Track */}
        <div className="w-full overflow-x-auto lg:overflow-visible no-scrollbar px-6 sm:px-12 lg:px-24 py-2">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-6 sm:gap-10 items-stretch lg:items-center w-full lg:w-max"
          >
            {projectsData.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        </div>

        {/* Work Bottom Bar */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 mt-6 flex items-center justify-between text-xs font-mono text-[#A1A1A1] tracking-widest border-t border-white/10 pt-4">
          <span className="hidden sm:inline-block">SCROLL TO EXPLORE ARCHIVE</span>
          <span className="text-white/60">CLICK ANY CARD FOR ARCHITECTURE DETAILS</span>
        </div>
      </div>
    </section>
  )
}
