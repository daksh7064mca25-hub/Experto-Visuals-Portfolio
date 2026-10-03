import React, { useEffect, useRef } from 'react'
import { Sparkles, Terminal, Code2, Film, Layers, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BrandArtifact3D } from './BrandArtifact3D'

gsap.registerPlugin(ScrollTrigger)

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statementRef = useRef<HTMLDivElement>(null)
  const word1Ref = useRef<HTMLSpanElement>(null)
  const word2Ref = useRef<HTMLSpanElement>(null)
  const word3Ref = useRef<HTMLSpanElement>(null)
  const bioCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ScrollTrigger for DESIGN . MOTION . CODE alignment
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: statementRef.current,
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: 0.8,
        },
      })

      tl.fromTo(
        word1Ref.current,
        { x: -60, opacity: 0.3 },
        { x: 0, opacity: 1, ease: 'none' }
      )
        .fromTo(
          word2Ref.current,
          { y: 40, opacity: 0.3 },
          { y: 0, opacity: 1, ease: 'none' },
          '<'
        )
        .fromTo(
          word3Ref.current,
          { x: 60, opacity: 0.3 },
          { x: 0, opacity: 1, ease: 'none' },
          '<'
        )

      // Fade up bio card
      gsap.fromTo(
        bioCardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bioCardRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-40 bg-[#080808] text-[#F5F5F2] border-t border-white/5 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16 sm:mb-24">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#A1A1A1] tracking-widest uppercase">02 / SECTION</span>
            <span className="text-white/20">/</span>
            <h2 className="font-mono text-xs text-white tracking-widest uppercase">ABOUT EXPERTO</h2>
          </div>
          <span className="font-mono text-xs text-[#A1A1A1] tracking-widest hidden sm:inline-block">
            PHILOSOPHY & CRAFT
          </span>
        </div>

        {/* Large Editorial Statement: DESIGN × MOTION × CODE */}
        <div ref={statementRef} className="py-8 sm:py-16 text-center select-none">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-6 md:gap-8 font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none text-white">
            <span ref={word1Ref} className="text-white">
              DESIGN
            </span>
            <span className="text-white/30 text-3xl sm:text-6xl font-light">×</span>
            <span ref={word2Ref} className="italic font-light text-[#E0E0DC]">
              MOTION
            </span>
            <span className="text-white/30 text-3xl sm:text-6xl font-light">×</span>
            <span ref={word3Ref} className="text-white">
              CODE
            </span>
          </div>
          <p className="mt-8 text-xs sm:text-sm font-mono tracking-widest text-[#A1A1A1] uppercase">
            The Trinity of Modern Digital Craft
          </p>
        </div>

        {/* Studio Core Overview & Creator Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start mt-12 sm:mt-20">
          {/* Left Column: Brand Vision & Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                THE EXPERTO CREATIVE VISION
              </span>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight">
                "I don't just build websites. <br />
                <span className="italic text-[#C8C8C5]">I create visual experiences."</span>
              </h3>
            </div>

            <p className="text-base sm:text-lg text-[#A1A1A1] leading-relaxed font-light">
              <strong className="text-white font-medium">Experto Visuals</strong> is a creative digital brand
              focused on building websites, visual experiences and motion-driven digital products.
              Rooted in the belief that modern software deserves the visual grandeur of cinema and the precision of architecture.
            </p>

            <p className="text-sm sm:text-base text-[#8E8E93] leading-relaxed font-light">
              By merging cutting-edge frontend engineering (React, TypeScript, WebGL) with high-velocity motion design,
              every project is sculpted to be unforgettable, responsive, and blazingly fast.
            </p>

            {/* Quick Metrics & Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <div className="font-display text-3xl sm:text-4xl text-white">100%</div>
                <div className="text-xs font-mono text-[#A1A1A1] tracking-widest uppercase mt-1">
                  Bespoke Craft
                </div>
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl text-white">60 FPS</div>
                <div className="text-xs font-mono text-[#A1A1A1] tracking-widest uppercase mt-1">
                  Fluid Motion
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="font-display text-3xl sm:text-4xl text-white">04+ YRS</div>
                <div className="text-xs font-mono text-[#A1A1A1] tracking-widest uppercase mt-1">
                  Digital Mastery
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Built by Daksh Babbar & 3D Artifact */}
          <div ref={bioCardRef} className="lg:col-span-5 space-y-6">
            {/* Glass Creator Card */}
            <div className="liquid-glass-card rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="text-xs font-mono text-[#A1A1A1] tracking-widest uppercase">
                  FOUNDER & CREATIVE DIRECTOR
                </span>
                <span className="w-2 h-2 rounded-full bg-white/40" />
              </div>

              <div className="space-y-2">
                <h4 className="font-display text-2xl sm:text-3xl text-white tracking-wide">
                  BUILT BY EXPERTO VISUALS
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-white/80">
                    Creative Developer
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-white/80">
                    Web Designer
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-white/80">
                    Motion Designer
                  </span>
                </div>
              </div>

              {/* 3D Artifact embedded in card for depth */}
              <div className="mt-4 pt-2">
                <BrandArtifact3D />
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#A1A1A1]">
                <span>SPECIALIZATION: 3D × REACT × MOTION</span>
                <span className="text-white">EDITION 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
