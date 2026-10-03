import React, { useState, useRef } from 'react'
import { ArrowUpRight, Sparkles, Film, Globe, Code2, Palette } from 'lucide-react'
import { servicesData } from '../data/services'

export const WhatICreate: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    // Clamp mouse position within section bounds
    const x = Math.max(20, Math.min(e.clientX - rect.left, rect.width - 340))
    const y = Math.max(20, Math.min(e.clientY - rect.top, rect.height - 240))
    setMousePos({ x, y })
  }

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'MOTION':
        return <Film className="w-4 h-4" />
      case 'WEB':
        return <Globe className="w-4 h-4" />
      case 'DEVELOPMENT':
        return <Code2 className="w-4 h-4" />
      case 'VISUALS':
        return <Palette className="w-4 h-4" />
      default:
        return <Sparkles className="w-4 h-4" />
    }
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIdx(null)}
      className="relative w-full py-24 sm:py-36 bg-[#080808] text-[#F5F5F2] border-t border-white/5 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#A1A1A1] tracking-widest uppercase">DISCIPLINES</span>
            <span className="text-white/20">/</span>
            <h2 className="font-mono text-xs text-white tracking-widest uppercase">WHAT I CREATE</h2>
          </div>
          <span className="font-mono text-xs text-[#A1A1A1] tracking-widest hidden sm:inline-block">
            FOUR PILLARS OF CRAFT
          </span>
        </div>

        {/* Floating Media Preview on Hover ONLY (Desktop) */}
        <div className="hidden lg:block pointer-events-none absolute inset-0 z-20 overflow-hidden">
          {hoveredIdx !== null && servicesData[hoveredIdx] && (
            <div
              key={servicesData[hoveredIdx].number}
              className="absolute top-0 left-0 w-80 h-48 rounded-xl overflow-hidden shadow-2xl border border-white/20 transition-all duration-300 ease-out pointer-events-none opacity-100 scale-100 animate-fadeIn"
              style={{
                transform: `translate3d(${mousePos.x + 40}px, ${mousePos.y - 60}px, 0)`,
              }}
            >
              <img
                src={servicesData[hoveredIdx].previewImage}
                alt={servicesData[hoveredIdx].title}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono mb-1">
                  {getServiceIcon(servicesData[hoveredIdx].category)}
                  <span className="tracking-widest uppercase">
                    {servicesData[hoveredIdx].category} // PREVIEW
                  </span>
                </div>
                <span className="font-mono text-[11px] text-white/90">
                  {servicesData[hoveredIdx].title}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Editorial Services List */}
        <div className="divide-y divide-white/10">
          {servicesData.map((service, idx) => {
            const isHovered = hoveredIdx === idx
            return (
              <div
                key={service.number}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setHoveredIdx(hoveredIdx === idx ? null : idx)}
                data-cursor="EXPLORE"
                className={`group relative py-8 sm:py-12 transition-all duration-400 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                  isHovered ? 'bg-white/[0.02] px-4 -mx-4 rounded-xl' : ''
                }`}
              >
                {/* Left Side: Number & Giant Title */}
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-10 transition-transform duration-500 group-hover:translate-x-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs sm:text-sm tracking-widest transition-all duration-300 ${
                        isHovered ? 'text-emerald-400 font-bold' : 'text-[#666666]'
                      }`}
                    >
                      {service.number} /
                    </span>
                    <span className="text-white/40 lg:hidden">
                      {getServiceIcon(service.category)}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-4">
                      <h3
                        className={`font-display text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight transition-colors duration-300 ${
                          isHovered ? 'text-white' : 'text-[#D0D0CC]'
                        }`}
                      >
                        {service.category}
                      </h3>
                      <ArrowUpRight
                        className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                          isHovered
                            ? 'opacity-100 translate-x-1 -translate-y-1 text-white'
                            : 'opacity-0 text-[#666666]'
                        }`}
                      />
                    </div>
                    <p className="font-mono text-xs text-[#A1A1A1] mt-1.5 tracking-wide">
                      {service.title}
                    </p>
                  </div>
                </div>

                {/* Mobile Tap-to-Reveal Inline Preview (Hidden unless tapped on mobile) */}
                {isHovered && (
                  <div className="lg:hidden w-full h-44 rounded-xl overflow-hidden border border-white/15 relative my-2 animate-fadeIn">
                    <img
                      src={service.previewImage}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                      <span className="font-mono text-[10px] text-white/90 tracking-widest uppercase">
                        {service.category} SPECIFICATION
                      </span>
                    </div>
                  </div>
                )}

                {/* Right Side: Tags & Disciplines */}
                <div className="lg:max-w-md flex flex-wrap gap-2 sm:gap-2.5 transition-opacity duration-300">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                        isHovered
                          ? 'bg-white/10 border-white/30 text-white'
                          : 'bg-white/[0.03] border-white/5 text-[#888888]'
                      } border`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
