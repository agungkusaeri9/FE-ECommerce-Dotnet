import { AxiosError } from "axios";
import toast from "react-hot-toast";
import FormErrors from "@/types/formErrors";

/**
 * Handles different types of errors and displays appropriate toast messages.
 * Optionally sets form validation errors into state if setter provided.
 *
 * @param error - The error object to handle
 * @param setErrors - Optional function to set form validation errors
 */
export function handleError(
  error: unknown,
  setErrors?: (errors: FormErrors) => void
): void {
  if (error instanceof AxiosError) {
    const status = error.response?.status;

    if (status === 422 && error.response?.data?.errors) {
      const errors = error.response.data.errors as FormErrors;
      if (setErrors) {
        setErrors(errors);
      }
      return
    }

    if (status === 401) {
      toast.error(error.response?.data?.message || "Request failed");
      // setTimeout(() => {
      //   window.location.href = "/";
      // }, 2000);
      return;
    }

     if (status === 401 || status === 400 || status === 404) {
      toast.error(error.response?.data?.message || "Request failed");
      return;
    }

    console.log(error.response)

    // Catch-all untuk response.message
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
      return;
    }

    // Fallback error Axios
    toast.error("An unexpected error occurred. Please try again.");
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("An unknown error occurred.");
  }
}

export default handleError;