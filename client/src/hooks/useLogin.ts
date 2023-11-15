import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authDispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    const response = await fetch(
      "http://localhost:" + process.env.REACT_APP_PORT + "/user/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // setEmail('')
      // setPass('')
      setError(null);

      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update the auth context
      authDispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      console.log("Logged in");
    }
  };

  return { login, isLoading, error };
};
