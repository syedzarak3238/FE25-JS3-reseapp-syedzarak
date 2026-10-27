import type { Country } from "../types/country";
import { useWeather } from "../hooks/useWeather";
import { describeWeather } from "../lib/weatherCodes";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

type Props = { country: Country };

export default function WeatherCard({ country }: Props) {
  const { data, isPending, isError, refetch } = useWeather(country);

  return (
    <section aria-labelledby="weather-heading" className="rounded border border-gray-300 bg-white p-4">
      <h2 id="weather-heading" className="mb-2 text-xl font-bold">
        Väder{country.capital ? ` i ${country.capital}` : ""}
      </h2>
      {isPending && <Spinner label="Hämtar väder..." />}
      {isError && <ErrorMessage message="Kunde inte hämta vädret." onRetry={() => refetch()} />}
      {data && (
        <div>
          <p className="text-3xl">
            <span aria-hidden="true">{describeWeather(data.code).icon}</span>{" "}
            {Math.round(data.temperature)} °C
          </p>
          <p>{describeWeather(data.code).text}</p>
          <p>Vind: {data.windSpeed} km/h</p>
        </div>
      )}
    </section>
  );
}
