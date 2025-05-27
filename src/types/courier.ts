export type Courier = {
  id: number;
  name: string;
  status?: null | 0 | 1; // 1 for active, 0 for inactive
  created_at?: string;
  updated_at?: string;
};