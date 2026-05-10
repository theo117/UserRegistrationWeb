import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api, { getApiErrorMessage } from "../api";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { name, username, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.put(`/user/${id}`, user);
      navigate("/");
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to update user."));
    } finally {
      setSaving(false);
    }
  };

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
            <h1 className="h3 text-center mb-4">Edit User</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
              <div className="text-muted py-4 text-center">Loading user...</div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    name="name"
                    value={name}
                    onChange={onInputChange}
                    maxLength="80"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="form-control"
                    placeholder="Enter your username"
                    name="username"
                    value={username}
                    onChange={onInputChange}
                    maxLength="50"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                    maxLength="120"
                    required
                  />
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? "Saving..." : "Submit"}
                  </button>
                  <Link className="btn btn-outline-secondary" to="/">
                    Cancel
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
