import axios from "axios";
const URI = "http://localhost:5000/api/user";

const register = async (userData) => {
  const response = await axios.post(`${URI}/register`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${URI}/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export const authService = {
  register,
  login,
  logout,
};

export default authService;
