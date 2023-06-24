import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";
const Signup = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    order_id: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Add addUser and signup API calls here
    fetch("http://localhost:8000/api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: formData.user_id,
        order_id: formData.order_id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        address: formData.address,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or error response
        console.log("Add user response:", data);
        if (data.success) {
          fetch("http://localhost:8000/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: formData.user_id,
              password: formData.password,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle success or error response
              console.log("Signup response:", data);
              if (data.success) {
                // Redirect to login page after successful signup
                navigate("/");
              } else {
                console.error("Signup failed:", data.error);
              }
            })
            .catch((error) => {
              console.error("Signup error:", error);
            });
        } else {
          console.error("Add user failed:", data.error);
        }
      })
      .catch((error) => {
        console.error("Add user error:", error);
      });
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>
          User ID:
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Order ID:
          <input
            type="text"
            name="order_id"
            value={formData.order_id}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
