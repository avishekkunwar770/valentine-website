'use client'

import { useState, useEffect } from 'react'
import FallingAnimations from './falling-animations'

interface ValentineBoxProps {
  onOpen: () => void
}

export default function ValentineBox({ onOpen }: ValentineBoxProps) {
  const [isOpening, setIsOpening] = useState(false)
  const [showFalling, setShowFalling] = useState(false)
  const [clickReactions, setClickReactions] = useState<{ id: number; emoji: string; left: string }[]>([])
  const [excitedBurst, setExcitedBurst] = useState(false)
  const [mounted, setMounted] = useState(false)

  // State for pre-generated random elements to avoid hydration mismatch
  const [bgElements, setBgElements] = useState<{ id: number; left: string; top: string; delay: string; size: string; emoji: string }[]>([])
  const [openingElements, setOpeningElements] = useState<{ id: number; tx: string; rot: string; delay: string; duration: string; emoji: string }[]>([])

  const reactions = ['❤️', '💖', '🥰', '😍', '💕', '✨']

  useEffect(() => {
    // Generate all random values only on mount (client-side)
    const bg = [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      size: `${Math.random() * 20 + 20}px`,
      emoji: ['❤️', '🌸', '✨', '☁️'][Math.floor(Math.random() * 4)]
    }))

    const opening = [...Array(30)].map((_, i) => ({
      id: i,
      tx: `${(Math.random() - 0.5) * 400}px`,
      rot: `${Math.random() * 720}deg`,
      delay: `${Math.random() * 0.5}s`,
      duration: `${2 + Math.random() * 2}s`,
      emoji: ['❤️', '💖', '✨', '🌹', '🌸', '💕'][Math.floor(Math.random() * 6)]
    }))

    setBgElements(bg)
    setOpeningElements(opening)
    setMounted(true)
  }, [])

  const handleBoxClick = () => {
    if (isOpening) return

    setExcitedBurst(true)
    setTimeout(() => setExcitedBurst(false), 2000)

    const now = Date.now()
    const newReactions = Array.from({ length: 8 }).map((_, i) => ({
      id: now + i,
      emoji: reactions[Math.floor(Math.random() * reactions.length)],
      left: `${20 + Math.random() * 60}%`
    }))
    setClickReactions(prev => [...prev, ...newReactions])

    setTimeout(() => {
      setClickReactions(prev => prev.filter(r => !newReactions.find(nr => nr.id === r.id)))
    }, 2000)

    setTimeout(() => {
      setIsOpening(true)
      setShowFalling(true)
      setTimeout(() => {
        onOpen()
      }, 4000)
    }, 800)
  }

  // Initial SSR render matching Client's initial state (not mounted)
  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 relative overflow-hidden font-sans">
        {/* Placeholder tree matching the depth of the final tree */}
        <div className="relative flex flex-col items-center gap-8 z-20">
          <div className="text-center opacity-0">
            <h1 className="text-6xl sm:text-8xl font-black">My Forever Love</h1>
            <p className="text-xl sm:text-2xl italic">Placeholder</p>
          </div>
          <div className="w-64 h-64 sm:w-80 sm:h-80 opacity-0" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 relative overflow-hidden font-sans">
      <FallingAnimations trigger={showFalling} />

      {/* Romantic Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {bgElements.map((el) => (
          <div
            key={el.id}
            className="absolute animate-float"
            style={{
              left: el.left,
              top: el.top,
              animationDelay: el.delay,
              fontSize: el.size
            }}
          >
            {el.emoji}
          </div>
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-8 z-20">
        {/* Header Section */}
        <div className={`text-center transition-all duration-1000 ${isOpening ? 'opacity-0 -translate-y-10' : 'opacity-100 translate-y-0'}`}>
          <h1 className="text-6xl sm:text-8xl font-black bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text text-transparent mb-4 drop-shadow-sm font-serif">
            My Forever Love
          </h1>
          <p className="text-rose-600 text-xl sm:text-2xl font-medium tracking-wide italic">
            A sweet surprise waits just for you... 💝
          </p>
        </div>

        {/* Gift Box Container */}
        <div className="relative group perspective-1000">
          {/* Messenger Style Reactions Container */}
          <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
            {clickReactions.map(reaction => (
              <span
                key={reaction.id}
                className="absolute text-5xl animate-reaction"
                style={{
                  left: reaction.left,
                  bottom: '20%'
                }}
              >
                {reaction.emoji}
              </span>
            ))}
          </div>

          {/* Excited Emoji Burst */}
          {excitedBurst && (
            <div className="absolute inset-x-0 -top-20 flex justify-center pointer-events-none z-50">
              <div className="text-8xl animate-bounce-slow">🥰</div>
            </div>
          )}

          {/* 3D Gift Box */}
          <div
            onClick={handleBoxClick}
            className={`cursor-pointer transition-all duration-700 ease-in-out transform-gpu 
              ${isOpening ? 'scale-110' : 'hover:scale-105 active:scale-95'}
              ${excitedBurst ? 'animate-vibrate' : ''}
            `}
          >
            {/* Box Lid */}
            <div
              className={`absolute -top-4 -left-2 w-[calc(100%+16px)] h-16 bg-gradient-to-br from-rose-400 to-rose-600 rounded-t-xl z-30 transition-all duration-1000 origin-bottom shadow-xl flex items-center justify-center
                ${isOpening ? '-rotate-90 -translate-y-48 opacity-0' : 'rotate-0'}
              `}
              style={{
                boxShadow: '0 -5px 15px rgba(0,0,0,0.1)'
              }}
            >
              {/* Ribbon Bow */}
              <div className="absolute -top-8 w-24 h-12 flex items-center justify-center">
                <div className="w-10 h-10 bg-rose-300 rounded-full border-4 border-rose-200 shadow-md"></div>
                <div className="absolute -left-6 w-16 h-8 bg-rose-200 rounded-full rotate-[-30deg] border-2 border-rose-100 shadow-sm"></div>
                <div className="absolute -right-6 w-16 h-8 bg-rose-200 rounded-full rotate-[30deg] border-2 border-rose-100 shadow-sm"></div>
              </div>
            </div>

            {/* Box Body */}
            <div
              className={`w-64 h-64 sm:w-80 sm:h-80 rounded-b-2xl transition-all duration-700 relative overflow-hidden
                ${isOpening ? 'scale-0 opacity-0 blur-sm' : 'scale-100 opacity-100'}
              `}
              style={{
                background: 'linear-gradient(135deg, #fb7185 0%, #e11d48 50%, #be185d 100%)',
                boxShadow: '0 25px 50px -12px rgba(225, 29, 72, 0.5), inset -8px -8px 20px rgba(0,0,0,0.15)'
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-full bg-white/20 backdrop-blur-sm shadow-inner" />
              <div className={`absolute inset-0 bg-yellow-100/40 mix-blend-overlay transition-opacity duration-500 ${isOpening ? 'opacity-100' : 'opacity-0'}`} />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <p className="text-white text-3xl font-serif italic mb-2 tracking-tight">Open</p>
                <div className="text-5xl my-2">🎁</div>
                <p className="text-rose-100 text-xl font-light uppercase tracking-[0.2em] mt-2">Special Gift</p>
              </div>
            </div>

            {/* Opening Effects */}
            {isOpening && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-40 h-40 bg-pink-400 rounded-full blur-[80px] animate-pulse opacity-70"></div>

                {openingElements.map((el) => (
                  <div
                    key={el.id}
                    className="absolute"
                    style={{
                      animation: `romanticFloat ${el.duration} ease-out forwards`,
                      animationDelay: el.delay,
                      // @ts-ignore
                      '--tx': el.tx,
                      '--rot': el.rot
                    } as any}
                  >
                    <span className="text-4xl" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))' }}>
                      {el.emoji}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Instruction Footer */}
        <div className={`text-center mt-12 transition-opacity duration-1000 ${isOpening ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-rose-700 text-2xl font-bold animate-soft-pulse flex items-center justify-center gap-3">
            <span className="animate-bounce">👉</span>
            Tap your sweet gift box
            <span className="animate-bounce">👈</span>
          </p>
          <div className="mt-4 flex gap-4 justify-center text-rose-400 opacity-60">
            <span>🌹</span>
            <span>🎀</span>
            <span>🧸</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-2000 { perspective: 2000px; }

        @keyframes reaction {
          0% { transform: translateY(0) scale(0) rotate(0); opacity: 0; }
          15% { opacity: 1; transform: translateY(-20px) scale(1.2) rotate(15deg); }
          100% { transform: translateY(-200px) scale(0.5) rotate(-15deg); opacity: 0; }
        }

        @keyframes romanticFloat {
          0% { transform: scale(0) translate(0, 0) rotate(0); opacity: 0; }
          20% { opacity: 1; transform: scale(1.2) translate(0, -20px); }
          100% { transform: scale(0.8) translate(var(--tx, 100px), -600px) rotate(var(--rot, 45deg)); opacity: 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes vibrate {
          0%, 100% { transform: scale(1) rotate(0); }
          20% { transform: scale(1.05) rotate(2deg); }
          40% { transform: scale(0.95) rotate(-2deg); }
          60% { transform: scale(1.02) rotate(1deg); }
          80% { transform: scale(0.98) rotate(-1deg); }
        }

        .animate-reaction { animation: reaction 1.5s ease-out forwards; }
        .animate-vibrate { animation: vibrate 0.3s ease-in-out infinite; }
        .animate-soft-pulse { animation: softPulse 2s ease-in-out infinite; }

        @keyframes softPulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) scale(1.1); }
          50% { transform: translateY(-30px) scale(1.3); }
        }

        .animate-bounce-slow { animation: bounce-slow 1s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
