import type { Country, CountrySummary } from "../types/country";
import { NotFoundError } from "./errors";
import { wait } from "../lib/wait";

const BASE_URL = "https://countries.dev";

export async function fetchAllCountries(): Promise<CountrySummary[]> {
  await wait(4000);
  const response = await fetch(
    `${BASE_URL}/countries?fields=name,alpha3Code,region,capital,flags,population,area`,
  );
  if (!response.ok) {
    throw new Error("Kunde inte hämta länderna.");
  }
  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Oväntat svar från landsservern.");
  }
  return data as CountrySummary[];
}

export async function fetchCountry(code: string): Promise<Country> {
  await wait(4000);
  const response = await fetch(`${BASE_URL}/alpha/${encodeURIComponent(code)}`);
  if (response.status === 404 || response.status === 400) {
    throw new NotFoundError();
  }
  if (!response.ok) {
    throw new Error("Kunde inte hämta landet.");
  }
  const data: unknown = await response.json();
  // Ett felsvar saknar alpha3Code, då behandlar vi det som "hittades inte"
  if (typeof data !== "object" || data === null || !("alpha3Code" in data)) {
    throw new NotFoundError();
  }
  return data as Country;
}


