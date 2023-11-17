import React from "react";

export interface login {
  email: string;
  token: string;
  admin: boolean;
}

export type action = loginAction | logoutAction;

export interface user {
  user: login | null;
}

export interface loginContext {
  authState: user;
  authDispatch: React.Dispatch<action>;
}

interface loginAction {
  type: string;
  payload: login;
}

interface logoutAction {
  type: string;
  payload: null;
}
