import React, { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Volume2, VolumeX } from 'lucide-react'
import gsap from 'gsap'

interface HeroProps {
  onStartProjectClick: () => void
  isPreloaded?: boolean
}

export const Hero: React.FC<HeroProps> = ({ onStartProjectClick, isPreloaded = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroContainerRef = useRef<HTMLDivElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)
  const typographyRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLHeadingElement>(null)
  const line2Ref = useRef<HTMLHeadingElement>(null)
  const line3Ref = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollPromptRef = useRef<HTMLDivElement>(null)

  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  // Mouse Parallax Effect (subtle, desktop only)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || window.innerWidth < 1024) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const xPercent = (clientX / window.innerWidth - 0.5) * 2
      const yPercent = (clientY / window.innerHeight - 0.5) * 2

      if (videoWrapperRef.current) {
        gsap.to(videoWrapperRef.current, {
          x: xPercent * 6,
          y: yPercent * 6,
          duration: 1.2,
          ease: 'power2.out',
        })
      }

      if (typographyRef.current) {
        gsap.to(typographyRef.current, {
          x: xPercent * 3,
          y: yPercent * 3,
          duration: 1.2,
          ease: 'power2.out',
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Hero Entrance Reveal Sequence
  useEffect(() => {
    if (!isPreloaded) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Set initial hidden states
    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
      y: 60,
      opacity: 0,
    })
    gsap.set(taglineRef.current, { y: 25, opacity: 0 })
    gsap.set(ctaRef.current, { y: 20, opacity: 0 })
    gsap.set(scrollPromptRef.current, { opacity: 0 })

    // Entrance timeline
    tl.to(line1Ref.current, { y: 0, opacity: 1, duration: 0.9, delay: 0.2 })
      .to(line2Ref.current, { y: 0, opacity: 1, duration: 0.9 }, '-=0.7')
      .to(line3Ref.current, { y: 0, opacity: 1, duration: 0.9 }, '-=0.7')
      .to(taglineRef.current, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
      .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
      .to(scrollPromptRef.current, { opacity: 1, duration: 0.7 }, '-=0.4')

    return () => {
      tl.kill()
    }
  }, [isPreloaded])

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const handleScrollDown = () => {
    const aboutEl = document.getElementById('about')
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      ref={heroContainerRef}
      className="relative w-full min-h-[100svh] flex flex-col justify-between bg-[#080808] pt-24 sm:pt-28 pb-6 sm:pb-8 overflow-hidden"
    >
      {/* Cinematic Fullscreen Background Video Container */}
      <div
        ref={videoWrapperRef}
        className="absolute inset-0 w-full h-full scale-[1.04] origin-center pointer-events-none"
      >
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-85' : 'opacity-0'
          }`}
        />

        {/* Minimalist fallback placeholder while video streams */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-radial from-[#151518] to-[#080808] animate-pulse" />
        )}

        {/* Subtle cinematic vignette for pristine typography contrast without darkening whole video */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-transparent to-[#080808]/60 pointer-events-none" />
      </div>

      {/* Top Ambient Bar / Brand Coordinates */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center text-xs font-mono text-white/50 tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>EXPERTO VISUALS® // 2026</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-[11px]">
          <span>DIGITAL ART DIRECTION</span>
          <span>CREATIVE CODE</span>
          <span>LAT: 28.6139° N</span>
        </div>
      </div>

      {/* Main Editorial Hero Typography & Composition */}
      <div
        ref={typographyRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 my-auto flex flex-col items-start justify-center py-6 sm:py-10"
      >
        <div className="w-full space-y-1 sm:space-y-0">
          <div className="overflow-hidden">
            <h1
              ref={line1Ref}
              className="font-display text-[3.2rem] sm:text-[5.2rem] md:text-[7rem] lg:text-[8.5rem] xl:text-[9.8rem] leading-[0.9] tracking-tight text-[#F5F5F2] uppercase select-none drop-shadow-2xl"
            >
              CREATE.
            </h1>
          </div>
          <div className="overflow-hidden flex items-baseline gap-3 sm:gap-6 md:gap-8">
            <h1
              ref={line2Ref}
              className="font-display italic font-light text-[3.2rem] sm:text-[5.2rem] md:text-[7rem] lg:text-[8.5rem] xl:text-[9.8rem] leading-[0.9] tracking-tight text-[#E2E2DF] uppercase select-none drop-shadow-2xl ml-3 sm:ml-8 md:ml-16"
            >
              MOVE.
            </h1>
            <span className="hidden md:inline-block font-mono text-xs tracking-widest text-[#A1A1A1] border-l border-white/20 pl-4 py-1">
              DESIGN × MOTION × DEV
            </span>
          </div>
          <div className="overflow-hidden">
            <h1
              ref={line3Ref}
              className="font-display text-[3.2rem] sm:text-[5.2rem] md:text-[7rem] lg:text-[8.5rem] xl:text-[9.8rem] leading-[0.9] tracking-tight text-[#FFFFFF] uppercase select-none drop-shadow-2xl ml-1 sm:ml-4 md:ml-10"
            >
              IMPACT.
            </h1>
          </div>
        </div>

        {/* Supporting Editorial Statement & Interactive Hero Glass CTA */}
        <div className="w-full mt-6 sm:mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pt-4 border-t border-white/10">
          <p
            ref={taglineRef}
            className="max-w-md text-sm sm:text-base md:text-lg text-[#C8C8C5] font-light leading-relaxed tracking-wide"
          >
            Digital experiences shaped by <span className="text-white font-medium">design</span>,{' '}
            <span className="text-white font-medium">motion</span> and{' '}
            <span className="text-white font-medium">code</span>.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <button
              onClick={onStartProjectClick}
              data-cursor="LAUNCH"
              className="liquid-glass-button group relative px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-mono tracking-widest uppercase text-white hover:text-white flex items-center gap-3 cursor-pointer shadow-xl"
            >
              <span className="relative z-10 font-semibold">START A PROJECT</span>
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>

            {/* Audio Toggle Pill */}
            <button
              onClick={toggleSound}
              aria-label={isMuted ? 'Unmute atmospheric audio' : 'Mute audio'}
              className="p-3.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Atmospheric Video Audio"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator & Studio Metadata */}
      <div
        ref={scrollPromptRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center text-xs font-mono text-[#A1A1A1] tracking-widest"
      >
        <button
          onClick={handleScrollDown}
          className="flex items-center gap-2 hover:text-white transition-colors group cursor-pointer"
        >
          <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:translate-y-1 transition-transform" />
          <span>SCROLL TO EXPLORE</span>
        </button>

        <div className="hidden md:flex items-center gap-8 text-[11px] text-[#A1A1A1]">
          <span>BUILT BY EXPERTO VISUALS</span>
          <span>© EXPERTO VISUALS</span>
        </div>
      </div>
    </section>
  )
}
