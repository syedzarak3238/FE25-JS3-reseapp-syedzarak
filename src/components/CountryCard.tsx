import { Link, useLocation } from "react-router-dom";
import type { CountrySummary } from "../types/country";

type Props = { country: CountrySummary };

export default function CountryCard({ country }: Props) {
  // Vi tar med sök/filter/sida i länken så "Tillbaka" kan återskapa vyn
  const { search } = useLocation();

  return (
    <li>
      <Link
        to={`/country/${country.alpha3Code}${search}`}
        className="flex h-full items-center gap-4 rounded border border-gray-300 bg-white p-3 hover:bg-blue-50"
      >
        <img
          src={country.flags.svg}
          alt={`Flagga för ${country.name}`}
          className="h-12 w-20 object-cover"
        />
        <div>
          <h2 className="font-bold">{country.name}</h2>
          <p className="text-sm">Region: {country.region}</p>
          {country.capital && <p className="text-sm">Huvudstad: {country.capital}</p>}
        </div>
      </Link>
    </li>
  );
}
