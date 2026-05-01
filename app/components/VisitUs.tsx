'use client'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'

export default function VisitUs() {
  return (
    <section id="visit" className="py-24 bg-[#F5E8D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-body text-sm uppercase tracking-widest text-yumi-yellow font-bold">
            Find Us
          </span>
          <h2 className="font-display text-5xl text-cocoa mt-3">Visit Our Bakery 📍</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <motion.div
            className="rounded-3xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <iframe
              src="https://maps.google.com/maps?q=Shimla+Himachal+Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="YumiGo Bakery Location"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {[
              {
                Icon: MapPin,
                title: 'Address',
                lines: ['YumiGo Bakery, Mall Road', 'Shimla, Himachal Pradesh — 171001'],
              },
              {
                Icon: Phone,
                title: 'Call / WhatsApp',
                lines: ['+91 70187 96714'],
                link: 'tel:+917018796714',
              },
              {
                Icon: Clock,
                title: 'Opening Hours',
                lines: ['Mon – Sat: 9:00 AM – 9:00 PM', 'Sunday: 10:00 AM – 7:00 PM'],
              },
              {
                Icon: Mail,
                title: 'Email',
                lines: ['hello@yumigo.in'],
                link: 'mailto:hello@yumigo.in',
              },
            ].map(({ Icon, title, lines, link }) => (
              <div key={title} className="flex gap-5 bg-white rounded-2xl p-5 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-yumi-yellow/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-yumi-yellow" />
                </div>
                <div>
                  <p className="font-body font-bold text-cocoa text-sm uppercase tracking-wide mb-1">{title}</p>
                  {lines.map((l) =>
                    link ? (
                      <a key={l} href={link} className="font-body text-yumi-purple hover:underline block text-base">
                        {l}
                      </a>
                    ) : (
                      <p key={l} className="font-body text-cocoa/70 text-base">{l}</p>
                    )
                  )}
                </div>
              </div>
            ))}

            <motion.a
              href="https://wa.me/917018796714"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-body font-bold py-4 px-8 rounded-2xl transition-colors text-base shadow-lg"
            >
              💬 Chat on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}