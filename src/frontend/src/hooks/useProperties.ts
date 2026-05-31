import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  AddPropertyInput,
  ExternalBlob,
  Property,
  PropertyStatus,
  UpdatePropertyInput,
} from "../backend";

export const PROPERTIES_QUERY_KEY = ["properties"];

export function useProperties() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Property[]>({
    queryKey: PROPERTIES_QUERY_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProperties();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
    staleTime: 10_000,
  });
}

export function useAddProperty() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<string, Error, AddPropertyInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addProperty(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
  });
}

export function useUpdateProperty() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    void,
    Error,
    { propertyId: string; input: UpdatePropertyInput }
  >({
    mutationFn: async ({ propertyId, input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateProperty(propertyId, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
  });
}

export function useDeleteProperty() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (propertyId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProperty(propertyId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
  });
}

export function useSetPropertyStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    void,
    Error,
    { propertyId: string; status: PropertyStatus }
  >({
    mutationFn: async ({ propertyId, status }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setPropertyStatus(propertyId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
  });
}

export function useAddImageToProperty() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, { propertyId: string; image: ExternalBlob }>({
    mutationFn: async ({ propertyId, image }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addImageToProperty(propertyId, image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
  });
}

export function useRemoveImageFromProperty() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, { propertyId: string; imageIndex: bigint }>({
    mutationFn: async ({ propertyId, imageIndex }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.removeImageFromProperty(propertyId, imageIndex);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
  });
}

export function useReorderImages() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, { propertyId: string; newOrder: bigint[] }>({
    mutationFn: async ({ propertyId, newOrder }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.reorderImages(propertyId, newOrder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
  });
}

export function useSetPrimaryImageIndex() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<void, Error, { propertyId: string; index: bigint }>({
    mutationFn: async ({ propertyId, index }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setPrimaryImageIndex(propertyId, index);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    },
  });
}
