import axios from "axios";
const URI = "http://localhost:5000/api/user";

const getProfile = async (token) => {
  const response = await axios.get(`${URI}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

const userService = {
  getProfile,
};

export default userService;
