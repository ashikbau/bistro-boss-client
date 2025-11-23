

import {
    FaBook, FaHome, FaList, FaShoppingCart,
    FaStreetView, FaUser, FaUtensils, FaBars,
    FaClipboardList,
    FaUtensilSpoon
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useRole from "../hooks/useRole";
import { useState } from "react";


const Dashboard = () => {
    const [cart] = useCart();
    const { isAdmin, isStaff, isUser } = useRole();
   
    const [open, setOpen] = useState(false);
   


    return (
        <div className="h-screen flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="flex items-center justify-between bg-yellow-300 md:hidden px-4 py-2">
                <h1 className="font-bold text-lg">Dashboard</h1>
                <button onClick={() => setOpen(!open)}>
                    <FaBars size={24} />
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`bg-yellow-300 w-64 p-4 space-y-2 absolute md:relative h-screen transform md:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 ease-in-out`}
            >
                <ul className="menu space-y-3">

                    {/* Admin Links */}
                    {isAdmin && (
                        <>
                            <li><NavLink to="/dashboard/adminHome"><FaHome /> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/addItems"><FaUtensils /> Add Items</NavLink></li>
                            <li><NavLink to="/dashboard/manageItems"><FaList /> Manage Items</NavLink></li>
                            <li><NavLink to="/dashboard/managebooking"><FaBook /> Manage Booking</NavLink></li>
                            <li><NavLink to="/dashboard/users"><FaUser /> All Users</NavLink></li>
                            <li><NavLink to="/dashboard/api/messages"><FaUser /> All Messages</NavLink></li>
                            <li><NavLink to="/"><FaHome /> Main Home</NavLink></li></>
                    )}


                    {/* Staff Links */}
                    {isStaff && (
                        <>
                            <li>
                                <NavLink to="/dashboard/staffHome">
                                    <FaHome /> Staff Home
                                </NavLink>
                            </li>
                            <NavLink to="/dashboard/staff-menu" className="flex items-center gap-2">
                                <FaUtensilSpoon /> Staff Menu
                            </NavLink>
                            <li>
                                <NavLink to="/dashboard/handleBookings">
                                    <FaBook /> Manage Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/staff-bookings">
                                    <FaBook /> Manage Staff Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/placeOrders">
                                    <FaClipboardList /> Staff Cart
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink to="/dashboard/placeOrders" className="flex items-center gap-2 relative">
                                    <FaClipboardList /> Staff Cart

                                    {staffCart.length > 0 && (
                                        <span className="badge badge-warning text-white absolute -right-4">
                                            {staffCart.length}
                                        </span>
                                    )}
                                </NavLink>
                            </li> */}
                            <div className="divider"></div>
                            <h3 className="text-sm font-semibold text-gray-500 ml-4 mt-2">Quick Access</h3>

                            <li>
                                <NavLink to="/">
                                    <FaHome /> Main Home
                                </NavLink>
                            </li>
                        </>
                    )}


                    {/* User Links */}
                    {isUser && (
                        <>
                            <li><NavLink to="/dashboard/userHome"><FaHome /> User Home</NavLink></li>
                            <li><NavLink to="/dashboard/cart"><FaShoppingCart /> My Cart ({cart?.length || 0})</NavLink></li>
                            <li><NavLink to="/dashboard/addReview"><FaStreetView /> Add A Review</NavLink></li>
                            <li><NavLink to="/dashboard/myReviews"><FaBars /> Manage Reviews</NavLink></li>
                            <li><NavLink to="/dashboard/my-bookings"><FaList /> My Bookings</NavLink></li>
                            <li><NavLink to="/"><FaHome /> Main Home</NavLink></li>
                        </>
                    )}
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-x-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
