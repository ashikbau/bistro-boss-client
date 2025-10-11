// // import {
// //     FaBook, FaHome, FaList, FaShoppingCart,
// //     FaStreetView, FaUser, FaUtensils, FaBars
// // } from "react-icons/fa";
// // import { BiFoodMenu } from "react-icons/bi";
// // import { NavLink, Outlet } from "react-router-dom";
// // import useCart from "../hooks/useCart";
// // import useAdmin from "../hooks/useAdmin";
// // import { useState } from "react";
// // import useStaff from "../hooks/useStaff";


// // const Dashboard = () => {
// //     const [cart] = useCart();
// //     const [isAdmin] = useAdmin();
// //     const [isStaff] = useStaff();
// //     const [open, setOpen] = useState(false); // sidebar toggle

// //     return (
// //         <div className="h-screen flex flex-col md:flex-row">

// //             {/* Mobile top bar */}
// //             <div className="flex items-center justify-between bg-yellow-300 md:hidden px-4 py-2">
// //                 <h1 className="font-bold text-lg">Dashboard</h1>
// //                 <button onClick={() => setOpen(!open)}>
// //                     <FaBars size={24} />
// //                 </button>
// //             </div>

// //             {/* Sidebar */}
// //             <aside
// //                 className={`
// //     bg-yellow-300 w-64 p-4 space-y-2
// //     absolute md:relative
// //     h-screen               
// //     transform md:translate-x-0
// //     ${open ? "translate-x-0" : "-translate-x-full"}
// //     transition-transform duration-300 ease-in-out
// //   `}
// //             >
// //                 <ul className="menu font-bold">
// //                     {isAdmin ? (
// //                         <>
// //                             <li><NavLink to="/dashboard/adminHome"><FaHome /> Admin Home</NavLink></li>
// //                             <li><NavLink to="/dashboard/addItems"><FaUtensils /> Add Items</NavLink></li>
// //                             <li><NavLink to="/dashboard/manageItems"><FaList /> Manage Items</NavLink></li>
// //                             <li><NavLink to="/dashboard/manageBooking"><FaBook /> Manage Booking</NavLink></li>
// //                             <li><NavLink to="/dashboard/users"><FaUser /> All Users</NavLink></li>
// //                             <li><NavLink to="/dashboard/api/messages"><FaUser /> All Messages</NavLink></li>
// //                         </>
// //                     ) : isStaff ? (
// //                         <>
// //                             <li><NavLink to="/dashboard/staffHome"><FaHome /> Staff Home</NavLink></li>
// //                             <li><NavLink to="/dashboard/handleBookings"><FaBook /> Manage Booking</NavLink></li>
// //                             <li><NavLink to="/dashboard/placeOrders"><FaShoppingCart /> Manage Orders</NavLink></li>
// //                         </>
// //                     ) : (
// //                         <>
// //                             <li><NavLink to="/dashboard/cart"><FaShoppingCart /> My Cart ({cart.length})</NavLink></li>
// //                             <li><NavLink to="/dashboard/addReview"><FaStreetView /> Add A Review</NavLink></li>
// //                             <li><NavLink to="/dashboard/myReviews"><FaBars /> Manage Reviews</NavLink></li>
// //                             <li><NavLink to="/dashboard/my-bookings"><FaList /> My Bookings</NavLink></li>
// //                             <li><NavLink to="/dashboard/userHome"><FaHome /> User Home</NavLink></li>
// //                         </>
// //                     )}

// //                     <div className="divider"></div>
// //                     <li><NavLink to="/"><FaHome /> Home</NavLink></li>
// //                     <li><NavLink to="/order/salad"><BiFoodMenu size={20} /> Menu</NavLink></li>
// //                     <li><NavLink to="/contact"><FaBook /> Contact</NavLink></li>
// //                     <li><NavLink to="/book"><FaBook /> Booking</NavLink></li>
// //                 </ul>
// //             </aside>

// //             {/* Main content */}
// //             <main className="flex-1 p-6 overflow-x-auto">
// //                 <Outlet />
// //             </main>
// //         </div>
// //     );
// // };

// // export default Dashboard;
// // Dashboard.jsx
// import {
//     FaBook, FaHome, FaList, FaShoppingCart,
//     FaStreetView, FaUser, FaUtensils, FaBars
// } from "react-icons/fa";
// import { BiFoodMenu } from "react-icons/bi";
// import { NavLink, Outlet } from "react-router-dom";
// import useCart from "../hooks/useCart";
// import useRole from "../hooks/useRole";
// import { useState } from "react";

// const Dashboard = () => {
//     const [cart] = useCart();
//     const { isAdmin, isStaff, isUser } = useRole(); // 
//     const [open, setOpen] = useState(false);



//     return (
//         <div className="h-screen flex flex-col md:flex-row">
//             {/* Mobile Header */}
//             <div className="flex items-center justify-between bg-yellow-300 md:hidden px-4 py-2">
//                 <h1 className="font-bold text-lg">Dashboard</h1>
//                 <button onClick={() => setOpen(!open)}>
//                     <FaBars size={24} />
//                 </button>
//             </div>

