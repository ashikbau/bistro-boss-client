// routes/UserRoute.jsx
import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import useUser from "../hooks/useUser"; // you'll create this hook
import  { AuthContex } from "../provider/AuthProvider";


const UserRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContex);
  const [isUser, isUserLoading] = useUser();
  const location = useLocation();

  if (loading || isUserLoading) return <span>Loading...</span>;

  if (user && isUser) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default UserRoute;
