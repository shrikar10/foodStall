import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Add = () => {
    const [user, setUser] =useState({
        user_id: "",
        order_id :"",
        first_name :"srini",
        last_name :"fghguu",
        phone_number :"8626",
        address : "564",

    });

    const [error, setError] = useState(false)

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
          console.log(user)
          await axios.post("http://localhost:8000/api/addUser", user);
          navigate("/");
        } catch (err) {
          console.log(err);
          setError(true)
        }
    };


    return (
        <div className="form">
          <h1>Add New User</h1>
          <input
            type="number"
            placeholder="user ID number"
            name="user_id"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="order ID number"
            name="order_id"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="User First Name"
            name="first_name"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="User Last Name"
            name="last_name"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Phone number"
            name="phone_number"
            onChange={handleChange}
          />
          <textarea
            rows={5}
            type="text"
            placeholder="User Address"
            name="address"
            onChange={handleChange}
            />

          <button onClick={handleClick}>Add</button>
          {error && "Something went wrong!"}
          <Link to="/">See all Users</Link>
        </div>
      );

}

export default Add;