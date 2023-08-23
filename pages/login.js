// pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Hardcoded username and password for validation
    const validUsername = "manager";
    const validPassword = "password123";

    if (username === validUsername && password === validPassword) {
      // Redirect to the Home Page after successful login
      router.push("/");
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
