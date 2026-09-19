import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const items = state.items || [];
          const existingItem = items.find((i) => i._id === item._id);
          if (existingItem) {
            return {
              items: items.map((i) =>
                i._id === item._id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...items, item] };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: (state.items || []).filter((i) => i._id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: (state.items || []).map((i) =>
            i._id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        const items = get().items || [];
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        const items = get().items || [];
        return items.reduce((total, item) => {
          const price = item.discountPrice || item.price;
          return total + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'basic-need-cart',
    }
  )
);
