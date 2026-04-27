"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { CarProps } from "@/types";
import { calculateCarRent, generateCarImageUrl } from "@/utils";

interface CompareModalProps {
  isOpen: boolean;
  closeModal: () => void;
  cars: CarProps[];
}

const fields: (keyof CarProps)[] = [
  "year", "city_mpg", "highway_mpg", "combination_mpg",
  "cylinders", "displacement", "drive", "fuel_type",
  "transmission", "class",
];

const CompareModal = ({ isOpen, closeModal, cars }: CompareModalProps) => {
  if (cars.length < 2) return null;
  const [carA, carB] = cars;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 shadow-xl">
                <button onClick={closeModal} className="absolute top-3 right-3 p-2 bg-primary-blue-100 rounded-full">
                  <Image src="/close.svg" alt="close" width={20} height={20} />
                </button>

                <h2 className="text-xl font-bold mb-6 text-center">Car Comparison</h2>

                <div className="grid grid-cols-2 gap-6">
                  {[carA, carB].map((car) => (
                    <div key={`${car.make}-${car.model}`} className="flex flex-col gap-3">
                      <div className="relative w-full h-36 bg-primary-blue-100 rounded-lg">
                        <Image src={generateCarImageUrl(car)} alt={car.model} fill className="object-contain" />
                      </div>
                      <h3 className="font-bold text-lg capitalize text-center">
                        {car.make} {car.model}
                      </h3>
                      <p className="text-center text-primary-blue font-extrabold text-2xl">
                        ${calculateCarRent(car.city_mpg, car.year)}<span className="text-sm font-medium text-grey">/day</span>
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-4">
                  {fields.map((field) => (
                    <div key={field} className="grid grid-cols-3 py-2 border-b last:border-0">
                      <span className="text-grey capitalize text-sm col-span-1 text-center">
                        {String(field).split("_").join(" ")}
                      </span>
                      <span className={`text-sm font-semibold text-center ${carA[field] > carB[field] ? "text-green-600" : ""}`}>
                        {String(carA[field])}
                      </span>
                      <span className={`text-sm font-semibold text-center ${carB[field] > carA[field] ? "text-green-600" : ""}`}>
                        {String(carB[field])}
                      </span>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CompareModal;
