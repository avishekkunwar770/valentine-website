'use client'

import React from 'react'
import { useState, useRef, useEffect } from 'react'

interface ValentineQuestionProps {
  onYes: () => void
}

export default function ValentineQuestion({ onYes }: ValentineQuestionProps) {
  const [noPositionIndex, setNoPositionIndex] = useState(0)
  const [yesPositionIndex, setYesPositionIndex] = useState(0)
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])
  const [yesScale, setYesScale] = useState(1)
  const noButtonRef = useRef<HTMLButtonElement>(null)

  // Parametric heart formula
  const generateHeartPath = (steps: number, scale: number) => {
    const points = []
    for (let i = 0; i < steps; i++) {
      const t = (i / steps) * 2 * Math.PI
      const x = 16 * Math.pow(Math.sin(t), 3) * scale
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale
      points.push({ x, y })
    }
    return points
  }

  // Paths
  const noHeartPath = generateHeartPath(80, 20) // Large path for No button
  const yesHeartPath = generateHeartPath(80, 2)  // Tiny subtle path for Yes button

  const moveNoButton = () => {
    setNoPositionIndex(prev => {
      const nextIndex = (prev + 1) % noHeartPath.length
      const currentPoint = noHeartPath[nextIndex]

      // Add to trail (the heart contour)
      setTrail(t => {
        const exists = t.some(p => Math.abs(p.x - currentPoint.x) < 2 && Math.abs(p.y - currentPoint.y) < 2)
        if (exists) return t
        return [...t, { ...currentPoint, id: Date.now() }]
      })
      return nextIndex
    })
  }

  // Interaction Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!noButtonRef.current) return

      const rect = noButtonRef.current.getBoundingClientRect()
      const buttonCenterX = rect.left + rect.width / 2
      const buttonCenterY = rect.top + rect.height / 2

      const distance = Math.sqrt(
        Math.pow(e.clientX - buttonCenterX, 2) +
        Math.pow(e.clientY - buttonCenterY, 2)
      )

      // Evasion: Run away fast!
      if (distance < 300) {
        moveNoButton()
      }

      // Dynamic Effects
      const maxDist = 600
      const minDist = 50
      const d = Math.max(minDist, Math.min(maxDist, distance))
      const scaleFactor = 1 + (1 - (d - minDist) / (maxDist - minDist)) * 1.5
      setYesScale(scaleFactor)

      // Yes button travels its tiny heart path based on No button's progress
      setYesPositionIndex(noPositionIndex)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [noPositionIndex])

  const currentNoPos = noHeartPath[noPositionIndex]
  const currentYesPos = yesHeartPath[yesPositionIndex]

  return (
    <div className="flex flex-col items-center justify-between h-screen w-full py-12 px-4 bg-gradient-to-br from-rose-50 via-white to-pink-100 relative overflow-hidden">

      {/* 1. Header Section - Fixed at top for perfect alignment */}
      <div className="text-center z-20 animate-fade-in-down">
        <h1 className="text-5xl sm:text-7xl font-black bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent mb-4 font-serif italic tracking-tighter">
          One Last Question...
        </h1>
        <p className="text-2xl sm:text-4xl text-rose-800 font-bold leading-tight drop-shadow-sm">
          Will you be my Valentine? 💍
        </p>
      </div>

      {/* 2. Central Stage - The Heart Arena */}
      <div className="flex-grow flex items-center justify-center w-full relative">

        {/* Heart Contour Trail (Forms as No moves) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative">
            {trail.map(point => (
              <div
                key={point.id}
                className="absolute text-rose-500 font-black text-lg animate-pulse-fast whitespace-nowrap"
                style={{
                  transform: `translate(calc(-50% + ${point.x}px), calc(-50% + ${point.y}px))`,
                  filter: 'drop-shadow(0 0 8px rgba(225,29,72,0.5))',
                  opacity: 0.8
                }}
              >
                YES
              </div>
            ))}
          </div>
        </div>

        {/* Yes Button - Centers itself, takes a tiny path, and grows */}
        <div className="relative z-50 flex items-center justify-center">
          <button
            onClick={onYes}
            className="px-20 py-8 sm:px-24 sm:py-10 bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 text-white rounded-full font-black text-4xl sm:text-6xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-[0_30px_80px_rgba(225,29,72,0.4)] active:scale-95 whitespace-nowrap"
            style={{
              transform: `translate(${currentYesPos.x}px, ${currentYesPos.y}px) scale(${yesScale})`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            YES! 💖
          </button>
        </div>

        {/* No Button - Orbits and Runs Away */}
        <button
          ref={noButtonRef}
          onMouseEnter={moveNoButton}
          className="px-8 py-4 bg-white/95 backdrop-blur-sm border-4 border-rose-200 text-rose-300 rounded-full font-bold text-lg sm:text-xl hover:text-rose-400 transition-all duration-150 absolute z-40 shadow-xl pointer-events-auto whitespace-nowrap"
          style={{
            transform: `translate(calc(-50% + ${currentNoPos.x}px), calc(-50% + ${currentNoPos.y}px))`,
            left: '50%',
            top: '50%',
            transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          No...
        </button>
      </div>

      {/* 3. Footer Section - Fixed at bottom */}
      <div className="text-center z-20 pb-8 h-32 flex flex-col justify-end">
        <p className="text-rose-500 text-xl sm:text-2xl font-black animate-bounce tracking-widest italic drop-shadow-sm">
          {yesScale > 2 ? "THE CHOICE IS OBVIOUS! ❤️" : "THE HEART KNOWS THE TRUTH... ❤️"}
        </p>
        <div className="flex justify-center gap-6 mt-4 opacity-50 text-3xl">
          <span>💐</span><span>🦋</span><span>✨</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-fast {
          0%, 100% { opacity: 1; transform: scale(1) translate(calc(-50% + var(--tw-translate-x, 0)), calc(-50% + var(--tw-translate-y, 0))); }
          50% { opacity: 0.6; transform: scale(1.1) translate(calc(-50% + var(--tw-translate-x, 0)), calc(-50% + var(--tw-translate-y, 0))); }
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-pulse-fast { animation: pulse-fast 1s ease-in-out infinite; }
        .animate-fade-in-down { animation: fade-in-down 1s ease-out forwards; }
      `}</style>
    </div>
  )
}
