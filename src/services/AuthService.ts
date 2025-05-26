import api from "@/utils/api";
const AuthService = {

  login: async (data : { email: string, password: string }) => {
    const { email, password } = data;
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      return response;
    } catch (error: unknown) {
      throw error;
    }
  }

}
export default AuthService;
