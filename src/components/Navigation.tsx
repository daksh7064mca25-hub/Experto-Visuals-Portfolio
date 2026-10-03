import React, { useState, useEffect } from 'react'
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react'

interface NavigationProps {
  onStartProjectClick: () => void
}

export const Navigation: React.FC<NavigationProps> = ({ onStartProjectClick }) => {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { id: 'home', label: '01 / HOME', href: '#home' },
    { id: 'about', label: '02 / ABOUT', href: '#about' },
    { id: 'work', label: '03 / WEB', href: '#work' },
    { id: 'motion', label: '04 / MOTION', href: '#motion' },
    { id: 'contact', label: '05 / CONTACT', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)

      const sections = ['home', 'about', 'work', 'motion', 'contact']
      const scrollPos = window.scrollY + 250

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Floating Glass Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out px-4 sm:px-8 md:px-12 py-4 md:py-6 flex justify-center`}
      >
        <div
          className={`w-full max-w-7xl flex items-center justify-between px-5 sm:px-8 py-3.5 rounded-full transition-all duration-500 ${
            isScrolled
              ? 'liquid-glass-nav bg-[#080808]/80 border-white/10 shadow-2xl backdrop-blur-xl py-3'
              : 'bg-white/[0.03] border border-white/10 backdrop-blur-md'
          }`}
        >
          {/* Logo on Left */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#home')
            }}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-sm"
          >
            <span className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform duration-300" />
            <span className="font-display text-xl sm:text-2xl tracking-wide text-white group-hover:text-white/80 transition-colors">
              EXPERTO<span className="text-xs font-mono align-super ml-0.5 opacity-60">®</span>
            </span>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3 bg-white/[0.02] border border-white/[0.05] rounded-full px-4 py-1.5 shadow-inner">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(item.href)
                }}
                className={`relative px-3.5 py-1.5 text-xs font-mono tracking-widest uppercase transition-all duration-300 rounded-full ${
                  activeSection === item.id
                    ? 'text-white bg-white/10 shadow-sm'
                    : 'text-[#A1A1A1] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTA (Desktop) */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onStartProjectClick}
              data-cursor="CONNECT"
              className="liquid-glass-button group flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase text-white hover:text-white transition-all duration-300 cursor-pointer"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="p-2 text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-2xl transition-all duration-500 sm:hidden flex flex-col justify-between p-6 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-center border-b border-white/10 pb-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="font-display text-2xl text-white">EXPERTO VISUALS®</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Navigation Menu"
            className="p-2.5 text-white/80 hover:text-white border border-white/10 rounded-full bg-white/5"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col space-y-6 my-auto py-6">
          {navItems.map((item, idx) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(item.href)
              }}
              className="flex items-baseline justify-between py-2 border-b border-white/5 group"
            >
              <span className="font-display text-4xl text-white group-hover:text-[#A1A1A1] transition-colors">
                {item.label.split(' / ')[1]}
              </span>
              <span className="font-mono text-xs text-[#A1A1A1] tracking-widest">
                0{idx + 1}
              </span>
            </a>
          ))}
        </nav>

        <div className="space-y-4 pt-6 border-t border-white/10">
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onStartProjectClick()
            }}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-white text-black font-mono text-xs tracking-widest uppercase font-semibold"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <div className="flex justify-between text-[11px] font-mono text-[#A1A1A1] pt-2">
            <span>DAKSH BABBAR</span>
            <span>AVAILABLE FOR SELECT WORK</span>
          </div>
        </div>
      </div>
    </>
  )
}
