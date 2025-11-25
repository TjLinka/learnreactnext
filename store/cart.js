"use client";
const { create } = require("zustand");
const { persist } = require("zustand/middleware")

const useCart = create(
  persist((set, get) => ({
    cart: [],
    addToCart: (product) => {
      set((state) => {
        if (state.cart.some((p) => p.id === product.id)) {
          alert("Product already in cart");
          return {};
        }
        return {
          cart: [...state.cart, product],
        };
      });
    },
    removeFromCart: (id) =>
      set((state) => ({
        cart: state.cart.filter((p) => p.id !== id),
      })),
    clearCart: () => set({ cart: [] }),
  }), {
    name: 'cart'
  })
);

export default useCart;

export const useTotalCartPrice = () => {
  const { cart } = useCart();
  return cart.reduce((acc, p) => acc + p.price, 0);
};
