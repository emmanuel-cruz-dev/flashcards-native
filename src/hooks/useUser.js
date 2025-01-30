import { useContext, useEffect } from "react";
import { auth } from "../api/db";
import { AuthContext } from "../wrappers/AuthContext";

export const useUser = () => {
  const [user, setUser] = useContext(AuthContext);

  useEffect(() => {
    if (auth.currentUser && !user) {
      setUser(auth.currentUser);
    }
  }, [setUser, user]);

  return { user, setUser };
};
