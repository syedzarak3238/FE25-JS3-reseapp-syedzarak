import { useQuery } from "@tanstack/react-query";
import { fetchWikipediaSummary } from "../api/wikipedia";

export function useWikipedia(title: string) {
  return useQuery({
    queryKey: ["wikipedia", title],
    queryFn: () => fetchWikipediaSummary(title),
  });
}
