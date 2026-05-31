import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

export function useAdmin() {
  const { actor, isFetching } = useActor(createActor);
  const { login, clear, identity, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;

  const adminQuery = useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: 60_000,
  });

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      const err = error as Error;
      if (err.message === "User is already authenticated") {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return {
    isAdmin: isAuthenticated && (adminQuery.data ?? false),
    isAuthenticated,
    isLoading: isFetching || adminQuery.isLoading,
    loginStatus,
    login: handleLogin,
    logout: handleLogout,
    identity,
  };
}
