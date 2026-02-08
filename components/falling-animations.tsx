'use client'

import { useEffect, useState } from 'react'

interface FallingAnimationsProps {
  trigger?: boolean
}

export default function FallingAnimations({ trigger = false }: FallingAnimationsProps) {
  const [items, setItems] = useState<Array<{ id: number; type: string; left: number }>>([])
  const [isTriggered, setIsTriggered] = useState(false)

  useEffect(() => {
    if (trigger && !isTriggered) {
      setIsTriggered(true)
      
      // Large variety of falling items
      const allTypes = ['🌹', '❤️', '💕', '✨', '🌸', '🌺', '🌷', '🌻', '💐', '🎉', '🎊', '💖', '💗', '💓', '💞', '🎆', '🧨', '✨', '🌹', '❤️']
      
      // Initial burst - create many items quickly
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          const randomLeft = Math.random() * 100
          const randomType = allTypes[Math.floor(Math.random() * allTypes.length)]
          setItems((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random() + i,
              type: randomType,
              left: randomLeft,
            },
          ])
        }, i * 40)
      }

      // Continue creating items for longer duration with more frequency
      let count = 0
      const interval = setInterval(() => {
        const randomType = allTypes[Math.floor(Math.random() * allTypes.length)]
        const randomLeft = Math.random() * 100

        // Create 2-3 items per interval for more intensity
        for (let j = 0; j < 3; j++) {
          const offsetLeft = (randomLeft + (Math.random() * 20 - 10)) % 100
          setItems((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random() + j,
              type: allTypes[Math.floor(Math.random() * allTypes.length)],
              left: offsetLeft,
            },
          ])
        }

        count++
        if (count > 35) {
          clearInterval(interval)
        }
      }, 100)

      // Clean up old items
      const cleanup = setInterval(() => {
        setItems((prev) => {
          if (prev.length > 50) {
            return prev.slice(10)
          }
          return prev
        })
      }, 5000)

      return () => {
        clearInterval(interval)
        clearInterval(cleanup)
      }
    }
  }, [trigger, isTriggered])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.left}%`,
            top: '-50px',
            fontSize: Math.random() * 20 + 30 + 'px',
            animation: 'fallAnimation 6s ease-in forwards',
            textShadow: '0 0 10px rgba(220, 38, 38, 0.5)',
          }}
        >
          {item.type}
        </div>
      ))}

      <style jsx>{`
        @keyframes fallAnimation {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg) scale(0.8);
          }
        }
      `}</style>
    </div>
  )
}
