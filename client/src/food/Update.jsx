import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
    const [user, setUser] =useState({
        order_id :"",
        first_name :"",
        last_name :"",
        phone_number :"",
        address : "",

    });
    const [order, setOrder] =useState({
      email: "",
      item_name :"",
      phone_number :"",
      item_price :"",
      quantity :"",
      location :""
    })
    const [error,setError] = useState(false)
    
    const location = useLocation()
    const navigate = useNavigate()

    const user_id = location.pathname.split("/")[2]
    const entity = location.state?.entityid;
    
    const handleChange = (e) =>{
      if(entity === "users"){
        setUser(prev=>({...prev, [e.target.name]: e.target.value}));}
        else{
          setOrder(prev=>({...prev, [e.target.name]: e.target.value}));
        }
    };
    
    useEffect( ()=>{
       const  updateForm =  async () =>{
        if (entity === "users"){
           await axios.get("http://localhost:8000/api/getuserbyid/"+user_id)
          .then(res=>{
            setUser((prevUser) => ({ ...prevUser, ...res.data[0] }));
            setError(true)
          })
          .catch(err=>console.log(err))
        }
        else{
          await axios.get("http://localhost:8000/api/getorderbyid/"+user_id)
          .then(res=>{
            setOrder((prevOrder) => ({ ...prevOrder, ...res.data[0] }));
          })
          .catch(err=>console.log(err))
        }
      }
      updateForm()
    },[entity,user_id])
 
    const handleClick =async  e => {
        e.preventDefault()
        try{
          if(entity=== "users"){
            await axios.put("http://localhost:8000/api/updateUser/"+ user_id,user);
            navigate("/")
            alert("User updated successfully!");
            }
            else{
              await axios.put("http://localhost:8000/api/updateorder/"+ user_id,order);
              navigate("/orders")
              alert("Order updated successfully!");
              
            }
        }catch(err){
            console.log(err);
            setError(true);
        }
    };

    return (
      <div>
      <h1>{entity === "orders" ? 'Update the Order' : 'Update the User'}</h1>
      {entity === "users" ? 
      
            <div className='form'>
            <input
            type="number"
            value={user.order_id}
            placeholder='Order Id'
            name="order_id"
            onChange={handleChange}
          />
          <input
            type="text"
            value={user.first_name}
            placeholder='first_name'
            name="first_name"
            onChange={handleChange}
          />
          <input
            type="text"
            value={user.last_name}
            placeholder='last_name'
            name="last_name"
            onChange={handleChange}
          />
          <input
            type="number"
            value={user.phone_number}
            placeholder='phone_number'
            name="phone_number"
            onChange={handleChange}
          />
          <textarea
            rows={5}
            type="text"
            value={user.address}
            placeholder='address'
            name="address"
            onChange={handleChange}
            />
            <button className="formButton" onClick={handleClick}>Update</button>
            {error && "Something went wrong!"}
            <Link to="/">See all Users</Link>

            </div>
            
         :
         <div className='form'>
          
          <input
            type="text"
            placeholder="Item Name"
            value={order.item_name}
            name="item_name"
            onChange={handleChange}
          />
           <input
            type="number"
            placeholder="Item Price"
            value={order.item_price}
            name="item_price"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            value={order.email}
            name="email"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Phone number"
            value={order.phone_number}
            name="phone_number"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="quantity"
            value={order.quantity}
            name="quantity"
            onChange={handleChange}
            />
            <textarea
            rows={5}
            type="text"
            value={order.location}
            placeholder="Location"
            name="location"
            onChange={handleChange}
            />
            <button className="formButton" onClick={handleClick}>Update</button>
            {error && "Something went wrong!"}
            <Link to="/orders">See all Orders</Link>
            </div>
            }
        </div> 
    )
}

export default Update;