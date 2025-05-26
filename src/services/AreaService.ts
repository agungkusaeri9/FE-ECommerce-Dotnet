import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { Area } from "@/types/area";
import api from "@/utils/api";

interface IForm {
  name: string;
}

const get: FetchFunctionWithPagination<Area> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Area>> => {
  const response = await api.get<PaginatedResponse<Area>>("machine-areas", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<Area[]>> => {
  const response = await api.get<ApiResponse<Area[]>>("machine-areas", {
    params: { keyword },
  });
  return response.data;
};

const create = async (data: IForm) => {
  try {
    const response = await api.post("machine-areas", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`machine-areas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: IForm) => {
  try {
    const response = await api.put(`machine-areas/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`machine-areas/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Successfully deleted area with ID: ${id}`);
    throw error;
  }
};

const AreaService = { get, getWithoutPagination, create, getById, update, remove };
export default AreaService;