import type { Country } from "../types/country";
import { formatNumber } from "../lib/format";

type Props = { country: Country };

export default function CountryFacts({ country }: Props) {
  const languages = country.languages?.map((language) => language.name).join(", ");
  const currencies = country.currencies
    ?.map((currency) => `${currency.name} (${currency.code})`)
    .join(", ");

  return (
    <section aria-labelledby="facts-heading" className="rounded border border-gray-300 bg-white p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img
          src={country.flags.svg}
          alt={`Flagga för ${country.name}`}
          className="h-24 w-40 object-cover"
        />
        <div>
          <h1 id="facts-heading" className="text-2xl font-bold">
            {country.name}
          </h1>
          <p>Eget namn: {country.nativeName}</p>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Fact label="Region" value={country.region} />
        <Fact label="Subregion" value={country.subregion} />
        <Fact label="Huvudstad" value={country.capital} />
        <Fact label="Befolkning" value={formatNumber(country.population)} />
        <Fact label="Språk" value={languages} />
        <Fact label="Valuta" value={currencies} />
      </dl>
    </section>
  );
}

function Fact({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="font-bold">{label}</dt>
      <dd>{value || "Okänt"}</dd>
    </div>
  );
}
