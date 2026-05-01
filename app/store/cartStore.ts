import { create } from 'zustand'
import { OrderItem } from '../types'   // ✅ FIXED PATH

interface CartState {
  items: OrderItem[]
  isOpen: boolean
  addItem: (item: OrderItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  toggleCart: () => void
  total: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  clearCart: () =>
    set({
      items: [],
    }),

  toggleCart: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),

  total: () =>
    get().items.reduce((acc, item) => acc + item.totalPrice, 0),
}))