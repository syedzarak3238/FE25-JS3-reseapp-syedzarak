import { useQuery } from "@tanstack/react-query";
import { fetchCountry } from "../api/countries";
import { NotFoundError } from "../api/errors";

export function useCountry(code: string) {
  return useQuery({
    queryKey: ["country", code],
    queryFn: () => fetchCountry(code),
    // Försök inte igen om landet helt enkelt inte finns
    retry: (failureCount, error) =>
      !(error instanceof NotFoundError) && failureCount < 1,
  });
}
