import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/">
          User Registry
        </Link>
        <Link className="btn btn-light btn-sm" to="/adduser">
          Add User
        </Link>
      </div>
    </nav>
  );
}
