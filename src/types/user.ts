export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  // password_confirmation: string;
  created_at?: string;
  updated_at?: string;
}
