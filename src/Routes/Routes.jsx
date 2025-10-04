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
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import BookingPage from "../pages/Bookings/BookingPage/BookingPage";
import ManageBooking from "../pages/Dashboard/ManageBooking/ManageBooking";
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import AllMessages from "../pages/Dashboard/AllMessages/AllMessages";
import AddReview from "../pages/Dashboard/AddReview/AddReview";
import ManageReviews from "../pages/Dashboard/ManageReviews/ManageReviews";
import UserHome from "../pages/Dashboard/UserHome/UserHome";


// 



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
        path: "my-bookings",
        element: <MyBookings></MyBookings>
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
        element: <PrivateRoute><BookingPage></BookingPage></PrivateRoute>
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "cart",
        element: <Cart></Cart>
      },
      {
        path: "my-bookings",
        element: <MyBookings></MyBookings>
      },
      {
        path: 'orders',
        element: <Payment></Payment>
      },
      {
        path: 'addReview',
        element: <AddReview></AddReview>
      },
      {
        path: 'myReviews',
        element: <ManageReviews></ManageReviews>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>
      },
      {
        path: "userHome",
        element: <UserHome></UserHome>
      },
      {
        path: "users",
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: "addItems",
        element: <AdminRoute><AddItems></AddItems></AdminRoute>
      },
      {
        path: "manageItems",
        element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
      },
      {
        path: "managebooking",
        element: <AdminRoute><ManageBooking></ManageBooking></AdminRoute>
      },
      {
        path: "api/messages",
        element: <AdminRoute><AllMessages></AllMessages></AdminRoute>
      },
      {
        path: "updateItem/:id",
        element: <AdminRoute><UpdateItem /></AdminRoute>,
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:5000/menu/${params.id}`);
          if (!res.ok) throw new Error("Item not found");
          return res.json();
        }
      },



    ]
  }
]);
export default router;