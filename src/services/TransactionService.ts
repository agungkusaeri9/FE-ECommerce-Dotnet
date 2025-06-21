import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import api from "@/utils/api";
import { Transaction } from "@/types/Transaction";

interface IForm {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  status: any;
}

const get: FetchFunctionWithPagination<Transaction> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Transaction>> => {
  const response = await api.get<PaginatedResponse<Transaction>>("transactions", {
    params: { limit, keyword, page, paginate: true },
  });

  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<Transaction[]>> => {
  const response = await api.get<ApiResponse<Transaction[]>>("transactions", {
    params: { keyword },
  });
  return response.data;
};

const create = async (data: IForm) => {
  try {
    const response = await api.post("transactions", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`transactions/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: IForm) => {
  try {
    const response = await api.put(`transactions/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`transactions/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Successfully deleted Transaction with ID: ${id}`);
    throw error;
  }
};

const transactionservice = { get, getWithoutPagination, create, getById, update, remove };
export default transactionservice;