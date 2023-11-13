import React from "react";

export interface login {
  email: String;
  token: String;
  admin: boolean;
}

export interface action {
  type: String;
  payload?: any;
}

export interface user {
  user: login | null;
}

export interface loginContext {
  state: user;
  dispatch: React.Dispatch<action>;
}
