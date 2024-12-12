import { TextField } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase/Firebase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        console.log(value);
        alert("Login successful");
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        console.error(err);
        alert("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-12 border-2 border-gray-600 rounded-xl mt-24">
        <h1 className="text-xl flex justify-center">Admin Login</h1>
        <form onSubmit={handleLogin}>
          <div className="py-4">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </div>
          <div className="py-4">
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 p-3 rounded-xl text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
