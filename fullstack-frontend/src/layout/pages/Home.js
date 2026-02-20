import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const API_BASE = process.env.REACT_APP_API_URL;

  const loadUsers = useCallback(async () => {
    const result = await axios.get(`${API_BASE}/users`);
    setUsers(result.data);
  }, [API_BASE]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const deleteUser = async (id) => {
    await axios.delete(`${API_BASE}/user/${id}`);
    loadUsers();
    console.log("User deleted successfully");
  };

  return (
    <div className='container'>
      <div className='py-4'>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                  >View</Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
