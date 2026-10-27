import type { Country } from "../types/country";
import type {
  ForecastResponse,
  GeocodingResponse,
  Weather,
} from "../types/weather";

// Försök hitta huvudstadens koordinater, annars använd landets latlng
async function findCoordinates(
  country: Country,
): Promise<[number, number] | null> {
  if (country.capital) {
    try {
      const url =
        "https://geocoding-api.open-meteo.com/v1/search" +
        `?name=${encodeURIComponent(country.capital)}` +
        `&countryCode=${country.alpha2Code}&count=1&language=sv`;
      const response = await fetch(url);
      if (response.ok) {
        const data = (await response.json()) as GeocodingResponse;
        const first = data.results?.[0];
        if (first) return [first.latitude, first.longitude];
      }
    } catch {
      // Ortssökningen misslyckades, vi faller tillbaka på latlng nedan
    }
  }
  return country.latlng ?? null;
}

export async function fetchWeather(country: Country): Promise<Weather> {
  const coordinates = await findCoordinates(country);
  if (!coordinates) {
    throw new Error("Inga koordinater hittades för landet.");
  }
  const [latitude, longitude] = coordinates;
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${latitude}&longitude=${longitude}` +
    "&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Kunde inte hämta vädret.");
  }
  const data = (await response.json()) as ForecastResponse;
  return {
    temperature: data.current.temperature_2m,
    windSpeed: data.current.wind_speed_10m,
    code: data.current.weather_code,
  };
}
