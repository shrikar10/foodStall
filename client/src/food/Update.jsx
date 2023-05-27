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
            setUser(res.data);
            setError(true)
          })
          .catch(err=>console.log(err))
        }
        else{
          await axios.get("http://localhost:8000/api/getorderbyid/"+user_id)
          .then(res=>{
            setOrder(res.data);
          })
          .catch(err=>console.log(err))
        }
      }
      updateForm()
      console.log(error);
    },[])

    const handleDelete = async (e) =>{
      e.preventDefault();
      try{
        if(entity === "users"){
          await axios.delete("http://localhost:8000/api/deleteuser/"+user_id);
          navigate("/")
          alert("User deleted successfully!");
        }
        else{
          await axios.delete("http://localhost:8000/api/deleteorder/"+user_id);
          navigate("/orders")
          alert("Order deleted successfully!");
        }
      }catch(err){
        console.log(err);
        setError(true);
      }
    }
    
    
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

    // console.log(book)

    return (
      <div>
      <h1>{entity === "orders" ? 'Update the Order' : 'Update the User'}</h1>
      {entity === "users" ? 
      
            <div className='form'>
            <input
            type="number"
            value={user.first_name}
            name="order_id"
            onChange={handleChange}
          />
          <input
            type="text"
            value={user.first_name}
            name="first_name"
            onChange={handleChange}
          />
          <input
            type="text"
            value={user.last_name}
            name="last_name"
            onChange={handleChange}
          />
          <input
            type="number"
            value={user.phone_number}
            name="phone_number"
            onChange={handleChange}
          />
          <textarea
            rows={5}
            type="text"
            value={user.address}
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
            name="item_name"
            onChange={handleChange}
          />
           <input
            type="number"
            placeholder="Item Price"
            name="item_price"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Phone number"
            name="phone_number"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="quantity"
            name="quantity"
            onChange={handleChange}
            />
            <textarea
            rows={5}
            type="text"
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