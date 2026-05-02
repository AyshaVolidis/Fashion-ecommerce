import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  addItem: (product) => set((state) => {
    const existing = state.items.find(i => i._id === product._id);
    if (existing) {
      return { items: state.items.map(i => i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i) };
    }
    return { items: [...state.items, { ...product, quantity: 1 }] };
  }),
  removeItem: (id) => set((state) => ({ items: state.items.filter(i => i._id !== id) })),
  updateQuantity: (id, quantity) => set((state) => {
    if (quantity < 1) return state;
    return { items: state.items.map(i => i._id === id ? { ...i, quantity } : i) };
  }),
  clearCart: () => set({ items: [] }),
  getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0)
}));

export default useCartStore;
