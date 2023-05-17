import axios from 'axios';
import React, { useState } from 'react';
import {Link, useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
    const [user, setUser] =useState({
        // user_id: "",
        order_id :"",
        first_name :"",
        last_name :"",
        phone_number :"",
        address : "",

    });
    const [error,setError] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const user_id = location.pathname.split("/")[2]


    const handleChange = (e) =>{
        setUser(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleClick =async  e => {
        e.preventDefault()
        try{
            await axios.put("http://localhost:8000/api/updateUser/"+ user_id,user);
            navigate("/")
        }catch(err){
            console.log(err);
            setError(true);
        }
    };

    // console.log(book)

    return (
        <div className='form'>
            <h1>Update the User</h1>
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
            <button className="formButton" onClick={handleClick}>Update</button>
            {error && "Something went wrong!"}
            <Link to="/">See all Users</Link>

            
        </div>
    )
}

export default Update;