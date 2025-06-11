
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { Stock } from "@/types/stock";
import api from "@/utils/api";

export type FormCreateStock = {
  type: string;
  productId: number;
  qty: number;
}

const get: FetchFunctionWithPagination<Stock> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Stock>> => {
  const response = await api.get<PaginatedResponse<Stock>>("stocks", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};

const create = async (data: FormCreateStock) => {
  try {
    const response = await api.post("stocks", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const StockService = { get, create };
export default StockService;