import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>;
    }

    if (user && isAdmin) {
        // ✅ Render children if passed directly OR Outlet for nested routes
        return children ? children : <Outlet />;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
