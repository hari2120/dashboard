import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";

import { Link, NavLink } from 'react-router-dom'



const Home = () => {
    const [users, setUsers] = useState([]);
    
    const {index} = useParams()

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async ()=> {
        const result = await axios.get("http://localhost:3003/users");
        setUsers(result.data.reverse())
    }

    console.log(users);


    const deleteUser = async (id) =>{
        await axios.delete(`http://localhost:3003/users/${id}`);
        loadUsers()
    }
    return (
        <div className="container">
            <h4>to see this app's complete functionality run this thing in terminal or cmd...</h4>
            <p>npm run start:dev</p>
            <div className="py-4">
            <table class="table border shadow">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => {
                            return(
                                <tr>
                                <th scope="row">{index+1}</th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link className="btn btn-primary mr-2" to={`/users/${user.id}`}  >View</Link>
                                    <Link className="btn btn-outline-primary mr-2" to={`/users/edit/${user.id}`} >Edit</Link>
                                    <Link className="btn btn-danger mr-2" onClick={() => deleteUser(user.id)}>Delete</Link>
                                </td>
                            </tr>

                            )
                            
                            
                        })
                    }
                </tbody>
                </table>


            </div>
            
        </div>
    )
}

export default Home
