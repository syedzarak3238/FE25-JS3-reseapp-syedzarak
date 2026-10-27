import { useSearchParams } from "react-router-dom";

type Changes = { page?: number; query?: string; region?: string };

// Läser och skriver sida, sökord och region i URL:en
export function useCountryFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const query = searchParams.get("query") ?? "";
  const region = searchParams.get("region") ?? "All";

  function update(changes: Changes, replace = false) {
    // Kopiera de gamla parametrarna så att övriga bevaras
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(changes)) {
      const isDefault =
        value === "" ||
        (key === "region" && value === "All") ||
        (key === "page" && value === 1);
      if (isDefault) {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    }
    setSearchParams(next, { replace });
  }

  return {
    page,
    query,
    region,
    setPage: (newPage: number) => update({ page: newPage }),
    // Ny sökning/region nollställer sidan till 1
    setQuery: (newQuery: string) => update({ query: newQuery, page: 1 }, true),
    setRegion: (newRegion: string) => update({ region: newRegion, page: 1 }),
  };
}
