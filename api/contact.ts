import { Resend } from 'resend'

// Types for request/response in serverless and node environment
interface ContactPayload {
  name?: string
  email?: string
  projectType?: string
  budget?: string
  timeline?: string
  description?: string
  message?: string
  website_hp?: string // Honeypot field for bot spam detection
}

// In-memory rate limiter for serverless instance (IP-based)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return false
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  record.count += 1
  return false
}

// Escape HTML special characters to prevent HTML/XSS injection in emails
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Email format validator
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

export default async function handler(req: any, res: any) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Only POST requests are accepted.',
    })
  }

  // Get Client IP
  const forwarded = req.headers['x-forwarded-for']
  const ip = typeof forwarded === 'string'
    ? forwarded.split(',')[0].trim()
    : req.socket?.remoteAddress || req.connection?.remoteAddress || '127.0.0.1'

  // Apply Rate Limiting
  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a few minutes before submitting another inquiry.',
    })
  }

  try {
    // Parse body if string
    const body: ContactPayload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}

    const {
      name,
      email,
      projectType,
      budget,
      timeline,
      description,
      message,
      website_hp,
    } = body

    const projectDesc = (description || message || '').trim()
    const projectTimeline = (timeline || 'Flexible / Immediate').trim()

    // 1. Honeypot check: If filled, silently acknowledge to fool bots
    if (website_hp && website_hp.trim().length > 0) {
      console.warn(`[Bot Detected] Honeypot triggered from IP: ${ip}`)
      return res.status(200).json({
        success: true,
        message: 'Your project brief has been received.',
      })
    }

    // 2. Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid name (at least 2 characters).',
      })
    }

    if (!email || typeof email !== 'string' || !isValidEmail(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      })
    }

    if (!projectType || typeof projectType !== 'string' || projectType.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please select a project type.',
      })
    }

    if (!budget || typeof budget !== 'string' || budget.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please select an approximate budget.',
      })
    }

    if (!projectTimeline || typeof projectTimeline !== 'string' || projectTimeline.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a target timeline.',
      })
    }

    if (!projectDesc || projectDesc.length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your project vision / description (at least 5 characters).',
      })
    }

    // Length limit checks
    if (
      name.length > 100 ||
      email.length > 120 ||
      projectType.length > 80 ||
      budget.length > 80 ||
      projectTimeline.length > 120 ||
      projectDesc.length > 5000
    ) {
      return res.status(400).json({
        success: false,
        error: 'Form fields exceed maximum permissible length.',
      })
    }

    // Clean & Sanitize fields
    const sanitizedName = escapeHtml(name.trim())
    const rawEmail = email.trim().toLowerCase()
    const sanitizedEmail = escapeHtml(rawEmail)
    const sanitizedProjectType = escapeHtml(projectType.trim())
    const sanitizedBudget = escapeHtml(budget.trim())
    const sanitizedTimeline = escapeHtml(projectTimeline)
    const sanitizedDescription = escapeHtml(projectDesc)
    const submissionTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'long',
    })

    // Destination email configuration (read strictly on server)
    const contactEmail = process.env.CONTACT_EMAIL || 'dakshbabbar3131@gmail.com'
    const fromEmail = process.env.FROM_EMAIL || 'Experto Visuals <onboarding@resend.dev>'
    const resendApiKey = process.env.RESEND_API_KEY

    // DEV SIMULATION MODE (if RESEND_API_KEY is not configured)
    if (!resendApiKey) {
      console.log('----------------------------------------------------')
      console.log('⚡ [DEV MODE] RESEND_API_KEY not configured.')
      console.log('Simulating email dispatch for project brief:')
      console.log(`To: ${contactEmail}`)
      console.log(`Reply-To: ${rawEmail}`)
      console.log(`Client Name: ${name.trim()}`)
      console.log(`Project Type: ${projectType.trim()}`)
      console.log(`Budget: ${budget.trim()}`)
      console.log(`Timeline: ${projectTimeline}`)
      console.log(`Description: ${projectDesc}`)
      console.log(`Submitted At: ${submissionTime} (IST)`)
      console.log('----------------------------------------------------')

      return res.status(200).json({
        success: true,
        message: 'Project brief received successfully (Dev Simulation Mode).',
      })
    }

    const resend = new Resend(resendApiKey)

    // 1. Email to Daksh (Portfolio Owner)
    const ownerEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Project Inquiry — Experto Visuals</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #080808; color: #f5f5f2; margin: 0; padding: 32px 16px; }
    .container { max-width: 620px; margin: 0 auto; background: #111111; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
    .header { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 28px; }
    .tag { font-family: monospace; font-size: 11px; letter-spacing: 0.15em; color: #10b981; text-transform: uppercase; font-weight: 600; }
    .title { font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em; margin: 8px 0 0 0; }
    .section-title { font-family: monospace; font-size: 11px; color: #888888; letter-spacing: 0.12em; text-transform: uppercase; margin: 24px 0 12px 0; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 18px; }
    .grid { display: table; width: 100%; }
    .row { display: table-row; }
    .label { display: table-cell; width: 35%; padding: 8px 0; color: #999999; font-size: 13px; font-family: monospace; text-transform: uppercase; }
    .value { display: table-cell; width: 65%; padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 500; }
    .message-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 18px; color: #e5e5e5; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin-top: 8px; }
    .btn-container { margin-top: 32px; text-align: center; }
    .btn { display: inline-block; background: #ffffff; color: #000000 !important; font-weight: 600; font-size: 13px; font-family: monospace; letter-spacing: 0.08em; text-transform: uppercase; padding: 14px 28px; border-radius: 9999px; text-decoration: none; }
    .footer { font-family: monospace; font-size: 11px; color: #666666; text-align: center; margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="tag">● NEW PROJECT INQUIRY</span>
      <h1 class="title">EXPERTO VISUALS</h1>
    </div>

    <div class="section-title">CLIENT</div>
    <div class="grid">
      <div class="row">
        <span class="label">Name:</span>
        <span class="value">${sanitizedName}</span>
      </div>
      <div class="row">
        <span class="label">Email:</span>
        <span class="value"><a href="mailto:${sanitizedEmail}" style="color: #60a5fa; text-decoration: none;">${sanitizedEmail}</a></span>
      </div>
    </div>

    <div class="section-title">PROJECT</div>
    <div class="grid">
      <div class="row">
        <span class="label">Project Type:</span>
        <span class="value" style="color: #34d399;">${sanitizedProjectType}</span>
      </div>
      <div class="row">
        <span class="label">Budget:</span>
        <span class="value" style="color: #fbbf24;">${sanitizedBudget}</span>
      </div>
      <div class="row">
        <span class="label">Timeline:</span>
        <span class="value">${sanitizedTimeline}</span>
      </div>
    </div>

    <div class="section-title">PROJECT VISION</div>
    <div class="label" style="display: block; margin-bottom: 6px;">Description:</div>
    <div class="message-box">${sanitizedDescription}</div>

    <div class="section-title">METADATA</div>
    <div class="grid">
      <div class="row">
        <span class="label">Submitted:</span>
        <span class="value">${submissionTime}</span>
      </div>
    </div>

    <div class="btn-container">
      <a href="mailto:${sanitizedEmail}?subject=Re:%20ExpertoVisuals%20Inquiry%20%E2%80%94%20${encodeURIComponent(sanitizedProjectType)}" class="btn">
        Reply Directly to Client →
      </a>
    </div>

    <div class="footer">
      Experto Visuals — Automated Transmission Hub
    </div>
  </div>
</body>
</html>
`

    const ownerEmailText = `
--------------------------------
NEW PROJECT INQUIRY
EXPERTO VISUALS
--------------------------------

CLIENT
Name:
${name.trim()}

Email:
${rawEmail}

PROJECT
Project Type:
${projectType.trim()}

Budget:
${budget.trim()}

Timeline:
${projectTimeline}

PROJECT VISION
Description:
${projectDesc}

Submitted:
${submissionTime}

--------------------------------
Reply directly to: ${rawEmail}
`

    // 2. Client Confirmation Email
    const clientEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Thanks for reaching out — ExpertoVisuals</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #080808; color: #f5f5f2; margin: 0; padding: 32px 16px; }
    .container { max-width: 600px; margin: 0 auto; background: #111111; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
    .brand { font-family: monospace; font-size: 13px; letter-spacing: 0.15em; color: #ffffff; text-transform: uppercase; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 24px; }
    .content { font-size: 15px; line-height: 1.7; color: #d4d4d0; }
    .content p { margin: 0 0 16px 0; }
    .highlight-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 18px; margin: 24px 0; }
    .highlight-label { font-family: monospace; font-size: 11px; color: #888888; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px; }
    .highlight-value { color: #ffffff; font-size: 14px; font-weight: 500; }
    .signature { margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; font-size: 14px; color: #a1a1a1; }
    .sig-name { color: #ffffff; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="brand">EXPERTO VISUALS</div>
    <div class="content">
      <p>Hi ${sanitizedName},</p>
      <p>Thanks for reaching out to ExpertoVisuals.</p>
      <p>I've received your project brief regarding <strong>${sanitizedProjectType}</strong> and will review the scope and details carefully.</p>
      <p>I'll get back to you within <strong>24 hours</strong> to discuss the project, requirements, timeline and next steps.</p>

      <div class="highlight-card">
        <div class="highlight-label">Captured Brief Summary</div>
        <div class="highlight-value">${sanitizedProjectType} &bull; Budget: ${sanitizedBudget} &bull; Timeline: ${sanitizedTimeline}</div>
      </div>

      <p>Looking forward to creating something memorable together.</p>
    </div>

    <div class="signature">
      <span class="sig-name">— Daksh Babbar</span><br />
      Founder & Lead Creator, ExpertoVisuals<br />
      <a href="mailto:dakshbabbar3131@gmail.com" style="color: #888888; text-decoration: none; font-family: monospace; font-size: 12px;">dakshbabbar3131@gmail.com</a>
    </div>
  </div>
</body>
</html>
`

    const clientEmailText = `
Hi ${name.trim()},

Thanks for reaching out to ExpertoVisuals.

I've received your project brief regarding ${projectType.trim()} and will review the details carefully.

I'll get back to you within 24 hours to discuss the project, requirements, timeline and next steps.

Looking forward to creating something memorable together.

— Daksh
ExpertoVisuals
dakshbabbar3131@gmail.com
`

    // 1. Dispatch primary notification to Daksh
    const { error: ownerError } = await resend.emails.send({
      from: fromEmail,
      to: [contactEmail],
      replyTo: rawEmail,
      subject: `[ExpertoVisuals] New Project Inquiry — ${projectType.trim()}`,
      html: ownerEmailHtml,
      text: ownerEmailText,
    })

    if (ownerError) {
      console.error('[Resend Error sending to owner]:', ownerError)
      return res.status(500).json({
        success: false,
        error: 'Unable to deliver inquiry email at this time. Please try again or reach out directly at dakshbabbar3131@gmail.com.',
      })
    }

    // 2. Dispatch confirmation to Client (Resend free tier only permits sending to owner email until custom domain is verified)
    const isTestingDomain = fromEmail.includes('onboarding@resend.dev')
    if (!isTestingDomain || rawEmail.toLowerCase() === contactEmail.toLowerCase()) {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: [rawEmail],
          subject: 'Thanks for reaching out — ExpertoVisuals',
          html: clientEmailHtml,
          text: clientEmailText,
        })
      } catch (clientErr) {
        console.warn('[Resend Client Confirmation Notice]:', clientErr)
      }
    } else {
      console.log(
        `[Resend Notice]: Confirmation email to ${rawEmail} skipped because sender is 'onboarding@resend.dev'. Add a verified custom domain in resend.com/domains to enable client confirmations.`
      )
    }

    return res.status(200).json({
      success: true,
      message: 'Project brief transmitted successfully.',
    })
  } catch (error: any) {
    console.error('[Contact API Server Error]:', error)
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your request. Please try again later.',
    })
  }
}
