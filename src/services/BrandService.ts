import { ApiResponse } from "@/types/api";
import { Brand } from "@/types/brand";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import api from "@/utils/api";

const get: FetchFunctionWithPagination<Brand> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Brand>> => {
  const response = await api.get<PaginatedResponse<Brand>>("brands", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<Brand[]>> => {
  const response = await api.get<ApiResponse<Brand[]>>("brands", {
    params: { keyword },
  });
  return response.data;
};

const create = async (data: FormData) => {
  try {
    const response = await api.post("brands", data,{
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
    const response = await api.get(`brands/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: FormData) => {
  try {
    const response = await api.put(`brands/${id}`, data,{
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
    const response = await api.delete(`brands/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Successfully deleted Brand with ID: ${id}`);
    throw error;
  }
};

const BrandService = { get, getWithoutPagination, create, getById, update, remove };
export default BrandService;