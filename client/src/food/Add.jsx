import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Add = () => {
    const [user, setUser] =useState({
        user_id: "",
        order_id :"",
        first_name :"",
        last_name :"",
        phone_number :"",
        address : ""

    });
    const [order, setOrder] =useState({
      order_id: "",
      item_name :"",
      email:"",
      item_price:"",
      phone_number:"",
      quantity:"",
      location:""
    })
    const [error, setError] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();

    const entity = location.state?.entityid;
    const handleChange = (e) => {
      if (entity === "users")
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      else
        setOrder((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (entity === "users")
        try {
          console.log(user)
          await axios.post("http://localhost:8000/api/addUser", user);
          navigate("/");
          alert("User added successfully")
        } catch (err) {
          console.log(err);
          setError(true)
        }
        else
        try {
          await axios.post("http://localhost:8000/api/addorder", order);
          navigate("/orders");
          alert("Order added successfully")
        } catch (err) {
          console.log(err);
          setError(true)
        }
    };


    return (
      <div>
          <h1>{entity === "users"  ? "Add User" : "Add Order"}</h1>
        { entity === "users" ?
          <div className="form">
          <input
            type="number"
            placeholder="user ID number"
            name="user_id"
            value={user.user_id}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="order ID number"
            name="order_id"
            value={user.order_id}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="User First Name"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="User Last Name"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Phone number"
            name="phone_number"
            value={user.phone_number}
            onChange={handleChange}
          />
          <textarea
            rows={5}
            type="text"
            placeholder="User Address"
            name="address"
            value={user.address}
            onChange={handleChange}
            />

          <button onClick={handleClick}>Add</button>
          {error && "Something went wrong!"}
          <Link to="/">See all Users</Link>
        </div>
        :
        <div className="form">
          <input
            type="number"
            placeholder="order ID number"
            name="order_id"
            value={order.order_id}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="item name"
            name="item_name"
            value={order.item_name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="email"
            name="email"
            value={order.email}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Item Price"
            name="item_price"
            value={order.item_price}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Phone number"
            name="phone_number"
            value={order.phone_number}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={order.quantity}
            onChange={handleChange}
          />
          <textarea
            rows={5}
            type="text"
            placeholder="Order Address"
            name="location"
            value={order.location}
            onChange={handleChange}
            />

          <button onClick={handleClick}>Add</button>
          {error && "Something went wrong!"}
          <Link to="/orders">See all Orders</Link>
          </div>
    }
      </div>
      );

}

export default Add;