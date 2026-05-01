'use client'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'
import {
  CakeType, EggOption, SizeOption, ShapeOption, DeliveryType,
  TimeSlot, AddOn, OrderItem, PRICES, ADDON_PRICES, CAKE_LABELS
} from '../types'
import { useCartStore } from '../store/cartStore'
import { buildWhatsAppMessage } from '../lib/watsapp'

const SHAPES: { value: ShapeOption; label: string; emoji: string }[] = [
  { value: 'round',  label: 'Round',  emoji: '⭕' },
  { value: 'square', label: 'Square', emoji: '⬜' },
  { value: 'heart',  label: 'Heart',  emoji: '❤️' },
]

const ADDONS: { value: AddOn; label: string; emoji: string; price: number }[] = [
  { value: 'candles',       label: 'Candles',       emoji: '🕯️', price: 49 },
  { value: 'knife',         label: 'Knife',         emoji: '🔪', price: 29 },
  { value: 'birthday-cap',  label: 'Birthday Cap',  emoji: '🎉', price: 39 },
  { value: 'greeting-card', label: 'Greeting Card', emoji: '💌', price: 59 },
]

const TIME_SLOTS: { value: TimeSlot; label: string }[] = [
  { value: 'morning',   label: '🌅 Morning (9am–12pm)' },
  { value: 'afternoon', label: '☀️ Afternoon (12pm–5pm)' },
  { value: 'evening',   label: '🌆 Evening (5pm–9pm)' },
]

function calcTotal(size: SizeOption, addOns: AddOn[], photoUpload: boolean): number {
  return PRICES[size]
    + addOns.reduce((s, a) => s + ADDON_PRICES[a], 0)
    + (photoUpload ? 299 : 0)
}

// Reusable section heading
function SectionHeading({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#7A1F6B] text-white text-sm font-bold flex items-center justify-center">
        {step}
      </span>
      <h3 className="font-display text-lg sm:text-xl text-[#4A2C0A] font-semibold">{title}</h3>
    </div>
  )
}

// Divider
function Divider() {
  return <div className="border-t border-[#F5E8D0]" />
}

