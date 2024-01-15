/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();
const URI = "http://localhost:5000/api/user";

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const navigate = useNavigate();

  const register = async (userData) => {
    /*fetch(`${URI}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    */
    try {
      const result = await fetch(`${URI}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const user = await result.json();
      console.log("user", user);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (userData) => {
    /*
    fetch(`${URI}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
    */

    try {
      const result = await fetch(`${URI}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const user = await result.json();

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
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
    <AuthContext.Provider
      value={{ user, register, login, loading, profile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
