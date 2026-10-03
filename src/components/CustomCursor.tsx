import React, { useEffect, useState, useRef } from 'react'

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Check if device supports hover & user does not prefer reduced motion
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (hasTouch || prefersReducedMotion) {
      setEnabled(false)
      return
    }

    setEnabled(true)

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }

      // Check hovered element
      const target = e.target as HTMLElement | null
      if (target) {
        const interactiveEl = target.closest('[data-cursor]') as HTMLElement | null
        const linkOrBtn = target.closest('a, button, [role="button"]')

        if (interactiveEl) {
          const customText = interactiveEl.getAttribute('data-cursor') || ''
          setCursorText(customText)
          setIsHovered(true)
        } else if (linkOrBtn) {
          setCursorText('')
          setIsHovered(true)
        } else {
          setCursorText('')
          setIsHovered(false)
        }
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    // Smooth RAF loop for ring trailing
    let animationFrameId: number
    const renderLoop = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
      }

      animationFrameId = requestAnimationFrame(renderLoop)
    }

    animationFrameId = requestAnimationFrame(renderLoop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Precision Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-white transition-opacity duration-300 ${
          isHovered ? 'opacity-0 scale-50' : 'opacity-100'
        }`}
      />

      {/* Trailing Ring with Contextual Label */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
          cursorText
            ? '-ml-9 -mt-9 w-18 h-18 bg-white/95 text-black text-[10px] font-mono font-semibold tracking-wider backdrop-blur-md shadow-2xl scale-100'
            : isHovered
            ? '-ml-6 -mt-6 w-12 h-12 border border-white/40 bg-white/10 backdrop-blur-xs scale-100'
            : '-ml-4 -mt-4 w-8 h-8 border border-white/20 bg-transparent scale-100'
        } ${isClicking ? 'scale-90' : ''}`}
      >
        {cursorText && (
          <span className="animate-fadeIn uppercase select-none">{cursorText}</span>
        )}
      </div>
    </div>
  )
}
