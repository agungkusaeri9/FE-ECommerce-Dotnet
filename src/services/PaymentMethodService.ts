import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import api from "@/utils/api";
import { PaymentMethod } from "@/types/paymentMethod";

interface IForm {
  name: string;
  image?: File;
}

const get: FetchFunctionWithPagination<PaymentMethod> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<PaymentMethod>> => {
  const response = await api.get<PaginatedResponse<PaymentMethod>>("payment-methods", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<PaymentMethod[]>> => {
  const response = await api.get<ApiResponse<PaymentMethod[]>>("payment-methods", {
    params: { keyword },
  });
  return response.data;
};

const create = async (data: FormData) => {
  try {
    const response = await api.post("payment-methods", data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`payment-methods/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: FormData) => {
  try {
    const response = await api.put(`payment-methods/${id}`, data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`payment-methods/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Successfully deleted PaymentMethod with ID: ${id}`);
    throw error;
  }
};

const PaymentMethodService = { get, getWithoutPagination, create, getById, update, remove };
export default PaymentMethodService;