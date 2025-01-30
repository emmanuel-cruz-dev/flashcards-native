import { useContext } from "react";
import { AuthContext } from "../wrappers/AuthContext";

export const useUser = () => useContext(AuthContext);
