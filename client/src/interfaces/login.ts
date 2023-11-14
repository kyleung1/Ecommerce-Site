import React from "react";

export interface login {
  email: String;
  token: String;
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
  type: String;
  payload: login;
}

interface logoutAction {
  type: String;
  payload: null;
}
