import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const BrandArtifact3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const canvas = canvasRef.current
    const container = containerRef.current

    const width = container.clientWidth || 300
    const height = container.clientHeight || 300

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 4.8

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Create an elegant multifaceted brand artifact (Octahedron + Torus knot wireframe aura)
    const geometry = new THREE.IcosahedronGeometry(1.4, 0)
    
    // Luxurious Metallic Chrome Material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      wireframe: false,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Inner wireframe core for depth
    const wireGeometry = new THREE.IcosahedronGeometry(1.42, 1)
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x999999,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    })
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial)
    scene.add(wireMesh)

    // Subtle orbital ring
    const ringGeo = new THREE.TorusGeometry(1.9, 0.015, 16, 100)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = Math.PI / 3
    scene.add(ringMesh)

    // Cinematic Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5)
    keyLight.position.set(5, 5, 4)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0xa0a5b5, 2.0)
    rimLight.position.set(-5, -3, -2)
    scene.add(rimLight)

    // Subtle mouse interaction
    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return
      const rect = container.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }

    container.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Intersection Observer so it only renders when visible in viewport (High performance!)
    let isVisible = true
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting
      },
      { threshold: 0.1 }
    )
    observer.observe(container)

    let animationFrameId: number
    const startTime = performance.now()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (!isVisible) return

      const elapsedTime = (performance.now() - startTime) * 0.001

      if (!prefersReducedMotion) {
        targetRotationY = mouseX * 0.8
        targetRotationX = mouseY * 0.8

        mesh.rotation.y += (targetRotationY + elapsedTime * 0.25 - mesh.rotation.y) * 0.05
        mesh.rotation.x += (targetRotationX + Math.sin(elapsedTime * 0.5) * 0.1 - mesh.rotation.x) * 0.05

        wireMesh.rotation.y = mesh.rotation.y
        wireMesh.rotation.x = mesh.rotation.x

        ringMesh.rotation.z = elapsedTime * 0.15
      }

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!containerRef.current) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    // Disposal Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', handleMouseMove)

      geometry.dispose()
      wireGeometry.dispose()
      ringGeo.dispose()
      material.dispose()
      wireMaterial.dispose()
      ringMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[240px] sm:h-[280px] flex items-center justify-center overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-white/40 uppercase pointer-events-none select-none">
        EXPERTO CORE ARTIFACT // INTERACTIVE 3D
      </div>
    </div>
  )
}
