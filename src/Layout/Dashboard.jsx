import { FaBook, FaBox, FaEdit, FaEnvelope, FaHome, FaList, FaShoppingCart, FaStreetView, FaUser, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { BiFoodMenu } from "react-icons/bi";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";



const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    return (
        <div className="flex min-h-screen">
            <div className="w-64  bg-yellow-300 top-0 left-0">
                <ul className="menu">
                    {
                        isAdmin? <>
                        <li>
                        <NavLink to="/dashboard/adminHome">
                       <FaHome></FaHome>
                        Admin Home
                        </NavLink>
                        <NavLink to="/dashboard/addItems">
                        <FaUtensils></FaUtensils>
                        Add Items
                        </NavLink>
                        <NavLink to="/dashboard/manageItems">
                       <FaList></FaList>
                        Manage Items
                        </NavLink>
                        <NavLink to="/dashboard/manageBooking">
                       <FaBook></FaBook>
                        Manage Booking
                        </NavLink>
                        <NavLink to="/dashboard/users">
                       <FaUser></FaUser>
                        All Users
                        </NavLink>
                    </li>
                        
                        
                        </> : 
                        <>
                        <li>
                        <NavLink to="/dashboard/cart">
                        <FaShoppingCart></FaShoppingCart>
                        My Cart
                        </NavLink>
                        <NavLink to="/dashboard/review">
                        <FaStreetView></FaStreetView>
                        Add A Review
                        </NavLink>
                        <NavLink to="/dashboard/bookings">
                       <FaList></FaList>
                        My Bookings
                        </NavLink>
                    </li>
                        </>
                    }
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                        <FaHome></FaHome>Home
                        
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                        <BiFoodMenu size={24} className="" /> Menu
                        
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                        <FaEnvelope size={24} className="" /> Contact
                        
                        </NavLink>
                    </li>

                </ul>
                

            </div>
            <div className="flex-1 p-6 overflow-x-auto ">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;