//             {/* Sidebar */}
//             <aside
//                 className={`bg-yellow-300 w-64 p-4 space-y-2 absolute md:relative h-screen transform md:translate-x-0
//         ${open ? "translate-x-0" : "-translate-x-full"}
//         transition-transform duration-300 ease-in-out`}
//             >
//                 <ul className="menu font-bold">
//                     {isAdmin && (
//                         <>
//                             <li><NavLink to="/dashboard/adminHome"><FaHome /> Admin Home</NavLink></li>
//                             <li><NavLink to="/dashboard/addItems"><FaUtensils /> Add Items</NavLink></li>
//                             <li><NavLink to="/dashboard/manageItems"><FaList /> Manage Items</NavLink></li>
//                             <li><NavLink to="/dashboard/manageBooking"><FaBook /> Manage Booking</NavLink></li>
//                             <li><NavLink to="/dashboard/users"><FaUser /> All Users</NavLink></li>
//                             <li><NavLink to="/dashboard/api/messages"><FaUser /> All Messages</NavLink></li>
//                         </>
//                     )}

//                     {isStaff &&  (
//                         <>
//                             <li><NavLink to="/dashboard/staffHome"><FaHome /> Staff Home</NavLink></li>
//                             <li><NavLink to="/dashboard/handleBookings"><FaBook /> Manage Booking</NavLink></li>
//                             <li><NavLink to="/dashboard/placeOrders"><FaShoppingCart /> Manage Orders</NavLink></li>
//                         </>
//                     )}

//                     {isUser &&  (
//                         <>
//                             <li><NavLink to="/dashboard/userHome"><FaHome /> User Home</NavLink></li>
//                             <li><NavLink to="/dashboard/cart"><FaShoppingCart /> My Cart ({cart.length})</NavLink></li>
//                             <li><NavLink to="/dashboard/addReview"><FaStreetView /> Add A Review</NavLink></li>
//                             <li><NavLink to="/dashboard/myReviews"><FaBars /> Manage Reviews</NavLink></li>
//                             <li><NavLink to="/dashboard/my-bookings"><FaList /> My Bookings</NavLink></li>
//                         </>
//                     )}

//                     <div className="divider"></div>
//                     <li><NavLink to="/"><FaHome /> Home</NavLink></li>
//                     <li><NavLink to="/order/salad"><BiFoodMenu size={20} /> Menu</NavLink></li>
//                     <li><NavLink to="/contact"><FaBook /> Contact</NavLink></li>
//                     <li><NavLink to="/book"><FaBook /> Booking</NavLink></li>
//                 </ul>
//             </aside>

//             {/* Main Content */}
//             <main className="flex-1 p-6 overflow-x-auto">
//                 <Outlet />
//             </main>
//         </div>
//     );
// };

// export default Dashboard;

import {
    FaBook, FaHome, FaList, FaShoppingCart,
    FaStreetView, FaUser, FaUtensils, FaBars
} from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
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
                <ul className="menu font-bold">
                    {/* Admin Links */}
                    {isAdmin && (
                        <>
                            <li><NavLink to="/dashboard/adminHome"><FaHome /> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/addItems"><FaUtensils /> Add Items</NavLink></li>
                            <li><NavLink to="/dashboard/manageItems"><FaList /> Manage Items</NavLink></li>
                            <li><NavLink to="/dashboard/managebooking"><FaBook /> Manage Booking</NavLink></li>
                            <li><NavLink to="/dashboard/users"><FaUser /> All Users</NavLink></li>
                            <li><NavLink to="/dashboard/api/messages"><FaUser /> All Messages</NavLink></li>
                        </>
                    )}

                    {/* Staff Links */}
                    {isStaff && (
                        <>
                            <li><NavLink to="/dashboard/staffHome"><FaHome /> Staff Home</NavLink></li>
                            <li><NavLink to="/dashboard/handleBookings"><FaBook /> Manage Booking</NavLink></li>
                            <li><NavLink to="/dashboard/placeOrders"><FaShoppingCart /> Manage Orders</NavLink></li>
                        </>
                    )}

                    {/* User Links */}
                    {isUser && (
                        <>
                            <li><NavLink to="/dashboard/userHome"><FaHome /> User Home</NavLink></li>
                            <li><NavLink to="/dashboard/cart"><FaShoppingCart /> My Cart ({cart.length})</NavLink></li>
                            <li><NavLink to="/dashboard/addReview"><FaStreetView /> Add A Review</NavLink></li>
                            <li><NavLink to="/dashboard/myReviews"><FaBars /> Manage Reviews</NavLink></li>
                            <li><NavLink to="/dashboard/my-bookings"><FaList /> My Bookings</NavLink></li>
                        </>
                    )}

                    <div className="divider"></div>
                    {/* Public Links */}
                    <li><NavLink to="/"><FaHome /> Home</NavLink></li>
                    <li><NavLink to="/order/salad"><BiFoodMenu size={20} /> Menu</NavLink></li>
                    <li><NavLink to="/contact"><FaBook /> Contact</NavLink></li>
                    <li><NavLink to="/book"><FaBook /> Booking</NavLink></li>
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


