import { useState } from "react";

import axios from "axios";
import "../styles/auth.css";

import api from '../api/axios';

import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",

    email: "",

    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const url = isLogin
        ? "/api/auth/login"
        : "/api/auth/register";

      const response = await axios.post(url, formData);

      if (!isLogin) {
        alert("Registration Success");

        setIsLogin(true);

        return;
      }

      localStorage.setItem(
        "token",

        response.data.token,
      );

      localStorage.setItem(
        "userId",

        response.data.user._id,
      );

      localStorage.setItem(
        "role",

        response.data.user.role,
      );

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Authentication Failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>{isLogin ? "Login" : "Register"}</button>

        <p className="switch-auth" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create Account" : "Already Have Account?"}
        </p>
      </div>
    </div>
  );
}
