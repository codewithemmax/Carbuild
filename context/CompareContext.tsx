"use client";

import { createContext, useContext, useState } from "react";
import { CarProps } from "@/types";

interface CompareItem { key: string; car: CarProps }
interface CompareCtx {
  compareList: CompareItem[];
  isSelected: (key: string) => boolean;
  toggleCompare: (key: string, car: CarProps) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareCtx>({
  compareList: [],
  isSelected: () => false,
  toggleCompare: () => {},
  clearCompare: () => {},
});

export const CompareProvider = ({ children }: { children: React.ReactNode }) => {
  const [compareList, setCompareList] = useState<CompareItem[]>([]);

  const toggleCompare = (key: string, car: CarProps) => {
    setCompareList((prev) => {
      if (prev.some((c) => c.key === key)) return prev.filter((c) => c.key !== key);
      if (prev.length >= 2) return prev;
      return [...prev, { key, car }];
    });
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        isSelected: (k) => compareList.some((c) => c.key === k),
        toggleCompare,
        clearCompare: () => setCompareList([]),
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
