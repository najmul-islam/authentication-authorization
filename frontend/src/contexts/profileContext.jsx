/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, createContext } from "react";

const ProfileContext = createContext();
const URI = "http://localhost:5000/api/user";

export const ProfileProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const getProfile = async () => {
    /*
    fetch(`${URI}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((user) => {
        setProfile(user);
      })
      .catch((err) => {
        console.log(err);
      });
    */

    try {
      const result = await fetch(`${URI}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const profile = await result.json();
      setProfile(profile);
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
  console.log(profile);

  return (
    <ProfileContext.Provider value={{ loading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
