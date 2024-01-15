/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const AuthContext = createContext();
const URI = "http://localhost:5000/api/user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const navigate = useNavigate();

  const register = async (userData) => {
    /* 
    axios
      .post(`${URI}/register`, userData)
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.data));
        setUser(data.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    */
    try {
      const result = await axios.post(`${URI}/register`, userData);
      localStorage.setItem("user", JSON.stringify(result.data));
      setUser(result.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (userData) => {
    /* 
    axios
      .post(`${URI}/login`, userData)
      .then((data) => {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data.data));
        setUser(data.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    */
    try {
      const result = await axios.post(`${URI}/login`, userData);
      localStorage.setItem("user", JSON.stringify(result.data));
      setUser(result.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
