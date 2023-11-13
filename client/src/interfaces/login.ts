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

export interface loginContext {
  state: String;
  dispatch: React.Dispatch<action>;
}

export interface user {
  user: String;
}
