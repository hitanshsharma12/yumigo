'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { buildWhatsAppMessage } from '../lib/watsapp'

export default function Cart() {
  const { items, isOpen, toggleCart, removeItem, total } = useCartStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm z-50 flex flex-col"
            style={{ background: '#FDF6EC' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: '#E8D5B7' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: '#7A1F6B' }}
                >
                  <ShoppingBag size={18} color="white" />
                </div>
                <div>
                  <h2
                    className="font-display text-lg font-bold leading-tight"
                    style={{ color: '#4A2C0A' }}
                  >
                    Your Cart
                  </h2>
                  <p className="text-xs" style={{ color: '#7B4F26' }}>
                    {items.length === 0
                      ? 'No items yet'
                      : `${items.length} item${items.length > 1 ? 's' : ''}`}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleCart}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-black/5"
                aria-label="Close cart"
              >
                <X size={20} color="#4A2C0A" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-full text-center py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="text-6xl mb-4">🎂</span>
                  <p
                    className="font-display text-xl font-bold mb-2"
                    style={{ color: '#4A2C0A' }}
                  >
                    Cart is empty
                  </p>
                  <p className="text-sm mb-6" style={{ color: '#7B4F26' }}>
                    Build your custom cake to get started
                  </p>
                  <a
                    href="#order"
                    onClick={toggleCart}
                    className="inline-flex items-center gap-2 font-bold text-sm px-5 py-3 rounded-full text-white transition-colors"
                    style={{ background: '#7A1F6B' }}
                  >
                    🎨 Build a Cake
                  </a>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-2xl overflow-hidden border"
                      style={{
                        background: 'white',
                        borderColor: '#E8D5B7',
                      }}
                    >
                      {/* Top: cake info */}
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          {/* Cake icon + details */}
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                              style={{ background: '#F5E8D0' }}
                            >
                              🎂
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className="font-bold text-sm capitalize leading-tight"
                                style={{ color: '#4A2C0A' }}
                              >
                                {item.cakeType} Cake
                              </p>
                              <p className="text-xs mt-0.5" style={{ color: '#7B4F26' }}>
                                {item.size} · {item.eggOption === 'eggless' ? '🌱 Eggless' : '🥚 With Egg'} · {item.shape}
                              </p>
                              {item.customMessage && (
                                <p
                                  className="text-xs mt-1 italic truncate"
                                  style={{ color: '#7A1F6B' }}
                                >
                                  ✍️ &quot;{item.customMessage}&quot;
                                </p>
                              )}
                              {item.addOns.length > 0 && (
                                <p className="text-xs mt-0.5 truncate" style={{ color: '#7B4F26' }}>
                                  + {item.addOns.map(a => a.replace('-', ' ')).join(', ')}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Price + delete */}
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <span
                              className="font-bold text-base"
                              style={{ color: '#F2A900' }}
                            >
                              ₹{item.totalPrice}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                              style={{ background: '#FEE2E2' }}
                              aria-label="Remove item"
                            >
                              <Trash2 size={13} color="#ef4444" />
                            </button>
                          </div>
                        </div>

                        {/* Delivery info */}
                        {item.deliveryDate && (
                          <div
                            className="mt-3 flex items-center gap-2 text-xs px-3 py-2 rounded-xl"
                            style={{ background: '#F5E8D0', color: '#7B4F26' }}
                          >
                            <span>📅</span>
                            <span>{item.deliveryDate} · {item.timeSlot}</span>
                            <span className="ml-auto">
                              {item.deliveryType === 'pickup' ? '🏪 Pickup' : '🚚 Delivery'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* WhatsApp button */}
                      <button
                        onClick={() => window.open(buildWhatsAppMessage(item), '_blank')}
                        className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white transition-colors"
                        style={{ background: '#25D366' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Order via WhatsApp
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer total */}
            {items.length > 0 && (
              <div
                className="px-5 py-4 border-t"
                style={{ borderColor: '#E8D5B7', background: '#FDF6EC' }}
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#7B4F26' }}>
                      Grand Total
                    </p>
                    <p className="font-display text-2xl font-bold" style={{ color: '#4A2C0A' }}>
                      ₹{total()}
                    </p>
                  </div>
                  <div className="text-right text-xs" style={{ color: '#7B4F26' }}>
                    <p>{items.length} cake{items.length > 1 ? 's' : ''}</p>
                    <p className="text-[#8FAF7E] font-bold">Free delivery on 2kg+</p>
                  </div>
                </div>
                <p className="text-center text-xs" style={{ color: '#7B4F26' }}>
                  Click &quot;Order via WhatsApp&quot; on each item to confirm
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}