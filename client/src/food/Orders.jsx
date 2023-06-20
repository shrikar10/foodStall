import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {api} from "./DataService";


const Orders = () => {
    const [orders,setOrders] = useState([]);

    useEffect(()=> {
        const fetchAllOrders = async ()=>{
            try{
                const res = await api.get("/getorder");
                setOrders(res.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchAllOrders();
    },[]);

    const handleDelete = async (id)=>{
        try{
            await api.delete(`/deleteorder/${id}`);
            window.location.reload()
        }catch(err){
            console.log(err);
        }
    };

    return (

        <React.Fragment>

        <div>
            <h1> HI This is Online Food Application</h1>
            <div className="orders">
                {orders.map((order)=>(
                    <div key={order.order_id} className="user">
                        {/* <img src={user.address} alt="" /> */}
                        <h2>{order.item_name}</h2>
                        <h2>{order.email}</h2>
                        <h3>{order.item_price}</h3>
                        <h4>{order.phone_number}</h4>
                        <h5>{order.quantity}</h5>
                        <p>{order.location}</p>
                        <button className="delete" onClick={()=>handleDelete(order.order_id)}>Delete</button>
                        <button className="Update">
                            <Link 
                                // to={{pathname: `/update/${order.order_id}`,state:{entityid:"orders"}}}
                                //send a prop stating this request is from orders
                                to={`/update/${order.order_id}`}
                                state={{entityid:"orders"}}
                                style={{color:"inherit",textDecoration:"none"}}
                            >
                            Update
                            </Link>
                        </button>
                    </div>
                ))}
            </div>
            <button className="addHome">
                <Link to="/add" state={{entityid:"orders"}} style={{ color: "inherit", textDecoration: "none" }}>
                Add new order
                </Link>
            </button>

        </div>

        </React.Fragment>
        
    );
};
export default Orders;