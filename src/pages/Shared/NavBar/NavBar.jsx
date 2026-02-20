

import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContex } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import useCart from "../../../hooks/useCart";

const NavBar = () => {
  const { user, logOutUser } = useContext(AuthContex);
  const [cart] = useCart();
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  // Mobile dropdown toggle state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          title: "User Logged Out Successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        }).then(() => navigate("/"));
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "Logout failed",
          icon: "error",
        });
      });
  };

  const navStyleDark = ({ isActive }) =>
    `px-4 py-2 rounded font-bold transition duration-200 flex items-center
    ${isActive ? "bg-white text-black" : "text-gray-300 hover:text-white hover:bg-gray-700"}`;

  const navStyleLight = ({ isActive }) =>
    `px-4 py-2 rounded font-bold transition duration-200 flex items-center
    ${isActive ? "bg-gray-200 text-black" : "text-gray-700 hover:bg-gray-100"}`;

  const navOptions = (mode = "dark") => (
    <>
      <li>
        <NavLink to="/" className={mode === "dark" ? navStyleDark : navStyleLight}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/menu" className={mode === "dark" ? navStyleDark : navStyleLight}>
          Our Menu
        </NavLink>
      </li>
      <li>
        <NavLink to="/order/salad" className={mode === "dark" ? navStyleDark : navStyleLight}>
          Order Food
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={mode === "dark" ? navStyleDark : navStyleLight}>
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink to="/book" className={mode === "dark" ? navStyleDark : navStyleLight}>
          Booking
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/cart">
          <button className="btn flex items-center gap-2">
            {isMounted && <FaShoppingCart />}
            <span className="badge badge-secondary">+{cart.length}</span>
          </button>
        </NavLink>
      </li>
      {user ? (
        <li>
          <div className="flex items-center gap-2">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                className="w-10 h-10 rounded-full border"
                alt="User"
              />
            ) : (
              isMounted && <FaUserCircle className="text-3xl" />
            )}
            <button onClick={handleLogOut} className="btn btn-ghost">
              SignOut
            </button>
          </div>
        </li>
      ) : (
        <li>
          <NavLink to="/login" className={mode === "dark" ? navStyleDark : navStyleLight}>
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar fixed z-10 bg-[#151515] text-neutral-content max-w-screen-lg w-full">
      <div className="navbar-start">
        {/* MOBILE DROPDOWN */}
        <div className="dropdown relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <ul className="menu menu-sm dropdown-content mt-2 z-50 p-4 shadow-lg bg-white text-black rounded-box w-60 absolute left-0">
              {navOptions("light")}
            </ul>
          )}
        </div>

        <Link className="btn btn-ghost text-xl text-neutral-content">Bristo Boss</Link>
      </div>

      {/* DESKTOP MENU */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 items-center">{navOptions("dark")}</ul>
      </div>
    </div>
  );
};

export default NavBar;
