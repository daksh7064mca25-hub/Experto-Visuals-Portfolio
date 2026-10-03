import React, { useRef, useState, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Film, Clapperboard, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionCard } from './MotionCard'
import { motionProjectsData } from '../data/motionProjects'
import type { MotionProject } from '../types'

gsap.registerPlugin(ScrollTrigger)

interface MotionSectionProps {
  onSelectProject: (project: MotionProject) => void
}

export const MotionSection: React.FC<MotionSectionProps> = ({ onSelectProject }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statementRef = useRef<HTMLDivElement>(null)
  const showreelVideoRef = useRef<HTMLVideoElement>(null)

  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  // Identify the first/featured project (Showreel) and gallery projects
  const featuredProject = motionProjectsData[0]
  const galleryProjects = motionProjectsData.slice(1)

  // Transition & Title Reveal Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        statementRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statementRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    // Intersection observer for showreel video performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (showreelVideoRef.current) {
            if (entry.isIntersecting) {
              showreelVideoRef.current.play().catch(() => {})
            } else {
              showreelVideoRef.current.pause()
            }
          }
        })
      },
      { threshold: 0.25 }
    )

    if (showreelVideoRef.current) {
      observer.observe(showreelVideoRef.current)
    }

    return () => {
      ctx.revert()
      observer.disconnect()
    }
  }, [])

  const toggleShowreelPlay = () => {
    if (showreelVideoRef.current) {
      if (isPlaying) {
        showreelVideoRef.current.pause()
      } else {
        showreelVideoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleShowreelMute = () => {
    if (showreelVideoRef.current) {
      showreelVideoRef.current.muted = !showreelVideoRef.current.muted
      setIsMuted(showreelVideoRef.current.muted)
    }
  }

  return (
    <section
      id="motion"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 bg-[#080808] text-[#F5F5F2] border-t border-white/5 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16 sm:mb-20">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#A1A1A1] tracking-widest uppercase">04 / SECTION</span>
            <span className="text-white/20">/</span>
            <h2 className="font-mono text-xs text-white tracking-widest uppercase">MOTION & EDITING</h2>
          </div>
          <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            SHOWREEL & MOTION PRODUCTIONS
          </span>
        </div>

        {/* Transition Statement: I DON'T JUST BUILD. I MAKE THINGS MOVE. */}
        <div ref={statementRef} className="text-center py-6 sm:py-12 select-none mb-12 sm:mb-16">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white uppercase">
            I DON'T JUST BUILD. <br />
            <span className="italic font-light text-[#D6D6D2]">I MAKE THINGS MOVE.</span>
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4 text-xs font-mono tracking-widest text-[#A1A1A1] uppercase">
            <span>MOTION</span>
            <span className="text-white/30">×</span>
            <span>EDITING</span>
            <span className="text-white/30">×</span>
            <span>STORY</span>
          </div>
        </div>

        {/* Centerpiece: FEATURED WORK / SHOWREEL */}
        {featuredProject && (
          <div className="relative w-full rounded-2xl liquid-glass-card border border-white/15 p-4 sm:p-8 mb-20 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <Clapperboard className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs text-white tracking-widest uppercase">
                  {featuredProject.number} // FEATURED WORK: {featuredProject.title}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleShowreelPlay}
                  aria-label={isPlaying ? 'Pause showreel' : 'Play showreel'}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-xs font-mono text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                  <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>
                <button
                  onClick={toggleShowreelMute}
                  aria-label={isMuted ? 'Unmute showreel' : 'Mute showreel'}
                  className="p-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white/70 hover:text-white cursor-pointer transition-colors"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              </div>
            </div>

            {/* Showreel Video Frame */}
            <div
              onClick={() => onSelectProject(featuredProject)}
              data-cursor="WATCH"
              className="group relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/90 cursor-pointer"
            >
              <video
                ref={showreelVideoRef}
                src={featuredProject.videoUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />

              {/* Floating Glass Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-2xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
                </div>
              </div>

              {/* Bottom Title & Specs */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pointer-events-none">
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 tracking-widest uppercase">
                    FEATURED MOTION PRODUCTION
                  </span>
                  <h3 className="font-display text-2xl sm:text-4xl text-white mt-0.5">
                    {featuredProject.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-white/80 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15">
                  CLICK TO EXPAND FULLSCREEN
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Editorial Project Grid for All Remaining Video Productions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs text-white tracking-widest uppercase">
                MOTION PRODUCTIONS & VIDEO WORK
              </span>
            </div>
            <span className="text-xs font-mono text-[#A1A1A1] tracking-widest">
              ({String(motionProjectsData.length).padStart(2, '0')} PRODUCTIONS)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
            {galleryProjects.map((project, idx) => {
              // Asymmetrical grid column distribution
              const isFull = idx === 0 || idx === 3
              const colSpan = isFull ? 'lg:col-span-8' : 'lg:col-span-4'

              return (
                <div key={project.id} className={`${colSpan} flex justify-center w-full`}>
                  <MotionCard
                    project={project}
                    onSelect={onSelectProject}
                    index={idx + 1}
                  />
                </div>
              )
            })}

            {/* Creative Capability Card */}
            <div className="lg:col-span-4 liquid-glass-card rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between self-stretch">
              <div>
                <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-2 block">
                  CAPABILITY & PRODUCTION SCOPE
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-white mb-3">
                  "MOTION THAT COMMANDS ATTENTION."
                </h3>
                <p className="text-xs sm:text-sm text-[#A1A1A1] font-light leading-relaxed mb-6">
                  From high-impact commercial showreels and 3D kinetic typography to SaaS walkthroughs and brand animations, every frame is crafted to build emotional resonance and momentum.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <div>
                  <span className="font-display text-2xl text-white">4K 60FPS</span>
                  <p className="text-[11px] font-mono text-[#A1A1A1] uppercase">High Bitrate</p>
                </div>
                <div>
                  <span className="font-display text-2xl text-white">FRAME-LOCK</span>
                  <p className="text-[11px] font-mono text-[#A1A1A1] uppercase">Audio Rhythm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
