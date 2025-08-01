import { useContext } from "react";
import {
  AuthContext,
  type AuthContextProps,
} from "../../context/Auth/AuthContext";

export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
};
