"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CarProps } from "@/types";

interface FavItem { key: string; car: CarProps }
interface FavCtx {
  favorites: FavItem[];
  isFavorite: (key: string) => boolean;
  toggleFavorite: (key: string, car: CarProps) => void;
}

const FavoritesContext = createContext<FavCtx>({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
});

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<FavItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("car-favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (key: string, car: CarProps) => {
    setFavorites((prev) => {
      const next = prev.some((f) => f.key === key)
        ? prev.filter((f) => f.key !== key)
        : [...prev, { key, car }];
      localStorage.setItem("car-favorites", JSON.stringify(next));
      return next;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite: (k) => favorites.some((f) => f.key === k), toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
