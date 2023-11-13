import { createContext, useReducer, useEffect } from "react";
import React from "react";
import { loginContext, user, action } from "../interfaces/login";

export const AuthContext = createContext<loginContext | null>(null);

export const authReducer = (state: user | null, action: action) => {
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
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      const user = JSON.parse(localStorageUser);

      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      }
    }
  }, []);

  console.log("AuthContext State: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
