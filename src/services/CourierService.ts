import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import api from "@/utils/api";
import { Courier } from "@/utils/courier";

interface IForm {
  name: string;
  status: boolean; // Assuming status can be 0 or 1 (or true/false)
}

const get: FetchFunctionWithPagination<Courier> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Courier>> => {
  const response = await api.get<PaginatedResponse<Courier>>("couriers", {
    params: { limit, keyword, page, paginate: true },
  });

  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<Courier[]>> => {
  const response = await api.get<ApiResponse<Courier[]>>("couriers", {
    params: { keyword },
  });
  return response.data;
};

const create = async (data: IForm) => {
  
  console.log(data);
  try {
    const response = await api.post("couriers", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`couriers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: IForm) => {
  try {
    const response = await api.put(`couriers/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`couriers/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Successfully deleted Courier with ID: ${id}`);
    throw error;
  }
};

const CourierService = { get, getWithoutPagination, create, getById, update, remove };
export default CourierService;