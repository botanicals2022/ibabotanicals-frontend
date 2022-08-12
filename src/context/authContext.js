// eslint-disable-next-line
import React, { useEffect, useContext, useState, createContext } from "react";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(false);

  useEffect(() => {
    const localuser = localStorage.getItem("user");
    if (localuser) {
      if (JSON.parse(localuser)) {
        // console.log("useEffect user", JSON.parse(localuser));
        setuser(JSON.parse(localuser));
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      const decodedJwt = parseJwt(user.accessToken);
      if (decodedJwt.exp * 1000 < Date.now()) {
        logOut();
      }
    }
  });

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const login = (user) => {
    setuser(user);
  };

  const logOut = () => {
    setuser(false);
    // localStorage.removeItem("user");
    // localStorage.removeItem("token");
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, parseJwt, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
