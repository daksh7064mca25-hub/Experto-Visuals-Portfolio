import React, { useState, useEffect } from 'react'
import { ArrowUp, Heart, Sparkles } from 'lucide-react'

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Display in Indian Standard Time (IST) & UTC
      const istString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setTime(`${istString} IST`)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-[#080808] text-[#F5F5F2] border-t border-white/10 py-12 sm:py-16">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand Monogram & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
          <span className="font-display text-2xl tracking-wide text-white">
            EXPERTO VISUALS<span className="text-xs font-mono align-super ml-0.5 opacity-60">®</span>
          </span>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#A1A1A1]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE FOR SELECT COMMISSIONS</span>
          </div>
        </div>

        {/* Dynamic Studio Time & Coordinates */}
        <div className="flex items-center gap-6 text-xs font-mono text-[#777777]">
          <span>STUDIO TIME: {time || '17:30:00 IST'}</span>
          <span className="hidden sm:inline-block">NEW DELHI, IN</span>
        </div>

        {/* Back to top & Copyright */}
        <div className="flex items-center gap-6">
          <span className="text-xs font-mono text-[#777777]">
            © {new Date().getFullYear()} Experto Visuals
          </span>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
