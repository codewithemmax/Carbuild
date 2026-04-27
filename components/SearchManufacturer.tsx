"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { manufacturers } from "@/constant";
import { SearchManuFacturerProps } from "@/types";

const SearchManufacturer = ({ manufacturer, setManufacturer }: SearchManuFacturerProps) => {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={(val) => setManufacturer(val ?? "")}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image src="/car-logo.svg" width={20} height={20} className="ml-4" alt="car logo" />
          </Combobox.Button>

          <Combobox.Input
            className="search-manufacturer__input"
            displayValue={(item: string) => item}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Volkswagen..."
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="search-manufacturer__options absolute z-10">
              {filtered.length === 0 && query !== "" ? (
                <Combobox.Option value={query} className="search-manufacturer__option">
                  Create &quot;{query}&quot;
                </Combobox.Option>
              ) : (
                filtered.map((item) => (
                  <Combobox.Option
                    key={item}
                    value={item}
                    className={({ active }) =>
                      `search-manufacturer__option ${active ? "bg-primary-blue text-white" : "text-gray-900"}`
                    }
                  >
                    {({ selected }) => (
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {item}
                      </span>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
