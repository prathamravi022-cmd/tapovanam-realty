import { O as useActor, Q as useQuery, F as useQueryClient, aC as useMutation, R as createActor } from "./index-D6obxqBN.js";
const PROPERTIES_QUERY_KEY = ["properties"];
function useProperties() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: PROPERTIES_QUERY_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProperties();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4,
    staleTime: 1e4
  });
}
function useAddProperty() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addProperty(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    }
  });
}
function useUpdateProperty() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ propertyId, input }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateProperty(propertyId, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    }
  });
}
function useDeleteProperty() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (propertyId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProperty(propertyId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    }
  });
}
function useSetPropertyStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ propertyId, status }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setPropertyStatus(propertyId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    }
  });
}
function useAddImageToProperty() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ propertyId, image }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addImageToProperty(propertyId, image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    }
  });
}
function useReorderImages() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ propertyId, newOrder }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.reorderImages(propertyId, newOrder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    }
  });
}
function useSetPrimaryImageIndex() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ propertyId, index }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setPrimaryImageIndex(propertyId, index);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY });
    }
  });
}
export {
  PROPERTIES_QUERY_KEY as P,
  useDeleteProperty as a,
  useSetPropertyStatus as b,
  useAddProperty as c,
  useUpdateProperty as d,
  useAddImageToProperty as e,
  useReorderImages as f,
  useSetPrimaryImageIndex as g,
  useProperties as u
};
