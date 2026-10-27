import { useWikipedia } from "../hooks/useWikipedia";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

type Props = { title: string };

export default function WikipediaCard({ title }: Props) {
  const { data, isPending, isError, refetch } = useWikipedia(title);

  return (
    <section aria-labelledby="wiki-heading" className="rounded border border-gray-300 bg-white p-4">
      <h2 id="wiki-heading" className="mb-2 text-xl font-bold">
        Om {title}
      </h2>
      {isPending && <Spinner label="Hämtar text från Wikipedia..." />}
      {isError && (
        <ErrorMessage message="Kunde inte hämta text från Wikipedia." onRetry={() => refetch()} />
      )}
      {data && (
        <div>
          {data.thumbnail && (
            <img
              src={data.thumbnail.source}
              alt={`Bild som illustrerar ${data.title}`}
              className="mb-3 max-w-full rounded"
            />
          )}
          <p>{data.extract}</p>
          <p className="mt-3 text-sm">
            Källa: Wikipedia.{" "}
            <a
              href={data.content_urls.desktop.page}
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline"
            >
              Läs hela artikeln
            </a>
          </p>
        </div>
      )}
    </section>
  );
}
