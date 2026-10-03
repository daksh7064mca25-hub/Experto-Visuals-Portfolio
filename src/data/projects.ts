import type { Project } from '../types'

export const projectsData: Project[] = [
  {
    id: 'employee-management',
    number: '01',
    title: 'Employee Asset & Leave Management',
    subtitle: 'Centralized Enterprise Workforce, Asset & Leave Operations Platform',
    category: 'FULL-STACK WEB APPLICATION',
    timeline: '2025 – 2026',
    role: 'Full-Stack Developer',
    description: 'A full-stack employee management platform for managing employees, company assets, and employee leave workflows through a centralized dashboard.',
    fullOverview: 'Architected and built a comprehensive enterprise platform designed to automate human resource operations, hardware asset tracking, and employee leave approval cycles. Features JWT authentication, secure image uploads with Multer, MongoDB aggregation pipelines, and clean role-based admin workflows.',
    technologies: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'JWT',
      'Multer',
      'Tailwind CSS'
    ],
    highlights: [
      'Centralized executive dashboard with real-time workforce & check-in metrics',
      'Full employee lifecycle directory and department management',
      'Asset allocation, inventory status, and hardware return tracking',
      'Multi-tier leave request, quota tracking, and manager approval workflows',
      'Secure Multer multipart image uploads and profile configuration',
      'JWT-authenticated role-based access control (Admin & Employee roles)'
    ],
    image: '/images/projects/employee-management.jpg',
    accentColor: '#38bdf8',
    liveUrl: 'https://employee-leave-and-asset-management.vercel.app/login',
    githubUrl: 'https://github.com/daksh7064mca25-hub'
  },
  {
    id: 'saas-stripe-gateway',
    number: '02',
    title: 'StripeGateway / SaaSFlow',
    subtitle: 'High-Conversion SaaS Subscription Engine & Payment Infrastructure',
    category: 'FINTECH / SAAS PLATFORM',
    timeline: '2025 – 2026',
    role: 'Full-Stack Developer',
    description: 'A SaaS-style platform with customer and admin workflows, product management, authentication and Stripe-powered payment functionality.',
    fullOverview: 'Developed a robust multi-tenant SaaS commerce and subscription platform featuring Stripe Connect checkout integration, tiered subscription models, order cart state, webhook listeners for automatic invoice generation, and customer dispute / refund request workflows.',
    technologies: [
      'Next.js / React',
      'Node.js',
      'Express',
      'MongoDB',
      'Stripe API',
      'Tailwind CSS'
    ],
    highlights: [
      'Frictionless Stripe checkout flow with webhook-verified transactions',
      'Dedicated customer portal for plan management, invoicing, and card updates',
      'Centralized admin control panel with product catalog & pricing configuration',
      'Live MRR, subscription tier telemetry, and transaction telemetry',
      'Automated customer refund request and admin resolution pipeline',
      'Cart state orchestration and secure authenticated customer sessions'
    ],
    image: '/images/projects/saas-stripe.jpg',
    accentColor: '#818cf8',
    liveUrl: 'https://plans-and-stripe-management-system.vercel.app/',
    githubUrl: 'https://github.com/daksh7064mca25-hub'
  },
  {
    id: 'geo-restaurant-finder',
    number: '03',
    title: 'GeoRestaurantFinder',
    subtitle: 'Real-Time Geospatial Restaurant Discovery & Spatial Geometry Engine',
    category: 'GEOLOCATION / WEB APPLICATION',
    timeline: '2025 – 2026',
    role: 'Full-Stack Developer',
    description: 'A location-based restaurant discovery application using GeoJSON and MongoDB geospatial queries to find restaurants based on geographic location.',
    fullOverview: 'Engineered an interactive spatial application utilizing MongoDB 2dsphere indexing and GeoJSON geometry primitives to calculate geodesic distances in real-time. Delivers instant proximity-based restaurant discovery with custom radius filters, rating queries, and interactive map coordinate mapping.',
    technologies: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'GeoJSON',
      'MongoDB Geospatial Queries',
      'Leaflet Maps'
    ],
    highlights: [
      '2dsphere spatial indexing for high-performance geodesic radius queries',
      'Advanced MongoDB geospatial operators ($near, $geoWithin, $maxDistance)',
      'Real-time GPS browser location detection and radius-based restaurant filtering',
      'GeoJSON Point and Polygon spatial geometry parsing and map rendering',
      'Interactive restaurant details with cuisine categorization and live distance calculation'
    ],
    image: '/images/projects/geo-restaurant-finder.jpg',
    accentColor: '#34d399',
    liveUrl: '', // Ready for live deployment URL
    githubUrl: 'https://github.com/daksh7064mca25-hub'
  },
  {
    id: 'prepai',
    number: '04',
    title: 'PrepAI',
    subtitle: 'AI-Powered Real-Time Mock Interview Simulation & Feedback Platform',
    category: 'AI / WEB APPLICATION',
    timeline: '2025 – 2026',
    role: 'Full-Stack Developer & AI UI Architect',
    description: 'An AI-powered interview preparation platform providing real-time mock interviews, dynamic speech analysis, and instant feedback scorecards.',
    fullOverview: 'Engineered an intelligent interview preparation web platform designed to simulate realistic technical and behavioral hiring rounds. Integrates real-time audio speech analysis, adaptive LLM questioning pipelines, instant delivery feedback scorecards on clarity and technical accuracy, and interactive session history tracking.',
    technologies: [
      'Next.js / React',
      'Tailwind CSS',
      'AI / LLM Integration',
      'Web Audio API',
      'TypeScript',
      'Node.js'
    ],
    highlights: [
      'Real-time AI mock interview simulation with adaptive conversational questioning',
      'Instant evaluation scorecard measuring clarity, pace, and technical correctness',
      'Speech analysis with live audio waveform visualization and filler word detection',
      'Interactive question panel with System Design, Architecture, and Behavioral tracks',
      'Session recording, response playback, and personalized progress telemetry'
    ],
    image: '/images/projects/prepai.jpg',
    accentColor: '#10b981',
    liveUrl: 'https://prepai-ecru.vercel.app/',
    githubUrl: 'https://github.com/daksh7064mca25-hub'
  }
]
