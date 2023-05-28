import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Users = () => {
    const [users,setUsers] = useState([]);

    useEffect(()=> {
        const fetchAllUsers = async ()=>{
            try{
                const res = await axios.get("http://localhost:8000/api/getUser");
                setUsers(res.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchAllUsers();
    },[]);


    const handleDelete = async (id)=>{
        try{
            await axios.delete(`http://localhost:8000/api/deleteUser/${id}`);
            window.location.reload()
        }catch(err){
            console.log(err);
        }
    };

    return (

        <React.Fragment>

        <div>
            <h1> HI This is Online Food Application</h1>
            <div className="users">
                {users.map((user)=>(
                    <div key={user.user_id} className="user">
                        <img src={user.address} alt="" />
                        <h2>{user.user_id}</h2>
                        <h2>{user.order_id}</h2>
                        <h3>{user.first_name}</h3>
                        <h4>{user.last_name}</h4>
                        <h5>{user.phone_number}</h5>
                        <p>{user.address}</p>
                        <button className="delete" onClick={()=>handleDelete(user.user_id)}>Delete</button>
                        <button className="Update">
                            <Link 
                                // to={{pathname:`/update/${user.user_id}`,state:{entityid:"users"}}}
                                to={`/update/${user.user_id}`}
                                state={{entityid:"users"}}
                                style={{color:"inherit",textDecoration:"none"}}
                            >
                            Update
                            </Link>
                        </button>
                    </div>
                ))}
            </div>
            <button className="addHome">
                <Link to="/add" state={{entityid:"users"}} style={{ color: "inherit", textDecoration: "none" }}>
                Add new User
                </Link>
            </button>

        </div>

        </React.Fragment>
        
    );
};
export default Users;