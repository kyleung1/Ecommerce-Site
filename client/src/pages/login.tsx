import { useState, useRef } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(email, password);
    setEmail("");
    setPass("");
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>Email:</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Password:</label>
        <input
          type="text"
          onChange={(e) => setPass(e.target.value)}
          value={password}
        />

        <button disabled={isLoading}>Login</button>
        {error && <div className="login-error">{error}</div>}
      </form>

      <a href="/register">
        <button>Register</button>
      </a>
    </div>
  );
};

export default Login;
