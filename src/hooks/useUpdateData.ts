import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { handleError } from "@/utils/handleErrors";

type ServerResponse = {
  message: string;
  [key: string]: unknown;
};

export const useUpdateData = <T, R extends ServerResponse>(
  updateFunction: (id: number, formData: T) => Promise<R>,
  id: number | undefined,
  queryKey: string,
  redirectUrl: string,
): UseMutationResult<R, unknown, T, unknown> => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<R, unknown, T>({
    mutationFn: async (formData: T) => {
      if (id === undefined) throw new Error("ID diperlukan");
      return await updateFunction(id, formData);
    },
    onSuccess: (response) => {
      toast.success(response.message || "Data berhasil diperbarui.");
      queryClient.invalidateQueries({ queryKey: [queryKey, id] });
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      router.push(redirectUrl);
    },
    onError: (error: unknown) => {
      handleError(error);
    },
  });
};
