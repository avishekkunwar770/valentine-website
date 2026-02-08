'use client'

import { useState, useEffect } from 'react'

export default function ValentineSuccess() {
  const [showPhoto, setShowPhoto] = useState(false)

  const sayaris = [
    {
      content: `तिमी बिना यो मन अधुरो लाग्छ,
तिमी हुँदा संसार पूरा लाग्छ।
हरेक सासमा तिम्रो नाम छ,
हरेक धड्कनमा तिम्रै साथ छ।

आकाश जति गहिरा मेरा सपना,
समुन्द्र जति अटल मेरो भरोसा।
यो मनले अरू केही माग्दैन,
बस तिमी र तिम्रो साथ सधैंको चाहना।

कान्छु,
तिमी मेरो कविता हौ,
जसको अन्त्य कहिल्यै नहोस्।
यो Valentine मात्र होइन,
मेरो हरेक दिन तिम्रो नामले सुरु र अन्त्य होस्। ❤️`
    },
    {
      content: `तिमी आयौ जीवनको मौन क्षणमा,
दीपझैँ बलेर अन्धकार हरायौ।
भाग्यका पानामा लेखिन बाँकी कथा,
तिमीले आएर पूरा बनायौ।

शब्दहरू थाक्छन् तिम्रो वर्णनमा,
भावहरू मौन बन्छन् तिम्रो सामु।
मनको मन्दिरमा दीप जलाइ,
तिमी नै बन्यौ मेरो आराध्य नामु।

कान्छु,
तिमी केवल चाहना होइन,
तिमी नै मेरो साधना हौ।
यो Valentine होइन,
जिन्दगीभर तिमी नै मेरो प्रेम–प्रार्थना हौ। ❤️`
    }
  ]

  const message = `My love, every single second with you is a gift I treasure. Your smile is my sunshine, and your heart is my home. Today, as you say YES, you've made me the happiest man in the universe. I promise to cherish you, protect our love, and walk hand-in-hand with you through every season of life. You are my forever and always. Happy Valentine's Day, my queen! ❤️💍🌹`

  const triggerCelebrate = () => {
    for (let i = 0; i < 150; i++) {
      setTimeout(() => {
        const item = document.createElement('div')
        const types = ['❤️', '💕', '🌹', '🌸', '💐', '💍', '✨', '💝', '🥰', '😍']
        item.innerHTML = types[Math.floor(Math.random() * types.length)]
        item.style.position = 'fixed'
        item.style.left = Math.random() * 100 + 'vw'
        item.style.top = '-50px'
        item.style.fontSize = (Math.random() * 30 + 15) + 'px'
        item.style.pointerEvents = 'none'
        item.style.zIndex = '9999'
        item.style.animation = `extremeFall ${Math.random() * 3 + 3}s linear forwards`
        document.body.appendChild(item)
        setTimeout(() => item.remove(), 6000)
      }, i * 30)
    }
  }

  useEffect(() => {
    triggerCelebrate()
  }, [])

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full px-4 py-12 bg-gradient-to-br from-rose-100 via-white to-pink-200 relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          >
            {['🌹', '🌸', '✨', '💖'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-4xl z-10 flex flex-col gap-12 items-center">

        {/* 1. The Grand Announcement */}
        <div className="text-center animate-bounce-slow">
          <div className="inline-block px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full text-4xl sm:text-5xl font-black shadow-[0_15px_40px_rgba(225,29,72,0.3)] mb-6 border-2 border-white/30">
            SHE SAID YES! 💍🎉
          </div>
          <p className="text-rose-600 text-lg font-black italic tracking-widest drop-shadow-sm uppercase">
            Our Forever Journey Begins...
          </p>
        </div>

        {/* 2. The Main Love Letter */}
        <div className="w-full bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_30px_60px_rgba(225,29,72,0.15)] p-10 sm:p-14 border-4 border-white relative overflow-hidden text-center transition-transform hover:scale-[1.01]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400" />

          <h2 className="text-3xl sm:text-4xl font-serif italic font-black text-rose-600 mb-6 font-serif">
            My Forever Promise
          </h2>

          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-rose-800 text-lg sm:text-xl leading-relaxed font-serif italic first-letter:text-4xl first-letter:font-bold first-letter:text-rose-600 first-letter:mr-2">
              {message}
            </p>
          </div>

          <div className="flex justify-center gap-3 text-2xl text-rose-300">
            <span>✨</span><span>🌹</span><span>✨</span>
          </div>
        </div>

        {/* 3. The Photo Moment */}
        <div className="w-full max-w-xl bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-xl p-8 border-2 border-rose-50 text-center relative">
          <button
            onClick={() => {
              setShowPhoto(!showPhoto)
              if (!showPhoto) triggerCelebrate()
            }}
            className="w-full group relative px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white rounded-[1.5rem] font-black text-xl hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden mb-2"
          >
            <span className="relative z-10">📸 Reveal Our Special Moment 📸</span>
          </button>

          {showPhoto && (
            <div className="mt-6 p-2 bg-white rounded-[2rem] border-2 border-white shadow-2xl aspect-video flex items-center justify-center relative overflow-hidden animate-in zoom-in duration-1000">
              <div className="relative w-full h-full group">
                <img
                  src="/couple.jpg"
                  alt="Our Special Moment"
                  className="w-full h-full object-cover rounded-[1.5rem] shadow-inner transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent flex flex-col justify-end p-6 text-left">
                  <p className="text-white text-2xl font-serif italic font-black shadow-sm">Our Love Story</p>
                  <p className="text-rose-100 text-sm uppercase tracking-[0.2em] font-bold">Abhishekh & My Love</p>
                </div>
              </div>
              <div className="absolute top-4 left-4 text-3xl animate-spin-slow pointer-events-none">💖</div>
              <div className="absolute bottom-4 right-4 text-3xl animate-spin-slow pointer-events-none" style={{ animationDirection: 'reverse' }}>💍</div>
            </div>
          )}
        </div>

        {/* 4. The Sayaris */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {sayaris.map((sayari, idx) => (
            <div
              key={idx}
              className="bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(225,29,72,0.1)] p-10 sm:p-12 border-2 border-white relative group transition-all hover:scale-[1.02]"
            >
              <div className="absolute -top-4 -right-4 bg-rose-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shadow-md group-hover:rotate-12 transition-transform">
                🌹
              </div>
              <p className="text-rose-900 text-lg sm:text-xl leading-[1.8] whitespace-pre-line text-center font-serif italic font-medium">
                {sayari.content}
              </p>
            </div>
          ))}
        </div>

        {/* 5. Infinite Celebration Section */}
        <div className="flex gap-6 justify-center flex-wrap pt-8">
          <button
            onClick={triggerCelebrate}
            className="px-10 py-5 bg-yellow-400 text-white rounded-[1.5rem] font-black text-lg hover:bg-yellow-500 hover:scale-105 transition-all shadow-md"
          >
            LOVE! 💝
          </button>
          <button
            onClick={triggerCelebrate}
            className="px-10 py-5 bg-rose-500 text-white rounded-[1.5rem] font-black text-lg hover:bg-rose-600 hover:scale-105 transition-all shadow-md"
          >
            BLAST! ✨
          </button>
        </div>

        {/* Final Outro */}
        <div className="text-center py-10 pb-20">
          <p className="text-rose-600 text-3xl sm:text-4xl italic font-black animate-pulse-slow">
            Forever starts now... 💑
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes extremeFall {
          0% { transform: translateY(0) rotate(0deg) scale(0.5); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg) scale(1.5); opacity: 0; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0); }
          50% { transform: translate(30px, -50px) rotate(15deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.03); opacity: 0.9; }
        }
        .animate-float { animation: float 10s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
