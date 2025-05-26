import { Department } from "@/types/department";
import { Area } from "@/types/area";
import { Rack } from "@/types/rack";

export type Part = {
  id: number;
  part_number: string;
  name: string;
  description: string;
  specification?: string;
  minimum_quantity: number;
  maximum_quantity?: number;
  balance: number;
  department: Department;
  machine_area: Area;
  rack: Rack;
  created_at: string;
  updated_at: string;
};
