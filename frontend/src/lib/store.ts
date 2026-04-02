import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './mock';

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
  frame: string;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, frame: string) => void;
  updateQuantity: (productId: string, size: string, frame: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (newItem) => set((state) => {
        const existingItemIndex = state.items.findIndex(
          (item) => 
            item?.product?.id === newItem.product.id && 
            item.size === newItem.size && 
            item.frame === newItem.frame
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...state.items];
          // Ensure product exists before updating quantity
          if (updatedItems[existingItemIndex]?.product) {
            updatedItems[existingItemIndex].quantity += newItem.quantity;
            return { items: updatedItems, isOpen: true };
          }
        }

        return { items: [...state.items, newItem], isOpen: true };
      }),
      removeItem: (productId, size, frame) => set((state) => ({
        items: state.items.filter(
          (item) => !(item?.product?.id === productId && item.size === size && item.frame === frame)
        )
      })),
      updateQuantity: (productId, size, frame, quantity) => set((state) => ({
        items: state.items.map((item) => 
          (item?.product?.id === productId && item.size === size && item.frame === frame)
            ? { ...item, quantity }
            : item
        )
      })),
      clearCart: () => set({ items: [] }),
      setIsOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: 'framedrop-cart',
    }
  )
);
