"use client";

import { useState } from "react";
import Image from "next/image";
import { useCompare } from "@/context/CompareContext";
import { generateCarImageUrl } from "@/utils";
import CompareModal from "./CompareModal";

const CompareBar = () => {
  const { compareList, clearCompare } = useCompare();
  const [isOpen, setIsOpen] = useState(false);

  if (compareList.length === 0) return null;

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-6 border border-gray-100">
        <div className="flex items-center gap-3">
          {compareList.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <div className="relative w-16 h-10 bg-primary-blue-100 rounded-lg">
                <Image src={generateCarImageUrl(item.car)} alt={item.car.model} fill className="object-contain" />
              </div>
              <span className="text-sm font-semibold capitalize">
                {item.car.make} {item.car.model}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {compareList.length === 2 && (
            <button
              onClick={() => setIsOpen(true)}
              className="bg-primary-blue text-white text-sm px-4 py-2 rounded-full hover:opacity-90 transition"
            >
              Compare Now
            </button>
          )}
          <button
            onClick={clearCompare}
            className="text-sm px-4 py-2 rounded-full border border-gray-300 hover:border-red-400 hover:text-red-500 transition"
          >
            Clear
          </button>
        </div>
      </div>

      <CompareModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        cars={compareList.map((i) => i.car)}
      />
    </>
  );
};

export default CompareBar;
