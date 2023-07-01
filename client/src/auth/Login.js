import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";
import { api } from "../food/DataService";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState();
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await api.get("/login");
      const { loggedIn } = response.data;
      setLoggedIn(loggedIn);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {
    axios
      .post(
        "http://localhost:8000/api/login",
        {
          user_id: firstName,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const data = response.data;
        if (data === "Login Successful") {
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/logout", {
        withCredentials: true,
      });
      setLoggedIn(false);
      navigate("/"); // Redirect to the home page or any other desired page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {loggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <div className="signup-container">
          <h1>Login</h1>
          <input
            type="text"
            placeholder="User_id"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;
