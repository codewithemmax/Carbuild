import { Hero, CarCard, CustomFilter, SearchBar, ShowMore } from "@/components";
import { fetchCars } from "@/utils";
import { HomeProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constant";

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const allCars = await fetchCars({
    manufacturer: params.manufacturer || "",
    year: params.year || 2022,
    fuel: params.fuel || "",
    limit: params.limit || 10,
    model: params.model || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.map((car, i) => (
                <CarCard key={i} car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(params.limit || 10) / 10}
              isNext={(params.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results!</h2>
            <p>{allCars?.message || "No cars found for your search."}</p>
          </div>
        )}
      </div>
    </main>
  );
}
