'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80'

// NEW Light Elegant Background (soft bakery vibe)
const BG_IMAGE = 'https://images.unsplash.com/photo-1607472586895-2c0c8f6b5e0f?q=80&w=1600' 
// Soft warm bakery background - change kar sakta hai agar aur pasand aaye

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-[#fffaf5]"
    >
      {/* Background Image - Light Theme */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={BG_IMAGE}
          alt="Bakery background"
          fill
          className="object-cover"
          priority
        />
        {/* Soft light overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center py-20">
        
        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block bg-white/80 backdrop-blur-md text-[#5c4033] font-body font-bold text-sm uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-[#d4b89e]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✨ Crafted with Love since 2015
          </motion.span>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6 text-[#3c2f2f]">
            Every Bite
            <br />
            <span className="text-[#e8b923] italic">Tells a Story</span>
          </h1>

          <p className="font-body text-[#5c4033]/80 text-lg mb-8 max-w-md leading-relaxed">
            Custom cakes crafted with the finest ingredients. Egg or eggless,
            we make every celebration taste like a fairytale.
          </p>

          {/* Buttons - Light Theme Style */}
          <div className="flex flex-wrap gap-4">
            
            {/* Primary Button - Warm Gold/Cream */}
            <motion.a
              href="#order"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-[#e8b923] hover:bg-[#d4a017] text-[#3c2f2f] font-body font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 text-base"
            >
              🎂 Order Now
            </motion.a>

            {/* Secondary Button */}
            <motion.a
              href="#cakes"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 border-2 border-[#5c4033] text-[#3c2f2f] font-body font-bold px-8 py-4 rounded-full hover:bg-[#5c4033] hover:text-white transition-all duration-300 text-base"
            >
              Explore Cakes
            </motion.a>
          </div>

          {/* STATS */}
          <motion.div
            className="flex gap-8 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { num: '10K+', label: 'Happy Customers' },
              { num: '50+', label: 'Cake Flavours' },
              { num: '100%', label: 'Fresh Daily' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="font-display text-3xl font-bold text-[#e8b923]">
                  {num}
                </p>
                <p className="font-body text-sm text-[#5c4033]/70 mt-0.5">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* IMAGE SIDE */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            
            <div className="absolute inset-8 rounded-full bg-[#e8b923]/20 blur-3xl" />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src={HERO_IMAGE}
                alt="Beautiful custom cake"
                width={600}
                height={600}
                className="object-cover w-full h-full"
                priority
              />
            </motion.div>

            {/* BADGES - Light Theme */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 z-20 border border-[#e8b923]/30">
              <p className="text-xs text-[#8b6f47]">Available Today</p>
              <p className="font-bold text-[#5c4033] text-sm">
                Same Day Delivery 🚀
              </p>
            </div>

            <div className="absolute -top-4 -right-4 bg-white text-[#3c2f2f] rounded-2xl shadow-xl px-4 py-3 z-20 border border-[#e8b923]/30">
              <p className="text-xs font-bold">🥚 Eggless</p>
              <p className="text-xs text-[#8b6f47]">Available!</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#5c4033]"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-[#5c4033] to-transparent" />
        <p className="text-xs tracking-widest uppercase">Scroll</p>
      </motion.div>
    </section>
  )
}