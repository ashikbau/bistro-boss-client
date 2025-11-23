

import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import ContactManager from "../pages/Contact/ContactManager";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import AdminRoute from "./AdminRoute";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";

import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import BookingPage from "../pages/Bookings/BookingPage/BookingPage";
import ManageBooking from "../pages/Dashboard/ManageBooking/ManageBooking";
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import AllMessages from "../pages/Dashboard/AllMessages/AllMessages";
import AddReview from "../pages/Dashboard/AddReview/AddReview";
import ManageReviews from "../pages/Dashboard/ManageReviews/ManageReviews";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import UserRoute from "./UserRoute"; // ✅ import this
import StaffHome from "../pages/Dashboard/StaffHome/StaffHome";
import StaffRoute from "./StaffRoute/StaffRoute";
// import HandleBookings from "../pages/Dashboard/StaffHome/HandleBookings";
import PlaceOrders from "../pages/Dashboard/StaffHome/PlaceOrders";
import StaffMenu from "../pages/Menu/StaffMenu";
import PaymentSuccess from "../pages/PaymentSuccess";
import Payment from "../pages/Dashboard/Payment/Payment";
import StaffCart from "../pages/StaffCart/StaffCart";

import StaffBookings from "../pages/Dashboard/StaffHome/StaffBookings";
import HandleBookings from "../pages/Dashboard/StaffHome/HandleBookings";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/menu",
        element: <Menu></Menu>
      },
      {
        path: "/order/:category",
        element: <Order></Order>
      },
      {
        path: "/contact",
        element: <ContactManager></ContactManager>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path: "/book",
        element: <PrivateRoute><BookingPage /></PrivateRoute>
      },
      {
        path: "/payment-success",
        element: <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute>
      }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "staffCart",
        element: <StaffCart></StaffCart>
      },
      {
        path: "my-bookings",
        element: <MyBookings />
      },
      {
        path: "orders",
        element:<Payment></Payment> 
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />
      },
      {
        path: "userHome",
        element: <UserHome />
      },
      {
        path: "addReview",
        element: <UserRoute><AddReview /></UserRoute> 
      },
      {
        path: "myReviews",
        element: <UserRoute><ManageReviews /></UserRoute> 
      },
      {
        path: "staffHome",
        element: <StaffRoute><StaffHome></StaffHome></StaffRoute>
      },

      {
        path: "staff-menu",
        element: <StaffRoute><StaffMenu></StaffMenu></StaffRoute>
      },
      {
        path: "staff-bookings",
        element: <StaffRoute><StaffBookings></StaffBookings></StaffRoute>
      },
      {
        path: "handleBookings",
        element: <StaffRoute><HandleBookings></HandleBookings></StaffRoute>
      },
      {
        path: "placeOrders",
        element: <StaffRoute><PlaceOrders></PlaceOrders></StaffRoute>
      },
      {
        path: "adminHome",
        element: <AdminRoute><AdminHome /></AdminRoute>
      },
      {
        path: "users",
        element: <AdminRoute><AllUsers /></AdminRoute>
      },
      {
        path: "addItems",
        element: <AdminRoute><AddItems /></AdminRoute>
      },
      {
        path: "manageItems",
        element: <AdminRoute><ManageItems /></AdminRoute>
      },
      {
        path: "managebooking",
        element: <AdminRoute><ManageBooking /></AdminRoute>
      },
      {
        path: "api/messages",
        element: <AdminRoute><AllMessages /></AdminRoute> 
      },
      {
        path: "updateItem/:id",
        element: <AdminRoute><UpdateItem /></AdminRoute>,
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:5000/menu/${params.id}`);
          
          if (!res.ok) {
            throw new Response("Item not found", { status: 404 });
          }
          return res.json(); 
        }
      }
    ]
  },
]);

export default router;

