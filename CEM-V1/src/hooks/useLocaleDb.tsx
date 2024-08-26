import { getLocaleDb } from "@/data/apiWrapper";
import { fetchEndpoint, fetchLocaleDb } from "@/data/serverWrapper";
import { useQuery } from "@tanstack/react-query";

export default function useLocaleDb() {
  const { data: localeDb } = useQuery({
    queryFn: fetchLocaleDb,
    queryKey: ["localeDb"],
  });

  return localeDb;
}
