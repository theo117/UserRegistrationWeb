import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api, { getApiErrorMessage } from "../api";

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const result = await api.get(`/user/${id}`);
        setUser(result.data);
        setError("");
      } catch (err) {
        setError(getApiErrorMessage(err, "Failed to load user."));
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  return (
    <main className="container py-4">
      <div className="row">
        <div className="col-md-7 col-lg-6 mx-auto">
          <div className="content-panel text-start">
            <h1 className="h3 text-center mb-4">User Details</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
              <div className="text-muted py-4 text-center">Loading user...</div>
            ) : (
              <div className="details-list">
                <div>
                  <span className="text-muted">User ID</span>
                  <strong>{id}</strong>
                </div>
                <div>
                  <span className="text-muted">Name</span>
                  <strong>{user.name}</strong>
                </div>
                <div>
                  <span className="text-muted">Username</span>
                  <strong>{user.username}</strong>
                </div>
                <div>
                  <span className="text-muted">Email</span>
                  <strong>{user.email}</strong>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-center gap-2 mt-4">
              <Link className="btn btn-primary" to={`/edituser/${id}`}>
                Edit
              </Link>
              <Link className="btn btn-outline-secondary" to="/">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
