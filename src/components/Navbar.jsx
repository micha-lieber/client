import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-black text-white flex flex-row gap-4 justify-center p-5">
      <NavLink to="/">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="http://localhost:3000/content">Content</NavLink>
      <a href="http://localhost:3000/logout">Logout</a>
    </div>
  );
}
