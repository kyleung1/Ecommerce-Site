import { createContext, useReducer, useEffect } from "react";
import React from "react";
import { loginContext, user, action, login } from "../interfaces/login";

export const AuthContext = createContext<loginContext | null>(null);

export const authReducer = (state: user, action: action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authState, authDispatch] = useReducer<React.Reducer<user, action>>(
    authReducer,
    {
      user: null,
    }
  );

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      const user: login = JSON.parse(localStorageUser);

      if (user) {
        authDispatch({ type: "LOGIN", payload: user });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
