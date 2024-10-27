"use client";

import { useReducer, Dispatch, createContext, PropsWithChildren } from "react";

import { USER } from "@interfaces/User";

interface User {
  type?: USER;
  id?: string;
  name?: string;
  email?: string;
  accessToken?: string;
  refreshToken?: string;
}

interface AuthContext {
  user: AuthState;
  dispatch: Dispatch<AuthAction>;
}

interface AuthAction {
  type: AuthType;
  payload: AuthState;
}

type AuthState = User | null;
type AuthType = "AUTHENTICATE" | "LOGOUT";

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "AUTHENTICATE":
      return action.payload;

    case "LOGOUT":
      return null;

    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContext>({
  user: null,
  dispatch: () => null,
});

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(authReducer, null);

  console.log(state);

  return (
    <AuthContext.Provider value={{ user: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
