export type CakeType = 'chocolate' | 'strawberry' | 'pineapple' | 'butterscotch'
export type EggOption = 'egg' | 'eggless'
export type SizeOption = '500g' | '1kg' | '2kg'
export type ShapeOption = 'round' | 'square' | 'heart'
export type DeliveryType = 'pickup' | 'delivery'
export type TimeSlot = 'morning' | 'afternoon' | 'evening'
export type AddOn = 'candles' | 'knife' | 'birthday-cap' | 'greeting-card'

export interface OrderItem {
  id: string
  cakeType: CakeType
  eggOption: EggOption
  size: SizeOption
  shape: ShapeOption
  customMessage: string
  addOns: AddOn[]
  photoUpload: boolean
  deliveryDate: string
  timeSlot: TimeSlot
  deliveryType: DeliveryType
  address: string
  deliveryInstructions: string
  customerName: string
  customerPhone: string
  totalPrice: number
}

export const PRICES: Record<SizeOption, number> = {
  '500g': 549,
  '1kg':  999,
  '2kg': 1749,
}

export const ADDON_PRICES: Record<AddOn, number> = {
  'candles':       49,
  'knife':         29,
  'birthday-cap':  39,
  'greeting-card': 59,
}

export const CAKE_LABELS: Record<CakeType, { emoji: string; label: string; desc: string }> = {
  chocolate:    { emoji: '🎂', label: 'Chocolate',    desc: 'Rich dark Belgian chocolate' },
  strawberry:   { emoji: '🍓', label: 'Strawberry',   desc: 'Fresh strawberry cream' },
  pineapple:    { emoji: '🍍', label: 'Pineapple',    desc: 'Tropical pineapple delight' },
  butterscotch: { emoji: '🍰', label: 'Butterscotch', desc: 'Classic caramel butterscotch' },
}