import { Navigate, useLocation } from "react-router-dom";
import useRole from "../../hooks/useRole";

const StaffRoute = ({ children }) => {
  const { isStaff, roleLoading } = useRole();
  const location = useLocation();

  // Wait for role to load
  if (roleLoading) return <div className="text-center mt-10">Loading...</div>;

  // Allow staff
  if (isStaff) return children;

  // Redirect all others
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default StaffRoute;