export default function OrderBuilder() {
  const [cakeType,    setCakeType]    = useState<CakeType>('chocolate')
  const [eggOption,   setEggOption]   = useState<EggOption>('eggless')
  const [size,        setSize]        = useState<SizeOption>('1kg')
  const [shape,       setShape]       = useState<ShapeOption>('round')
  const [message,     setMessage]     = useState('')
  const [addOns,      setAddOns]      = useState<AddOn[]>([])
  const [photoUpload, setPhotoUpload] = useState(false)
  const [photoFile,   setPhotoFile]   = useState<File | null>(null)
  const [delivDate,   setDelivDate]   = useState('')
  const [timeSlot,    setTimeSlot]    = useState<TimeSlot>('evening')
  const [delivType,   setDelivType]   = useState<DeliveryType>('delivery')
  const [address,     setAddress]     = useState('')
  const [instruc,     setInstruc]     = useState('')
  const [name,        setName]        = useState('')
  const [phone,       setPhone]       = useState('')

  const { addItem } = useCartStore()
  const total = calcTotal(size, addOns, photoUpload)

  const toggleAddOn = (a: AddOn) =>
    setAddOns(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])

  const handleOrder = useCallback(() => {
    if (!name.trim() || !phone.trim()) {
      toast.error('Please fill in your name and phone number')
      return
    }
    if (delivType === 'delivery' && !address.trim()) {
      toast.error('Please enter your delivery address')
      return
    }
    const item: OrderItem = {
      id: uuidv4(),
      cakeType, eggOption, size, shape,
      customMessage: message,
      addOns, photoUpload,
      deliveryDate: delivDate,
      timeSlot,
      deliveryType: delivType,
      address,
      deliveryInstructions: instruc,
      customerName: name,
      customerPhone: phone,
      totalPrice: total,
    }
    addItem(item)
    toast.success('Order placed! Opening WhatsApp... 🎂')
    setTimeout(() => {
      window.open(buildWhatsAppMessage(item), '_blank')
    }, 500)
  }, [cakeType, eggOption, size, shape, message, addOns, photoUpload,
      delivDate, timeSlot, delivType, address, instruc, name, phone, total, addItem])

  return (
    <section id="order" className="py-16 sm:py-24" style={{ background: '#F5E8D0' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#F2A900] bg-[#F2A900]/10 px-4 py-1.5 rounded-full mb-3">
            Custom Order
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-[#4A2C0A] font-bold">
            Build Your Dream Cake 🎨
          </h2>
          <p className="mt-3 text-[#7B4F26] text-sm sm:text-base">
            Customise every detail — we bake it fresh, just for you.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

        {/* ── STEP 1: Cake Flavour ── */}
<div className="p-4 sm:p-6 md:p-8">
  <SectionHeading step={1} title="Choose Cake Flavour" />

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {(Object.entries(CAKE_LABELS) as [CakeType, typeof CAKE_LABELS[CakeType]][]).map(([k, v]) => (
      <motion.button
        key={k}
        onClick={() => setCakeType(k)}
        whileTap={{ scale: 0.97 }}
        className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
          cakeType === k
            ? 'border-[#7A1F6B] bg-[#7A1F6B]/8 shadow-sm'
            : 'border-[#E8D5B7] bg-[#FDFAF5] hover:border-[#F2A900]'
        }`}
      >
        <span className="text-2xl flex-shrink-0">{v.emoji}</span>

        <div className="flex-1">
          <p className={`font-bold text-sm leading-tight ${
            cakeType === k ? 'text-[#7A1F6B]' : 'text-[#4A2C0A]'
          }`}>
            {v.label}
          </p>

          <p className="text-xs text-[#7B4F26]/70 leading-snug">
            {v.desc}
          </p>
        </div>

        {cakeType === k && (
          <span className="ml-auto flex-shrink-0 w-5 h-5 rounded-full bg-[#7A1F6B] flex items-center justify-center">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
      </motion.button>
    ))}
  </div>
</div>

          <Divider />

          {/* ── STEP 2: Egg Option ── */}
          <div className="p-6 sm:p-8">
            <SectionHeading step={2} title="Egg Preference" />
            <div className="grid grid-cols-2 gap-3">
              {(['egg', 'eggless'] as EggOption[]).map(opt => (
                <motion.button
                  key={opt}
                  onClick={() => setEggOption(opt)}
                  whileTap={{ scale: 0.97 }}
                  className={`py-4 px-5 rounded-2xl border-2 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    eggOption === opt
                      ? 'border-[#7A1F6B] bg-[#7A1F6B] text-white shadow-md'
                      : 'border-[#E8D5B7] bg-[#FDFAF5] text-[#4A2C0A] hover:border-[#F2A900]'
                  }`}
                >
                  <span className="text-xl">{opt === 'egg' ? '🥚' : '🌱'}</span>
                  <span>{opt === 'egg' ? 'With Egg' : 'Eggless'}</span>
                </motion.button>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#7B4F26]/60 flex items-center gap-1.5">
              <span className="text-[#F2A900]">★</span>
              Eggless cakes are equally moist & delicious — very popular choice!
            </p>
          </div>

          <Divider />

          {/* ── STEP 3: Size ── */}
          <div className="p-6 sm:p-8">
            <SectionHeading step={3} title="Select Size" />
            <div className="grid grid-cols-3 gap-3">
              {([
                { s: '500g' as SizeOption, serves: 'Serves 4–6',  note: 'Small' },
                { s: '1kg'  as SizeOption, serves: 'Serves 8–10', note: 'Most Popular' },
                { s: '2kg'  as SizeOption, serves: 'Serves 16+',  note: 'Party Size' },
              ]).map(({ s, serves, note }) => (
                <motion.button
                  key={s}
                  onClick={() => setSize(s)}
                  whileTap={{ scale: 0.96 }}
                  className={`py-4 px-3 rounded-2xl border-2 transition-all duration-200 text-center relative overflow-hidden ${
                    size === s
                      ? 'border-[#F2A900] bg-[#F2A900] text-white shadow-md'
                      : 'border-[#E8D5B7] bg-[#FDFAF5] text-[#4A2C0A] hover:border-[#F2A900]'
                  }`}
                >
                  {note === 'Most Popular' && size !== s && (
                    <span className="absolute top-1.5 right-1.5 text-[9px] font-bold bg-[#7A1F6B] text-white px-1.5 py-0.5 rounded-full leading-none">
                      TOP
                    </span>
                  )}
                  <p className="font-bold text-base">{s}</p>
                  <p className={`text-xs mt-0.5 font-bold ${size === s ? 'text-white' : 'text-[#F2A900]'}`}>
                    ₹{PRICES[s]}
                  </p>
                  <p className={`text-xs mt-1 ${size === s ? 'text-white/80' : 'text-[#7B4F26]/60'}`}>
                    {serves}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          <Divider />

          {/* ── STEP 4: Shape ── */}
          <div className="p-6 sm:p-8">
            <SectionHeading step={4} title="Cake Shape" />
            <div className="grid grid-cols-3 gap-3">
              {SHAPES.map(sh => (
                <motion.button
                  key={sh.value}
                  onClick={() => setShape(sh.value)}
                  whileTap={{ scale: 0.96 }}
                  className={`py-5 rounded-2xl border-2 transition-all duration-200 text-center ${
                    shape === sh.value
                      ? 'border-[#7A1F6B] bg-[#7A1F6B]/8 text-[#7A1F6B]'
                      : 'border-[#E8D5B7] bg-[#FDFAF5] text-[#4A2C0A] hover:border-[#F2A900]'
                  }`}
                >
                  <span className="text-3xl block mb-1.5">{sh.emoji}</span>
                  <span className={`text-sm font-bold ${shape === sh.value ? 'text-[#7A1F6B]' : 'text-[#4A2C0A]'}`}>
                    {sh.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <Divider />

          {/* ── STEP 5: Custom Message ── */}
          <div className="p-6 sm:p-8">
            <SectionHeading step={5} title="Message on Cake" />
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder='e.g. "Happy Birthday Rahul 🎉"'
                maxLength={60}
                className="w-full border-2 border-[#E8D5B7] bg-[#FDFAF5] rounded-2xl px-5 py-4 text-[#4A2C0A] text-sm focus:outline-none focus:border-[#F2A900] transition-colors placeholder-[#7B4F26]/30"
              />
              <span className="absolute right-4 bottom-3.5 text-xs text-[#7B4F26]/40">
                {message.length}/60
              </span>
            </div>
            <p className="mt-2 text-xs text-[#7B4F26]/50">Leave blank if no message needed.</p>
          </div>

          <Divider />

          {/* ── STEP 6: Add-ons ── */}
          <div className="p-6 sm:p-8">
            <SectionHeading step={6} title="Add-ons" />
            <div className="grid grid-cols-2 gap-3">
              {ADDONS.map(a => {
                const selected = addOns.includes(a.value)
                return (
                  <motion.button
                    key={a.value}
                    onClick={() => toggleAddOn(a.value)}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                      selected
                        ? 'border-[#8FAF7E] bg-[#8FAF7E]/10'
                        : 'border-[#E8D5B7] bg-[#FDFAF5] hover:border-[#F2A900]'
                    }`}
                  >
                    <span className="text-2xl flex-shrink-0">{a.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm ${selected ? 'text-[#4A7C36]' : 'text-[#4A2C0A]'}`}>
                        {a.label}
                      </p>
                      <p className="text-xs text-[#F2A900] font-bold">+₹{a.price}</p>
                    </div>
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      selected ? 'bg-[#8FAF7E] border-[#8FAF7E]' : 'border-[#D5C4A8]'
                    }`}>
                      {selected && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          <Divider />

          {/* ── STEP 7: Photo Cake ── */}
          <div className="p-6 sm:p-8">
            <SectionHeading step={7} title="Photo Cake (Optional)" />
            <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-[#E8D5B7] bg-[#FDFAF5] mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📸</span>
                <div>
                  <p className="font-bold text-sm text-[#4A2C0A]">Print your photo on the cake</p>
                  <p className="text-xs text-[#F2A900] font-bold">+₹299 extra</p>
                </div>
              </div>
              <button
                onClick={() => setPhotoUpload(!photoUpload)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 flex-shrink-0 ${
                  photoUpload ? 'bg-[#7A1F6B]' : 'bg-[#D5C4A8]'
                }`}
              >
                <motion.span
                  animate={{ x: photoUpload ? 24 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                />
              </button>
            </div>

            <AnimatePresence>
              {photoUpload && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#F2A900] rounded-2xl p-8 cursor-pointer hover:bg-[#F2A900]/5 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => setPhotoFile(e.target.files?.[0] || null)}
                    />
                    {photoFile ? (
                      <div className="text-center">
                        <p className="text-3xl mb-2">✅</p>
                        <p className="font-bold text-sm text-[#4A7C36]">{photoFile.name}</p>
                        <p className="text-xs text-[#7B4F26]/50 mt-1">Tap to change photo</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-4xl mb-3">🖼️</p>
                        <p className="font-bold text-sm text-[#4A2C0A]">Tap to upload photo</p>
                        <p className="text-xs text-[#7B4F26]/50 mt-1">JPG, PNG supported</p>
                      </div>
                    )}
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Divider />

          {/* ── STEP 8: Delivery Date & Time ── */}
          <div className="p-6 sm:p-8">
            <SectionHeading step={8} title="Delivery Date & Time" />
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#7B4F26] uppercase tracking-wide mb-2">
                  📅 Select Date
                </label>
                <input
                  type="date"
                  value={delivDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setDelivDate(e.target.value)}
                  className="w-full border-2 border-[#E8D5B7] bg-[#FDFAF5] rounded-2xl px-5 py-3.5 text-[#4A2C0A] text-sm focus:outline-none focus:border-[#F2A900] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#7B4F26] uppercase tracking-wide mb-3">
                  🕒 Select Time Slot
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {TIME_SLOTS.map(ts => (
                    <label
                      key={ts.value}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                        timeSlot === ts.value
                          ? 'border-[#7A1F6B] bg-[#7A1F6B]/8'
                          : 'border-[#E8D5B7] bg-[#FDFAF5] hover:border-[#F2A900]'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        timeSlot === ts.value
                          ? 'border-[#7A1F6B] bg-[#7A1F6B]'
                          : 'border-[#D5C4A8]'
                      }`}>
                        {timeSlot === ts.value && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name="timeslot"
                        value={ts.value}
                        checked={timeSlot === ts.value}
                        onChange={() => setTimeSlot(ts.value)}
                        className="hidden"
                      />
                      <span className={`text-sm font-medium ${timeSlot === ts.value ? 'text-[#7A1F6B] font-bold' : 'text-[#4A2C0A]'}`}>
                        {ts.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── STEP 9: Delivery Type ── */}
          <div className="p-6 sm:p-8">
            <SectionHeading step={9} title="Delivery Type" />
            <div className="grid grid-cols-2 gap-3 mb-4">
              {(['pickup', 'delivery'] as DeliveryType[]).map(d => (
                <motion.button
                  key={d}
                  onClick={() => setDelivType(d)}
                  whileTap={{ scale: 0.97 }}
                  className={`py-4 px-4 rounded-2xl border-2 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    delivType === d
                      ? 'border-[#7A1F6B] bg-[#7A1F6B] text-white shadow-md'
                      : 'border-[#E8D5B7] bg-[#FDFAF5] text-[#4A2C0A] hover:border-[#F2A900]'
                  }`}
                >
                  <span className="text-xl">{d === 'pickup' ? '🏪' : '🚚'}</span>
                  <span>{d === 'pickup' ? 'Store Pickup' : 'Home Delivery'}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {delivType === 'delivery' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <textarea
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Enter full delivery address with landmark..."
                    rows={3}
                    className="w-full border-2 border-[#E8D5B7] bg-[#FDFAF5] rounded-2xl px-5 py-4 text-[#4A2C0A] text-sm focus:outline-none focus:border-[#F2A900] transition-colors placeholder-[#7B4F26]/30 resize-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Divider />

          {/* ── STEP 10: Delivery Instructions ── */}
          <div className="p-6 sm:p-8">
            <SectionHeading step={10} title="Delivery Instructions" />
            <div className="flex flex-wrap gap-2 mb-3">
              {['Call before delivery', 'Leave at door', 'Handle with care', 'Ring doorbell'].map(hint => (
                <button
                  key={hint}
                  onClick={() => setInstruc(hint)}
                  className={`text-xs font-medium px-3 py-2 rounded-full border transition-colors ${
                    instruc === hint
                      ? 'border-[#F2A900] bg-[#F2A900]/10 text-[#7B4F26]'
                      : 'border-[#E8D5B7] text-[#7B4F26]/70 hover:border-[#F2A900] bg-[#FDFAF5]'
                  }`}
                >
                  {hint}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={instruc}
              onChange={e => setInstruc(e.target.value)}
              placeholder="Or type custom instructions..."
              className="w-full border-2 border-[#E8D5B7] bg-[#FDFAF5] rounded-2xl px-5 py-3.5 text-[#4A2C0A] text-sm focus:outline-none focus:border-[#F2A900] transition-colors placeholder-[#7B4F26]/30"
            />
          </div>

          <Divider />

          {/* ── STEP 11: Customer Details ── */}
          <div className="p-6 sm:p-8">
            <SectionHeading step={11} title="Your Details" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#7B4F26] uppercase tracking-wide mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full border-2 border-[#E8D5B7] bg-[#FDFAF5] rounded-2xl px-5 py-3.5 text-[#4A2C0A] text-sm focus:outline-none focus:border-[#F2A900] transition-colors placeholder-[#7B4F26]/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#7B4F26] uppercase tracking-wide mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full border-2 border-[#E8D5B7] bg-[#FDFAF5] rounded-2xl px-5 py-3.5 text-[#4A2C0A] text-sm focus:outline-none focus:border-[#F2A900] transition-colors placeholder-[#7B4F26]/30"
                />
              </div>
            </div>
          </div>

          {/* ── PRICE SUMMARY + ORDER BUTTON ── */}
          <div className="p-6 sm:p-8 bg-[#4A2C0A] rounded-b-3xl">
            {/* Breakdown */}
            <div className="bg-white/10 rounded-2xl p-4 mb-5 space-y-2">
              <div className="flex justify-between text-sm text-white/70">
                <span>Base price ({size})</span>
                <span>₹{PRICES[size]}</span>
              </div>
              {addOns.length > 0 && (
                <div className="flex justify-between text-sm text-white/70">
                  <span>Add-ons ({addOns.length} items)</span>
                  <span>+₹{addOns.reduce((s, a) => s + ADDON_PRICES[a], 0)}</span>
                </div>
              )}
              {photoUpload && (
                <div className="flex justify-between text-sm text-white/70">
                  <span>Photo cake</span>
                  <span>+₹299</span>
                </div>
              )}
              <div className="border-t border-white/20 pt-2 flex justify-between">
                <span className="font-bold text-white">Total</span>
                <motion.span
                  key={total}
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  className="font-bold text-[#F2A900] text-xl"
                >
                  ₹{total}
                </motion.span>
              </div>
            </div>

            {/* WhatsApp Button */}
            <motion.button
              onClick={handleOrder}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-base py-5 rounded-2xl flex items-center justify-center gap-3 transition-colors duration-200 shadow-lg"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order via WhatsApp
              <span className="text-xs font-normal bg-white/20 px-3 py-1 rounded-full">
                Instant Confirm
              </span>
            </motion.button>

            <p className="text-center text-white/40 text-xs mt-3">
              You&apos;ll be redirected to WhatsApp with your full order details
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}