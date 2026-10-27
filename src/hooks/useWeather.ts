import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../api/weather";
import type { Country } from "../types/country";

export function useWeather(country: Country) {
  return useQuery({
    queryKey: ["weather", country.alpha3Code],
    queryFn: () => fetchWeather(country),
    staleTime: 10 * 60 * 1000, // väder blir gammalt snabbare
  });
}
