import { ApiResponse } from "@/types/api";
import { Category } from "@/types/category";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import api from "@/utils/api";

const get: FetchFunctionWithPagination<Category> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Category>> => {
  const response = await api.get<PaginatedResponse<Category>>("products", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<Category[]>> => {
  const response = await api.get<ApiResponse<Category[]>>("products", {
    params: { keyword },
  });
  return response.data;
};

const create = async (data: FormData) => {
  try {
    const response = await api.post("products", data,{
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
    const response = await api.get(`products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: FormData) => {
  try {
    const response = await api.put(`products/${id}`, data,{
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
    const response = await api.delete(`products/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Successfully deleted Category with ID: ${id}`);
    throw error;
  }
};

const ProductService = { get, getWithoutPagination, create, getById, update, remove };
export default ProductService;