import { Link, useLocation, useParams } from "react-router-dom";
import { useCountry } from "../hooks/useCountry";
import { NotFoundError } from "../api/errors";
import CountryFacts from "../components/CountryFacts";
import WeatherCard from "../components/WeatherCard";
import WikipediaCard from "../components/WikipediaCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

export default function CountryPage() {
  const { code = "" } = useParams();
  const { search } = useLocation(); // sök/filter/sida från listan
  const { data, isPending, isError, error, refetch } = useCountry(code);

  const backLink = (
    <Link to={{ pathname: "/", search }} className="text-blue-700 underline">
      ← Tillbaka till listan
    </Link>
  );

  if (isPending) {
    return (
      <div className="flex flex-col gap-4">
        {backLink}
        <Spinner label="Wait while we load the destination information..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-4">
        {backLink}
        {error instanceof NotFoundError ? (
          <h1 className="text-2xl font-bold">Landet hittades inte</h1>
        ) : (
          <ErrorMessage message="Kunde inte hämta landet." onRetry={() => refetch()} />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {backLink}
      <CountryFacts country={data} />
      <WeatherCard country={data} />
      <WikipediaCard title={data.name} />
    </div>
  );
}
