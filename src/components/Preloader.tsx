import React, { useEffect, useState } from 'react'

interface PreloaderProps {
  onComplete: () => void
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsFading(true)
            setTimeout(() => {
              onComplete()
            }, 600)
          }, 200)
          return 100
        }
        const jump = Math.floor(Math.random() * 25) + 15
        return Math.min(prev + jump, 100)
      })
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-14 bg-[#080808] text-[#F5F5F2] transition-opacity duration-700 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={isFading}
    >
      <div className="flex justify-between items-center text-xs tracking-widest text-[#A1A1A1] uppercase">
        <span className="font-mono">EXPERTO VISUALS®</span>
        <span className="font-mono">EDITION 2026</span>
      </div>

      <div className="max-w-4xl">
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl tracking-tight leading-none text-white">
          CREATE. <span className="italic font-light text-[#A1A1A1]">MOVE.</span> IMPACT.
        </h1>
        <p className="mt-4 text-xs md:text-sm font-mono tracking-widest text-[#A1A1A1] uppercase">
          Design × Motion × Development
        </p>
      </div>

      <div className="flex justify-between items-end border-t border-white/10 pt-6">
        <div className="text-xs font-mono tracking-widest text-[#A1A1A1]">
          INITIALIZING CINEMATIC ENGINE
        </div>
        <div className="font-mono text-xl sm:text-2xl font-light tabular-nums text-white">
          {percent.toString().padStart(3, '0')}%
        </div>
      </div>
    </div>
  )
}
