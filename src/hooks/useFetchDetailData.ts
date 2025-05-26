import { useQuery } from "@tanstack/react-query";

export const useFetchById = <T>(
  fetchFunction: (id: number) => Promise<{ data: T }>,
  id: number | undefined,
  queryKey: string,
) => {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      if (!id) return null;
      const response = await fetchFunction(id);
      return response.data as T;
    },
    enabled: !!id,
  });
};