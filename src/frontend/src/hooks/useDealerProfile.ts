import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { DealerProfile } from "../backend";

export const DEALER_PROFILE_QUERY_KEY = ["dealerProfile"];

export function useDealerProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DealerProfile | null>({
    queryKey: DEALER_PROFILE_QUERY_KEY,
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDealerProfile();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useSetDealerProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, DealerProfile>({
    mutationFn: async (profile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setDealerProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEALER_PROFILE_QUERY_KEY });
    },
  });
}
