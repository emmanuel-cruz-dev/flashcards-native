import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/db";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => {
  return useContext(AuthContext);
};
