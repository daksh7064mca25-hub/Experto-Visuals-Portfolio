import type { ServiceItem } from '../types'

export const servicesData: ServiceItem[] = [
  {
    number: '01',
    category: 'MOTION',
    title: 'Motion Design & Cinematic Video',
    tags: ['Motion Design', 'Video Editing', 'Visual Storytelling', 'Kinetic Typography'],
    description: 'Dynamic visual narratives, commercial video editing, and rhythmic motion graphics engineered to capture attention and amplify digital brand presence.',
    deliverables: [
      'Commercial Brand Films & Video Editing',
      'Kinetic Typography & 3D Title Sequences',
      'Micro-Interactions & UI Motion Specs',
      'Multi-Format Social & Campaign Teasers'
    ],
    previewImage: '/images/services/motion-discipline.jpg'
  },
  {
    number: '02',
    category: 'WEB',
    title: 'Creative Web & 3D Experiences',
    tags: ['Creative Websites', '3D Web Experiences', 'Interactive Storytelling', 'WebGL'],
    description: 'Award-winning creative web design that defies template norms. Immersive 3D environments, spatial physics, and editorial typography that feel truly alive.',
    deliverables: [
      'Bespoke Interactive Portfolio & Studio Sites',
      'Three.js & WebGL Real-Time Graphics',
      'Editorial Layouts & Luxury Art Direction',
      'Smooth Scroll Orchestration (GSAP & Lenis)'
    ],
    previewImage: '/images/services/web-discipline.jpg'
  },
  {
    number: '03',
    category: 'DEVELOPMENT',
    title: 'Frontend Architecture & Creative Code',
    tags: ['Frontend Development', 'React & Next.js', 'TypeScript', 'High Performance'],
    description: 'Rock-solid frontend engineering paired with fluid animation pipelines. Clean, maintainable architecture with 60 FPS performance and flawless responsive fidelity.',
    deliverables: [
      'Modern React, Next.js & TypeScript Codebases',
      'Custom Animation Engines & Shaders',
      'API & Payment Infrastructure (Stripe, REST)',
      'Sub-second Performance Optimization'
    ],
    previewImage: '/images/services/dev-discipline.jpg'
  },
  {
    number: '04',
    category: 'VISUALS',
    title: 'UI Motion & Digital Brand Systems',
    tags: ['UI Motion', 'Digital Visual Design', 'Brand Experiences', 'Design Systems'],
    description: 'End-to-end digital identity systems, bespoke visual artifacts, and holistic design systems bridging graphic design with interactive software.',
    deliverables: [
      'Editorial Design Systems & Component Kits',
      'Interactive Prototypes & High-Fidelity UI',
      '3D Brand Artifacts & Monograms',
      'Art Direction & Visual Brand Guidelines'
    ],
    previewImage: '/images/services/visuals-discipline.jpg'
  }
]
