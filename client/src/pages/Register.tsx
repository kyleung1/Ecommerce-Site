import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import React from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const { register, error, isLoading } = useRegister();
  let admin = false;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await register(email, password, admin);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h3>Register</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPass(e.target.value)}
        value={password}
      />

      {/* <button disabled={isLoading}>Register</button> */}
      {error && <div className="register-error">{error}</div>}

      <p className="pass-rule">
        Password must contain: 8 characters, at least 1 uppercase, at least 1
        lowercase, at least 1 special character
      </p>
    </form>
  );
};

export default Register;
