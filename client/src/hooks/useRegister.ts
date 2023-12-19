import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authDispatch } = useAuthContext();

  const register = async (email: String, password: String, admin: boolean) => {
    console.log(process.env.APIKEY);
    const response = await fetch(
      process.env.REACT_APP_PKMART_BACKEND + "api/user/register",
      {
        method: "POST",
        body: JSON.stringify({ email, password, admin }),
        headers: {
          "Content-Type": "application/json",
          apikey: "" + process.env.APIKEY,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setError(null);

      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update the auth context
      authDispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      console.log("Signed up");
    }
  };

  return { register, isLoading, error };
};
