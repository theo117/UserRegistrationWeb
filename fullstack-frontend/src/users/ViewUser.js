import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


export default function ViewUser() {
    const API_BASE = process.env.REACT_APP_API_URL;

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
    })

    const {id} = useParams();

    useEffect(() => {
        const loadUser = async () => {
            const result = await axios.get(`${API_BASE}/user/${id}`);
            setUser(result.data);
        };

        loadUser();
    }, [API_BASE, id]);

  return (
    <div className="container">
    
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2">
            <h2 className="text-center m-4">User Details</h2>

           <div className="card">
  <div className='card-header'>
    Details of User ID: {id}
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        <strong>Name:</strong> {user.name}
      </li>
      <li className="list-group-item">
        <strong>Username:</strong> {user.username}
      </li>
      <li className="list-group-item">
        <strong>Email:</strong> {user.email}
      </li>
    </ul>
  </div>
</div>
</div>
</div>


<Link className="btn btn-primary mx-2 mt-3" to="/">Back to Home</Link>
</div>
  )
}
