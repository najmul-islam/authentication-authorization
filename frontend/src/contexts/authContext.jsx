import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const [profile, setProfile] = useState({});

  const register = (userData) => {
    const promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("POST", "http://localhost:5000/api/user/register");
      xhr.responseType = "json";
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          setUser(xhr.response);
          resolve(xhr.response);
        }
      };

      xhr.onerror = () => {
        reject("something went wrong!");
      };

      xhr.send(JSON.stringify(userData));
    });
    return promise;
  };

  const login = (userData) => {
    const promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("POST", "http://localhost:5000/api/user/login");
      xhr.responseType = "json";
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          setUser(xhr.response);
          resolve(xhr.response);
        }
      };

      xhr.onerror = () => {
        reject("something went wrong login");
      };

      xhr.send(JSON.stringify(userData));
    });
    return promise;
  };

  const getProfile = () => {
    const promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", "http://localhost:5000/api/user/profile");
      xhr.responseType = "json";
      xhr.setRequestHeader("Authorization", "Bearer " + user.token);
      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          setProfile(xhr.response);
          resolve(xhr.response);
        }
      };

      xhr.onerror = () => {
        reject("something went wrong while fetching profile");
      };
      xhr.send();
    });
    return promise;
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

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user, getProfile]);

  return (
    <AuthContext.Provider
      value={{ user, register, login, profile, getProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
