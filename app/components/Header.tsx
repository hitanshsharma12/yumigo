'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Cakes', href: '#cakes' },
  { label: 'Order Now', href: '#order' },
  { label: 'Visit Us', href: '#visit' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { items, toggleCart } = useCartStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FDF6EC]/95 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* 🔥 Logo + Brand Name */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-3"
        >
         

          {/* 👇 Bakery Name */}
          <div className="leading-tight">
            <h1 className="font-display text-xl sm:text-2xl text-cocoa">
              YumiGo
            </h1>
            <p className="text-xs text-cocoa/60 tracking-wider">
              BAKERY
            </p>
          </div>
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-cocoa font-medium hover:text-yumi-yellow transition-colors duration-200 text-sm tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Cart + Mobile */}
        <div className="flex items-center gap-4">

          {/* Cart */}
          <motion.button
            onClick={toggleCart}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-full bg-yumi-yellow/20 hover:bg-yumi-yellow/40 transition-colors"
          >
            <ShoppingCart size={22} className="text-cocoa" />

            {items.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-yumi-purple text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
              >
                {items.length}
              </motion.span>
            )}
          </motion.button>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-cocoa"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FDF6EC] border-t border-gold/20 px-4 pb-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-cocoa font-medium border-b border-gold/10 hover:text-yumi-yellow transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}