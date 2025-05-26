import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { User } from "@/types/user";
import api from "@/utils/api";

interface IForm {
  name: string;
  email: string;
  role: string;
  password?: string;
  password_confirmation?: string;
}

const get: FetchFunctionWithPagination<User> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<User>> => {
  const response = await api.get<PaginatedResponse<User>>("users", {
    params: { limit, keyword, page, paginate: true },
  });

  console.log(response.data);
  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<User[]>> => {
  const response = await api.get<ApiResponse<User[]>>("users", {
    params: { keyword },
  });
  return response.data;
};

const create = async (data: IForm) => {
  try {
    const response = await api.post("users", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: IForm) => {
  try {
    const response = await api.put(`users/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`users/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Successfully deleted User with ID: ${id}`);
    throw error;
  }
};

const UserService = { get, getWithoutPagination, create, getById, update, remove };
export default UserService;