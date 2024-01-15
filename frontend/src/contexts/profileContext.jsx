/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const ProfileContext = createContext();
const URI = "http://localhost:5000/api/user";

export const ProfileProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const getProfile = async () => {
    /* 
    axios
      .get(`${URI}/profile`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        setProfile(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    */
    try {
      const result = await axios.get(`${URI}/profile`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProfile(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, []);

  return (
    <ProfileContext.Provider value={{ loading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
