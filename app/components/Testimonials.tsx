'use client'
import { motion } from 'framer-motion'

const reviews = [
  { name: 'Priya Sharma',    city: 'Shimla',   rating: 5, text: 'Ordered an eggless chocolate cake — it was absolutely divine! So moist and perfectly sweet. Will order again!', avatar: '👩' },
  { name: 'Rahul Verma',     city: 'Delhi',    rating: 5, text: 'The photo cake came out exactly as I wanted. My daughter loved her birthday surprise. Delivery was right on time!', avatar: '👨' },
  { name: 'Anjali Mehta',    city: 'Chandigarh', rating: 5, text: 'Butterscotch heart-shaped cake for our anniversary. The packaging was gorgeous and the taste was heavenly!', avatar: '👩‍💼' },
  { name: 'Vikram Singh',    city: 'Manali',   rating: 5, text: 'Same-day delivery was a lifesaver. The custom message on the cake made my wife cry happy tears!', avatar: '👨‍💻' },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-body text-sm uppercase tracking-widest text-yumi-yellow font-bold">
            Happy Customers
          </span>
          <h2 className="font-display text-5xl text-cocoa mt-3">
            Baked with <em>Love</em>, Delivered with <em>Care</em>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex mb-3">
                {'★'.repeat(r.rating).split('').map((s, j) => (
                  <span key={j} className="text-yumi-yellow text-lg">{s}</span>
                ))}
              </div>
              <p className="font-body text-sm text-cocoa/70 leading-relaxed mb-4">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{r.avatar}</span>
                <div>
                  <p className="font-body font-bold text-cocoa text-sm">{r.name}</p>
                  <p className="font-body text-xs text-cocoa/40">{r.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}