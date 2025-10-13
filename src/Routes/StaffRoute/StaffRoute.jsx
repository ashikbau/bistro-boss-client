import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";


const StaffRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading, isStaff } = useRole();
  const location = useLocation();

  // Show loading while checking
  if (authLoading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  // If user is staff, allow access
  if (user && isStaff) {
    return children;
  }

  // Otherwise, redirect to home or login
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default StaffRoute;

