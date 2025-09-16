import { useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContex } from "../../../provider/AuthProvider";
import Swal from 'sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import useCart from "../../../hooks/useCart";


const NavBar = () => {
  const { user, logOutUser } = useContext(AuthContex);
  useEffect(() => {
  if (user) {
    // console.log('User data updated:', user);
    // console.log('photoURL:', user.photoURL);
  }
}, [user]);
  
  const [cart] = useCart();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          title: "User LogOut Successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        }).then(() => {
          navigate('/'); // ✅ Navigate to home after alert closes
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




  const navOptions = <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/menu">Our Menu</NavLink></li>
    <li><NavLink to="/order/salad">Order Food</NavLink></li>
    <li><NavLink to="/contact">Contact</NavLink></li>
    <li><NavLink to="/secret">Secret</NavLink></li>
    <li><NavLink to="/dashboard/cart">
      <button  className="btn">
        <FaShoppingCart className="mr-2"></FaShoppingCart>
        <div className="badge  badge-secondary">+{cart.length}</div>
      </button>
    </NavLink></li>
    

    {
      // user ? <>
      //   {/* <span>{user?.displayName}</span> */}
      //   <button onClick={handleLogOut} className="btn btn-ghost">SignOut</button></> :
      //   <><li><NavLink to="/login">Login</NavLink></li></>
    }
    {
  user ? (
    <div className="flex items-center gap-2">
      {
        user.photoURL ? (
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-10 h-10 rounded-full border-2 border-white"
            title={user.displayName || "User"}
          />
        ) : (
          <FaUserCircle className="text-3xl" title={user.displayName || "User"} />
        )
      }
      <button onClick={handleLogOut} className="btn btn-ghost">SignOut</button>
    </div>
  ) : (
    <li><NavLink to="/login">Login</NavLink></li>
  )
}


  </>
  return (
    <>
      <div className="navbar fixed z-10 bg-[#151515] text-neutral-content max-w-screen-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {
                navOptions
              }
            </ul>
          </div>
          <a className="btn btn-ghost text-xl text-neutral-content">Bristo Boss</a>


        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {
              navOptions
            }
          </ul>
        </div>
        <div className="navbar-end">
          <button
            onClick={() => {
              Swal.default.fire({
                title: 'It works!',
                text: 'SweetAlert2 is working!',
                icon: 'success',
                confirmButtonText: 'Nice!'
              });
            }}
            className="btn"
          >
            Test Alert
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;