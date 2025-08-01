import type { User } from "firebase/auth";
import { createContext } from "react";

export interface AuthContextProps {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  logout: async () => {},
});
