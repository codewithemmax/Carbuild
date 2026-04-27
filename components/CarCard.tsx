"use client";

import { useState } from "react";
import Image from "next/image";
import { CarProps } from "@/types";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import CarDetails from "./CarDetails";
import CustomButton from "./CustomButton";
import { useFavorites } from "@/context/FavoritesContext";
import { useCompare } from "@/context/CompareContext";

const CarCard = ({ car }: { car: CarProps }) => {
  const { make, model, transmission, drive, city_mpg, year } = car;
  const [isOpen, setIsOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isSelected, toggleCompare, compareList } = useCompare();

  const carRent = calculateCarRent(city_mpg, year);
  const carKey = `${make}-${model}-${year}`;
  const canAddCompare = compareList.length < 2 || isSelected(carKey);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
        <button
          onClick={() => toggleFavorite(carKey, car)}
          className="focus:outline-none"
          title={isFavorite(carKey) ? "Remove from favorites" : "Add to favorites"}
        >
          <Image
            src={isFavorite(carKey) ? "/heart-filled.svg" : "/heart-outline.svg"}
            alt="favorite"
            width={24}
            height={24}
            className="object-contain"
          />
        </button>
      </div>

      <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
        <span className="self-start text-[14px] leading-[17px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] leading-[17px] font-medium">/day</span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt={`${make} ${model}`}
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="car-card__icon-container">
          <div className="car-card__icon">
            <Image src="/steering-wheel.svg" width={20} height={20} alt="steering" />
            <p className="car-card__icon-text">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20} height={20} alt="drive" />
            <p className="car-card__icon-text">{drive.toUpperCase()}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="mpg" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            handleClick={() => setIsOpen(true)}
            rightIcon="/right-arrow.svg"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => canAddCompare && toggleCompare(carKey, car)}
          disabled={!canAddCompare}
          className={`text-xs px-3 py-1 rounded-full border transition-colors ${
            isSelected(carKey)
              ? "bg-primary-blue text-white border-primary-blue"
              : canAddCompare
              ? "border-gray-300 text-gray-600 hover:border-primary-blue hover:text-primary-blue"
              : "border-gray-200 text-gray-300 cursor-not-allowed"
          }`}
        >
          {isSelected(carKey) ? "✓ Compare" : "Compare"}
        </button>
      </div>

      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard;
