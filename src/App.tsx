import React, { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Preloader } from './components/Preloader'
import { CustomCursor } from './components/CustomCursor'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { WhatICreate } from './components/WhatICreate'
import { SelectedWork } from './components/SelectedWork'
import { MotionSection } from './components/MotionSection'
import { ProjectModal } from './components/ProjectModal'
import { MotionModal } from './components/MotionModal'
import { Contact } from './components/Contact'
import type { ContactRef } from './components/Contact'
import { Footer } from './components/Footer'
import type { Project, MotionProject } from './types'

gsap.registerPlugin(ScrollTrigger)

export function App() {
  const [isPreloaded, setIsPreloaded] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedMotionProject, setSelectedMotionProject] = useState<MotionProject | null>(null)
  const contactRef = useRef<ContactRef>(null)

  // Initialize Lenis Smooth Scrolling and bind with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const handleStartProjectClick = () => {
    contactRef.current?.focusForm()
  }

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#F5F5F2] selection:bg-white selection:text-black font-sans antialiased overflow-x-hidden">
      {/* Ambient Film Grain Overlay */}
      <div className="grain-overlay pointer-events-none" />

      {/* Interactive Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Refined Minimalist Preloader */}
      {!isPreloaded && <Preloader onComplete={() => setIsPreloaded(true)} />}

      {/* Floating Glass Navigation */}
      <Navigation onStartProjectClick={handleStartProjectClick} />

      {/* Main Sections */}
      <main>
        {/* 01 / Fullscreen Cinematic Hero */}
        <Hero
          onStartProjectClick={handleStartProjectClick}
          isPreloaded={isPreloaded}
        />

        {/* 02 / Editorial About Section with 3D Artifact */}
        <About />

        {/* What I Create / Disciplines Showcase */}
        <WhatICreate />

        {/* 03 / Selected Work Pinned Horizontal Gallery */}
        <SelectedWork onSelectProject={(p) => setSelectedProject(p)} />

        {/* 04 / Dedicated Motion & Editing Work Showcase */}
        <MotionSection onSelectProject={(p) => setSelectedMotionProject(p)} />

        {/* 05 / Contact & Commission Brief */}
        <Contact ref={contactRef} />
      </main>

      {/* Studio Footer */}
      <Footer />

      {/* Detailed Project Showcase Drawer / Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContactClick={() => {
          setSelectedProject(null)
          setTimeout(() => {
            contactRef.current?.focusForm()
          }, 300)
        }}
      />

      {/* Dedicated Motion & Showreel Lightbox Modal */}
      <MotionModal
        project={selectedMotionProject}
        onClose={() => setSelectedMotionProject(null)}
        onContactClick={() => {
          setSelectedMotionProject(null)
          setTimeout(() => {
            contactRef.current?.focusForm()
          }, 300)
        }}
      />
    </div>
  )
}

export default App
