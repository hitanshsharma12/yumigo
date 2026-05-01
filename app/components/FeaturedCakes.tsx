'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const cakes = [
  {
    name: 'Belgian Chocolate',
    desc: 'Dark chocolate ganache with Belgian cocoa layers',
    price: 'From ₹549',
    tag: 'Best Seller 🏆',
    img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80',
    color: '#4A2C0A',
  },
  {
    name: 'Strawberry Dream',
    desc: 'Fresh cream with real strawberry compote',
    price: 'From ₹599',
    tag: 'Fan Favourite ❤️',
    img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80',
    color: '#C0425A',
  },
  {
    name: 'Pineapple Delight',
    desc: 'Tropical pineapple with chantilly cream',
    price: 'From ₹549',
    tag: 'Refreshing 🍍',
    img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&q=80',
    color: '#D4A017',
  },
  {
    name: 'Butterscotch Bliss',
    desc: 'Classic butterscotch crunch with caramel swirls',
    price: 'From ₹579',
    tag: 'Classic Favourite',
    img: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=500&q=80',
    color: '#7B4F26',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function FeaturedCakes() {
  return (
    <section id="cakes" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-body text-sm uppercase tracking-widest text-yumi-yellow font-bold">
            Our Specialities
          </span>
          <h2 className="font-display text-5xl text-cocoa mt-3 mb-4">
            Cakes That <em>Delight</em>
          </h2>
          <p className="font-body text-cocoa/60 max-w-md mx-auto">
            All our cakes are freshly baked to order. Egg or eggless — just the way you want it.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cakes.map((cake) => (
            <motion.div
              key={cake.name}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400"
            >
              <div className="relative overflow-hidden h-56">
                <Image
                  src={cake.img}
                  alt={cake.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span
                  className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: cake.color }}
                >
                  {cake.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-cocoa mb-1">{cake.name}</h3>
                <p className="font-body text-sm text-cocoa/60 mb-3">{cake.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-body font-bold text-yumi-yellow text-lg">{cake.price}</span>
                  <motion.a
                    href="#order"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-yumi-purple/10 text-yumi-purple text-sm font-bold px-4 py-2 rounded-full hover:bg-yumi-purple hover:text-white transition-all duration-200"
                  >
                    Order →
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}