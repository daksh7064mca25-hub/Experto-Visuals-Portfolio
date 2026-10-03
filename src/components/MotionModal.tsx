import React, { useEffect, useRef, useState } from 'react'
import { X, Play, Pause, Volume2, VolumeX, ArrowUpRight, Film, Clock, Sparkles } from 'lucide-react'
import type { MotionProject } from '../types'

interface MotionModalProps {
  project: MotionProject | null
  onClose: () => void
  onContactClick: () => void
}

export const MotionModal: React.FC<MotionModalProps> = ({ project, onClose, onContactClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [naturalAspect, setNaturalAspect] = useState<string>('16/9')
  const [durationStr, setDurationStr] = useState<string>('00:00')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    if (video.videoWidth && video.videoHeight) {
      const ratio = video.videoWidth / video.videoHeight
      if (ratio < 0.8) {
        setNaturalAspect('9/16')
      } else if (ratio > 1.3) {
        setNaturalAspect('16/9')
      } else {
        setNaturalAspect('1/1')
      }
    }
    if (video.duration && !isNaN(video.duration)) {
      const mins = Math.floor(video.duration / 60)
      const secs = Math.floor(video.duration % 60)
      setDurationStr(`${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const isVertical = naturalAspect === '9/16'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#080808]/95 backdrop-blur-2xl transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-5xl bg-[#0e0e10] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/10 bg-[#080808]/70 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white/50">{project.number} // MOTION PRODUCTION</span>
            <span className="text-white/20">/</span>
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider">{project.category}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close motion modal"
            className="p-2 text-white/70 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 md:p-10 space-y-8">
          {/* Main Video Presentation Frame */}
          <div className="relative w-full flex justify-center bg-black/90 rounded-xl overflow-hidden border border-white/10 p-2">
            <div
              className={`relative overflow-hidden rounded-lg ${
                isVertical
                  ? 'w-full max-w-[340px] aspect-[9/16]'
                  : 'w-full aspect-video'
              }`}
            >
              <video
                ref={videoRef}
                src={project.videoUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                onLoadedMetadata={handleLoadedMetadata}
                className="w-full h-full object-contain bg-black"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Video Playback Controls Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white shadow-xl">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    className="p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white fill-current" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    className="p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-white/60" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-white/70">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{durationStr !== '00:00' ? durationStr : project.duration || 'ORIGINAL CUT'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 tracking-widest uppercase mb-1">
                  <Film className="w-3.5 h-3.5" />
                  <span>CREATIVE DIRECTION & MOTION SPECS</span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl text-white">
                  {project.title}
                </h3>
                <p className="mt-3 text-base text-[#D0D0CC] font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h4 className="font-mono text-xs text-white/50 tracking-widest uppercase mb-3">
                    POST-PRODUCTION ATTRIBUTES
                  </h4>
                  <ul className="space-y-2.5">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#A1A1A1] bg-white/[0.02] p-3 rounded-lg border border-white/5">
                        <Sparkles className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Meta Column */}
            <div className="lg:col-span-4 space-y-6 bg-white/[0.02] p-6 rounded-xl border border-white/5">
              <div>
                <span className="font-mono text-[11px] text-white/50 tracking-widest uppercase block mb-1">
                  ROLE & EXPERTISE
                </span>
                <p className="font-mono text-xs text-white font-medium">{project.role || 'Motion Designer & Editor'}</p>
              </div>

              <div>
                <span className="font-mono text-[11px] text-white/50 tracking-widest uppercase block mb-2">
                  DISCIPLINES & TAGS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    onClose()
                    onContactClick()
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-white text-black font-mono text-xs tracking-widest uppercase font-semibold hover:bg-[#EAEAEA] transition-colors cursor-pointer"
                >
                  <span>COMMISSION MOTION WORK</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
