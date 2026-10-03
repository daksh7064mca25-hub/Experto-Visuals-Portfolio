import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { ArrowUpRight, Send, CheckCircle, Mail, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons'
import type { InquiryFormData } from '../types'

export interface ContactRef {
  focusForm: () => void
}

export const Contact = forwardRef<ContactRef, {}>((_, ref) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    projectType: 'Website',
    budget: '$2k - $5k',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const nameInputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focusForm: () => {
      const el = document.getElementById('contact')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => {
          nameInputRef.current?.focus()
        }, 500)
      }
    },
  }))

  const projectTypes = [
    'Website',
    '3D Website',
    'Web Application',
    'Frontend Development',
    'Motion Design',
    'Video Editing',
    'Reels',
    'Showreel',
    'Other',
  ]

  const budgets = ['< $2,000', '$2,000 – $5,000', '$5,000 – $10,000', '$10,000+']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please complete all required fields.')
      return
    }

    setErrorMessage('')
    setIsSubmitting(true)

    // Simulate swift submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          email: '',
          projectType: 'Website',
          budget: '$2k - $5k',
          message: '',
        })
      }, 5000)
    }, 900)
  }

  return (
    <section
      id="contact"
      className="relative w-full py-28 sm:py-40 bg-[#080808] text-[#F5F5F2] border-t border-white/5 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16 sm:mb-24">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#A1A1A1] tracking-widest uppercase">05 / SECTION</span>
            <span className="text-white/20">/</span>
            <h2 className="font-mono text-xs text-white tracking-widest uppercase">CONTACT & COMMISSIONS</h2>
          </div>
          <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            BOOKING Q2/Q3 2026
          </span>
        </div>

        {/* Main Grid: Editorial Typography Statement (Left) & Minimal Glass Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Left Column: Dramatic Editorial Call to Action */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2">
              <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.92] text-white uppercase select-none">
                LET'S MAKE <br />
                <span className="italic font-light text-[#D4D4D0]">SOMETHING</span> <br />
                MEMORABLE.
              </h2>
            </div>

            <p className="text-base sm:text-xl text-[#A1A1A1] font-light leading-relaxed max-w-lg">
              Have an idea, project or visual experience you want to bring to life?
              Let’s collaborate and construct something extraordinary.
            </p>

            {/* Direct Connect Links & Socials */}
            <div className="pt-8 border-t border-white/10 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#777777] tracking-widest uppercase block mb-2">
                  DIRECT EMAIL INQUIRY
                </span>
                <a
                  href="mailto:dakshbabbar3131@gmail.com"
                  data-cursor="EMAIL"
                  className="font-display text-2xl sm:text-3xl text-white hover:text-[#C8C8C5] transition-colors underline decoration-white/20 underline-offset-8"
                >
                  dakshbabbar3131@gmail.com
                </a>
              </div>

              <div>
                <span className="text-xs font-mono text-[#777777] tracking-widest uppercase block mb-3">
                  NETWORK & CHANNELS
                </span>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/DakshBabbar"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="GITHUB"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="LINKEDIN"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LINKEDIN</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="INSTAGRAM"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>INSTAGRAM</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Minimal Dark Glass Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="liquid-glass-card rounded-2xl p-6 sm:p-10 border border-white/10 relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                <span className="text-xs font-mono text-white/60 tracking-widest uppercase">
                  COMMISSION BRIEF
                </span>
                <span className="text-xs font-mono text-[#A1A1A1]">EST. RESPONSE &lt; 24H</span>
              </div>

              {isSubmitted ? (
                <div className="py-16 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-white">
                    <CheckCircle className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="font-display text-3xl text-white">TRANSMISSION RECEIVED</h3>
                  <p className="text-xs font-mono text-[#A1A1A1] max-w-sm mx-auto">
                    Thank you for reaching out. Daksh Babbar will review your creative brief and respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-xs font-mono text-red-300">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono tracking-widest text-[#A1A1A1] uppercase">
                        YOUR NAME *
                      </label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/[0.06] transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono tracking-widest text-[#A1A1A1] uppercase">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@studio.com"
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                  </div>

                  {/* Project Type Select Chips */}
                  <div className="space-y-2.5">
                    <label className="block text-[11px] font-mono tracking-widest text-[#A1A1A1] uppercase">
                      PROJECT TYPE
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                            formData.projectType === type
                              ? 'bg-white text-black font-semibold'
                              : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-2.5">
                    <label className="block text-[11px] font-mono tracking-widest text-[#A1A1A1] uppercase">
                      APPROXIMATE BUDGET
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgets.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`px-3 py-2 rounded-xl text-xs font-mono tracking-wider text-center transition-all cursor-pointer ${
                            formData.budget === b
                              ? 'bg-white text-black font-semibold'
                              : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Message */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-mono tracking-widest text-[#A1A1A1] uppercase">
                      PROJECT VISION & TIMELINE *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your brand goals, scope, and target launch date..."
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/[0.06] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-cursor="SEND"
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-white text-black font-mono text-xs tracking-widest uppercase font-semibold hover:bg-[#EAEAEA] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING BRIEF...</span>
                    ) : (
                      <>
                        <span>TRANSMIT PROJECT BRIEF</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Contact.displayName = 'Contact'
