import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  AddPartnerInput,
  BuilderPartner,
  UpdatePartnerInput,
} from "../backend";

export const PARTNERS_QUERY_KEY = ["partners"];

export function usePartners() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BuilderPartner[]>({
    queryKey: PARTNERS_QUERY_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPartners();
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
  });
}

export function usePartner(partnerId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BuilderPartner | null>({
    queryKey: ["partner", partnerId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPartner(partnerId);
    },
    enabled: !!actor && !isFetching && !!partnerId,
    staleTime: 60_000,
  });
}

export function useAddPartner() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<string, Error, AddPartnerInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addPartner(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARTNERS_QUERY_KEY });
    },
  });
}

export function useUpdatePartner() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    void,
    Error,
    { partnerId: string; input: UpdatePartnerInput }
  >({
    mutationFn: async ({ partnerId, input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updatePartner(partnerId, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARTNERS_QUERY_KEY });
    },
  });
}

export function useDeletePartner() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (partnerId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deletePartner(partnerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARTNERS_QUERY_KEY });
    },
  });
}
