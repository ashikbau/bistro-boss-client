import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContex } from "../../../provider/AuthProvider";
import Swal from 'sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import useCart from "../../../hooks/useCart";

const NavBar = () => {
  const { user, logOutUser } = useContext(AuthContex);
  const [cart] = useCart();
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          title: "User Logged Out Successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        }).then(() => {
          navigate('/');
        });
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Logout failed",
          icon: "error",
        });
      });
  };

  const navLinkStyle = ({ isActive }) =>
    `block px-4 py-2 rounded font-bold transition duration-200
   ${isActive
      ? 'bg-white text-black' // Active: high contrast
      : 'text-gray-300 hover:text-white hover:bg-gray-700'
    }`;




  const navOptions = (
    <>
      <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
      <li><NavLink to="/menu" className={navLinkStyle}>Our Menu</NavLink></li>
      <li><NavLink to="/order/salad" className={navLinkStyle}>Order Food</NavLink></li>
      <li><NavLink to="/contact" className={navLinkStyle}>Contact</NavLink></li>
      <li><NavLink to="/book" className={navLinkStyle}>Booking</NavLink></li>
      <li>
        <NavLink to="/dashboard/cart" className="block px-4 py-2">
          <button className="btn">
            {isMounted && <FaShoppingCart className="mr-2" />}
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
        </NavLink>
      </li>
      {user ? (
        <div className="flex items-center gap-2 px-4 py-2">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="User Profile"
              className="w-10 h-10 rounded-full border-2 border-white"
              title={user.displayName || "User"}
            />
          ) : (
            isMounted && <FaUserCircle className="text-3xl" title={user.displayName || "User"} />

          )}
          <button onClick={handleLogOut} className="btn btn-ghost">SignOut</button>
        </div>
      ) : (
        <li><NavLink to="/login" className={navLinkStyle}>Login</NavLink></li>
      )}
    </>
  );

  return (
    <>
      <div className="navbar fixed z-10 bg-[#151515] text-neutral-content max-w-screen-lg w-full">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-50 p-4 shadow-lg bg-white text-black rounded-box w-60"
            >
              {navOptions}
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl text-neutral-content">Bristo Boss</Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;


