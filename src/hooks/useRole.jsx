
import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

/**
 * Custom hook: useRole()
 * ----------------------------------
 * Fetches the logged-in user's role from the backend.
 * Returns: { role, isAdmin, isStaff, isUser, loading }
 */
const useRole = () => {
  const { user, loading: authLoading } = useAuth(); // from your AuthProvider
  const axiosPublic = useAxiosPublic();

  const [role, setRole] = useState(null); // can be 'admin' | 'staff' | 'user' | null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // prevent memory leaks on unmount

    // If user isn't logged in, reset role and stop loading
    if (!user?.email) {
      setRole(null);
      setLoading(false);
      return;
    }

    // Wait until auth is fully loaded before fetching role
    if (authLoading) return;

    setLoading(true);

    axiosPublic
      .get(`/users/${user.email}`)
      .then(res => {
        if (isMounted) {
          // Use 'user' as fallback if role not defined in backend
          setRole(res.data.role || "user");
        }
      })
      .catch(err => {
        console.error("Error fetching user role:", err);
        if (isMounted) {
          setRole(null);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [user, authLoading, axiosPublic]);

  // convenience flags
  const isAdmin = role === "admin";
  const isStaff = role === "staff";
  const isUser = role === "user";

  return { role, isAdmin, isStaff, isUser, loading };
};

export default useRole;

