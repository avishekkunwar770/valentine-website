'use client'

import React from 'react'
import { useState } from 'react'

interface NameFormProps {
  onContinue: () => void
}

export default function NameForm({ onContinue }: NameFormProps) {
  const [input, setInput] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Always set the value to "Abhishekh kunwar"
    setInput('Abhishekh kunwar')
  }

  const handleCancel = () => {
    setInput('')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden">
      {/* Decorative teddy bears */}
      <div className="absolute top-16 left-12 text-7xl opacity-60 animate-bounce" style={{ animationDuration: '3s' }}>🧸</div>
      <div className="absolute top-48 right-16 text-6xl opacity-50">🧸</div>
      <div className="absolute bottom-48 left-20 text-7xl opacity-60">🧸</div>
      <div className="absolute bottom-16 right-12 text-6xl opacity-50 animate-bounce" style={{ animationDuration: '4s' }}>🧸</div>

      {/* Decorative roses */}
      <div className="absolute top-32 left-1/4 text-5xl opacity-70">🌹</div>
      <div className="absolute top-64 right-1/4 text-6xl opacity-60">🌹</div>
      <div className="absolute bottom-48 right-20 text-5xl opacity-70">🌹</div>

      <div className="relative w-full max-w-2xl z-10">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-16 border-2 border-rose-200">
          <div className="text-center mb-10">
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
              My Love, Tell Me...
            </h1>
            <p className="text-rose-700 text-lg sm:text-xl font-medium">
              What is your boyfriend's name? ❤️
            </p>
          </div>

          <div className="space-y-6">
            {/* Input field with styling */}
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="His name here..."
                className="w-full px-6 py-5 text-center text-2xl font-semibold text-rose-700 border-3 border-rose-300 rounded-2xl focus:outline-none focus:border-rose-500 bg-gradient-to-br from-rose-50 to-pink-50 placeholder-rose-300 transition-all duration-300 hover:border-rose-400"
              />
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-3xl">✨</div>
            </div>

            {/* Display the name that appears */}
            {input && (
              <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-6 border-2 border-rose-200 text-center animate-bounce" style={{ animationDuration: '2s' }}>
                <p className="text-rose-600 text-sm font-medium mb-2">My beloved is:</p>
                <p className="text-3xl sm:text-4xl font-bold text-rose-700">{input}</p>
                <p className="text-rose-500 text-sm mt-2">💕 The love of my life 💕</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 justify-center flex-wrap mt-8">
              <button
                onClick={onContinue}
                disabled={!input}
                className="px-10 py-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-2xl font-bold text-lg hover:from-rose-600 hover:to-rose-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Continue 💕
              </button>
              <button
                onClick={handleCancel}
                className="px-10 py-4 bg-white border-2 border-rose-300 text-rose-600 rounded-2xl font-bold text-lg hover:bg-rose-50 transition-all transform hover:scale-105 shadow-md"
              >
                Cancel
              </button>
            </div>

            <p className="text-center text-rose-600 text-sm italic">
              No matter what you type, it will become something magical! Try typing and clearing...
            </p>
          </div>
        </div>
      </div>

      {/* Floating hearts animation background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatAround 8s ease-in-out infinite`,
              animationDelay: `${i * 1.3}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes floatAround {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-30px) translateX(20px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-60px) translateX(-20px);
            opacity: 0.2;
          }
          75% {
            transform: translateY(-30px) translateX(30px);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  )
}
