import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Property } from "../backend";

export function useProperty(propertyId: string | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Property | null>({
    queryKey: ["property", propertyId],
    queryFn: async () => {
      if (!actor || !propertyId) return null;
      return actor.getProperty(propertyId);
    },
    enabled: !!actor && !isFetching && !!propertyId,
    staleTime: 10_000,
  });
}
