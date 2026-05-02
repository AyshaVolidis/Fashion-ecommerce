import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavoriteStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (product) => set((state) => {
        if (!state.favorites.find(f => f._id === product._id)) {
          return { favorites: [...state.favorites, product] };
        }
        return state;
      }),
      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter(f => f._id !== id)
      })),
      toggleFavorite: (product) => set((state) => {
        const isFav = state.favorites.find(f => f._id === product._id);
        if (isFav) {
          return { favorites: state.favorites.filter(f => f._id !== product._id) };
        }
        return { favorites: [...state.favorites, product] };
      }),
      isFavorite: (id) => !!get().favorites.find(f => f._id === id)
    }),
    {
      name: 'favorite-storage', // saved in localStorage
    }
  )
);

export default useFavoriteStore;
