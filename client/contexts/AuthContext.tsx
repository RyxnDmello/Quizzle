"use client";

import {
  useEffect,
  useReducer,
  Dispatch,
  createContext,
  PropsWithChildren,
} from "react";

import {
  getCookie,
  setCookie,
  removeCookie,
  isAuthenticated,
} from "@utils/getCookies";

import { useRouter } from "next/navigation";

import User from "@interfaces/User";

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
      if (action.payload) setCookie(action.payload);
      return action.payload;

    case "LOGOUT":
      removeCookie();
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
  const { replace } = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      replace("/");
      return;
    }

    const userCookie = getCookie()!;

    dispatch({
      type: "AUTHENTICATE",
      payload: userCookie,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
