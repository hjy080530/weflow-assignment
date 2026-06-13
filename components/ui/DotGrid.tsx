'use client'
import { useEffect, useRef } from 'react'

const SPACING = 32
const REPEL_RADIUS = 130
const REPEL_STRENGTH = 0.38
const SPRING = 0.065
const FRICTION = 0.77

interface Dot {
  ox: number; oy: number
  x: number; y: number
  vx: number; vy: number
}

export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let dots: Dot[] = []
    let mx = -9999
    let my = -9999
    let raf: number

    const init = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      dots = []
      const cols = Math.ceil(canvas.width / SPACING) + 1
      const rows = Math.ceil(canvas.height / SPACING) + 1
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const ox = c * SPACING
          const oy = r * SPACING
          dots.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 })
        }
      }
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const d of dots) {
        const dx = mx - d.ox
        const dy = my - d.oy
        const dist = Math.hypot(dx, dy)

        let tx = d.ox
        let ty = d.oy

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
          tx -= (dx / dist) * force * REPEL_RADIUS * 0.5
          ty -= (dy / dist) * force * REPEL_RADIUS * 0.5
        }

        d.vx += (tx - d.x) * SPRING
        d.vy += (ty - d.y) * SPRING
        d.vx *= FRICTION
        d.vy *= FRICTION
        d.x += d.vx
        d.y += d.vy

        const md = Math.hypot(mx - d.x, my - d.y)
        const alpha = md < REPEL_RADIUS * 1.4
          ? 0.08 + (1 - md / (REPEL_RADIUS * 1.4)) * 0.4
          : 0.08
        const size = md < REPEL_RADIUS
          ? 1.5 + (1 - md / REPEL_RADIUS) * 2.5
          : 1.5

        ctx.beginPath()
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(27,100,218,${alpha.toFixed(3)})`
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    init()

    const onResize = () => init()
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }
    const onLeave = () => { mx = -9999; my = -9999 }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
