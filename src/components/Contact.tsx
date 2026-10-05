import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons'
import type { InquiryFormData } from '../types'

export interface ContactRef {
  focusForm: () => void
}

interface FormErrors {
  name?: string
  email?: string
  projectType?: string
  budget?: string
  timeline?: string
  message?: string
}

export const Contact = forwardRef<ContactRef, {}>((_, ref) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    projectType: 'Website',
    budget: '₹2,000 – ₹5,000',
    timeline: '',
    message: '',
  })

  // Honeypot anti-spam field
  const [honeypot, setHoneypot] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({})

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

  const budgets = ['< ₹2,000', '₹2,000 – ₹5,000', '₹5,000 – ₹10,000', '₹10,000+']

  const validateForm = (): boolean => {
    const errors: FormErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required'
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address'
    }

    if (!formData.projectType.trim()) {
      errors.projectType = 'Please select a project type'
    }

    if (!formData.budget.trim()) {
      errors.budget = 'Please select a budget tier'
    }

    if (!formData.timeline?.trim()) {
      errors.timeline = 'Timeline / target launch is required'
    }

    if (!formData.message.trim()) {
      errors.message = 'Project vision / description is required'
    } else if (formData.message.trim().length < 5) {
      errors.message = 'Please provide a few more details (min 5 characters)'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setErrorMessage('Please complete all required fields with valid information.')
      return
    }

    setErrorMessage('')
    setFieldErrors({})
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          projectType: formData.projectType,
          budget: formData.budget,
          timeline: formData.timeline?.trim() || 'Flexible',
          description: formData.message.trim(),
          message: formData.message.trim(),
          website_hp: honeypot, // Honeypot field for bot mitigation
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && data.success) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          projectType: 'Website',
          budget: '₹2,000 – ₹5,000',
          timeline: '',
          message: '',
        })
        setHoneypot('')
      } else {
        setErrorMessage(
          data.error ||
            'Something went wrong while transmitting your brief. Please try again or contact me directly by email.'
        )
      }
    } catch (err) {
      console.error('[Transmission Error]:', err)
      setErrorMessage(
        'Unable to connect to the server. Please check your connection or email directly at dakshbabbar3131@gmail.com.'
      )
    } finally {
      setIsSubmitting(false)
    }
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
                    href="https://github.com/daksh7064mca25-hub"
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
                    href="https://www.instagram.com/experto_visuals/"
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
                <div className="py-16 text-center space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-3xl sm:text-4xl text-white tracking-tight">PROJECT BRIEF RECEIVED.</h3>
                    <p className="text-sm font-sans text-[#A1A1A1] max-w-sm mx-auto leading-relaxed">
                      Thanks for reaching out. Your project details are now with me. I'll get back to you within 24 hours.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono text-white/90 tracking-wider transition-all cursor-pointer"
                  >
                    SEND ANOTHER BRIEF →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs font-mono text-red-200 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Honeypot hidden input for bot mitigation */}
                  <div style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
                    <input
                      type="text"
                      name="website_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

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
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value })
                          if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined })
                        }}
                        placeholder="e.g. Alex Morgan"
                        className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:bg-white/[0.06] transition-all ${
                          fieldErrors.name
                            ? 'border-red-500/60 focus:border-red-400'
                            : 'border-white/10 focus:border-white/40'
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="text-[11px] font-mono text-red-400">{fieldErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono tracking-widest text-[#A1A1A1] uppercase">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value })
                          if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined })
                        }}
                        placeholder="alex@studio.com"
                        className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:bg-white/[0.06] transition-all ${
                          fieldErrors.email
                            ? 'border-red-500/60 focus:border-red-400'
                            : 'border-white/10 focus:border-white/40'
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-[11px] font-mono text-red-400">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Project Type Select Chips */}
                  <div className="space-y-2.5">
                    <label className="block text-[11px] font-mono tracking-widest text-[#A1A1A1] uppercase">
                      PROJECT TYPE *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => {
                            setFormData({ ...formData, projectType: type })
                            if (fieldErrors.projectType) setFieldErrors({ ...fieldErrors, projectType: undefined })
                          }}
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
                    {fieldErrors.projectType && (
                      <p className="text-[11px] font-mono text-red-400">{fieldErrors.projectType}</p>
                    )}
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-2.5">
                    <label className="block text-[11px] font-mono tracking-widest text-[#A1A1A1] uppercase">
                      APPROXIMATE BUDGET *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgets.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => {
                            setFormData({ ...formData, budget: b })
                            if (fieldErrors.budget) setFieldErrors({ ...fieldErrors, budget: undefined })
                          }}
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
                    {fieldErrors.budget && (
                      <p className="text-[11px] font-mono text-red-400">{fieldErrors.budget}</p>
                    )}
                  </div>

                  {/* Timeline / Target Launch */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-mono tracking-widest text-[#A1A1A1] uppercase">
                      TIMELINE / TARGET LAUNCH *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.timeline}
                      onChange={(e) => {
                        setFormData({ ...formData, timeline: e.target.value })
                        if (fieldErrors.timeline) setFieldErrors({ ...fieldErrors, timeline: undefined })
                      }}
                      placeholder="e.g. 2–4 Weeks / Next Month / Q3 2026 / Immediate"
                      className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:bg-white/[0.06] transition-all ${
                        fieldErrors.timeline
                          ? 'border-red-500/60 focus:border-red-400'
                          : 'border-white/10 focus:border-white/40'
                      }`}
                    />
                    {fieldErrors.timeline && (
                      <p className="text-[11px] font-mono text-red-400">{fieldErrors.timeline}</p>
                    )}
                  </div>

                  {/* Project Message / Description */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-mono tracking-widest text-[#A1A1A1] uppercase">
                      PROJECT VISION & DESCRIPTION *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value })
                        if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: undefined })
                      }}
                      placeholder="Tell me about your brand goals, scope, and objectives..."
                      className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:bg-white/[0.06] transition-all resize-none ${
                        fieldErrors.message
                          ? 'border-red-500/60 focus:border-red-400'
                          : 'border-white/10 focus:border-white/40'
                      }`}
                    />
                    {fieldErrors.message && (
                      <p className="text-[11px] font-mono text-red-400">{fieldErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-cursor="SEND"
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-white text-black font-mono text-xs tracking-widest uppercase font-semibold hover:bg-[#EAEAEA] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>TRANSMITTING BRIEF...</span>
                      </span>
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
