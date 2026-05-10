import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { getApiErrorMessage } from "../../api";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const result = await api.get("/users");
      setUsers(Array.isArray(result.data) ? result.data : []);
      setError("");
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to load users from backend."));
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const deleteUser = async (id) => {
    const shouldDelete = window.confirm("Delete this user?");

    if (!shouldDelete) {
      return;
    }

    setDeletingId(id);
    try {
      await api.delete(`/user/${id}`);
      loadUsers();
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to delete user."));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="container py-4">
      <div className="content-panel">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 text-start">
          <div>
            <p className="text-uppercase text-muted fw-semibold small mb-1">Directory</p>
            <h1 className="h3 mb-0">Registered Users</h1>
          </div>
          <Link className="btn btn-primary" to="/adduser">
            Add User
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <div className="text-muted py-5">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="empty-state">
            <h2 className="h5">No users yet</h2>
            <p className="text-muted mb-3">Create the first user to populate this directory.</p>
            <Link className="btn btn-primary" to="/adduser">
              Add User
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
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
                      <div className="d-flex justify-content-end gap-2">
                        <Link className="btn btn-sm btn-primary" to={`/viewuser/${user.id}`}>
                          View
                        </Link>
                        <Link className="btn btn-sm btn-outline-primary" to={`/edituser/${user.id}`}>
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          disabled={deletingId === user.id}
                          onClick={() => deleteUser(user.id)}
                        >
                          {deletingId === user.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
