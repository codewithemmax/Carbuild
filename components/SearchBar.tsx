"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchManufacturer from "./SearchManufacturer";
import { updateSearchParams } from "@/utils";

const SearchBar = () => {
  const router = useRouter();
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPathname = updateSearchParams("manufacturer", manufacturer.toLowerCase());
    const url = new URL(newPathname, window.location.origin);
    url.searchParams.set("model", model.toLowerCase());
    router.push(url.pathname + "?" + url.searchParams.toString());
  };

  return (
    <form onSubmit={handleSearch} className="searchbar">
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <button type="submit" className="absolute right-0 top-0 h-full px-4">
          <Image src="/magnifying-glass.svg" alt="search" width={40} height={40} className="object-contain" />
        </button>
      </div>

      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          alt="model"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan..."
          className="searchbar__input"
        />
        <button type="submit" className="absolute right-0 top-0 h-full px-4">
          <Image src="/magnifying-glass.svg" alt="search" width={40} height={40} className="object-contain" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
