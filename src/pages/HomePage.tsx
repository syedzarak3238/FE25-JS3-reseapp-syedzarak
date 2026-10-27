import { useMemo } from "react";
import { useCountries } from "../hooks/useCountries";
import { useCountryFilters } from "../hooks/useCountryFilters";
import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";
import Pagination from "../components/Pagination";
import CountryCard from "../components/CountryCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const PAGE_SIZE = 12;

export default function HomePage() {
  const { data, isPending, isError, refetch } = useCountries();
  const { page, query, region, setPage, setQuery, setRegion } = useCountryFilters();

  // Filtrera i appen, inga nya API-anrop
  const filtered = useMemo(() => {
    if (!data) return [];
    const search = query.trim().toLowerCase();
    return data.filter((country) => {
      const matchesName = country.name.toLowerCase().includes(search);
      const matchesRegion = region === "All" || country.region === region;
      return matchesName && matchesRegion;
    });
  }, [data, query, region]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Länder</h1>
      <SearchBar value={query} onChange={setQuery} />
      <RegionFilter selected={region} onSelect={setRegion} />

      {isPending && <Spinner label="Hämtar länder..." />}
      {isError && <ErrorMessage message="Kunde inte hämta länderna." onRetry={() => refetch()} />}

      {data && filtered.length === 0 && <p>Inga länder matchar dina kriterier</p>}

      {data && filtered.length > 0 && (
        <>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((country) => (
              <CountryCard key={country.alpha3Code} country={country} />
            ))}
          </ul>
          <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
