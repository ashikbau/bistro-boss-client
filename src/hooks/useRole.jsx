import { useEffect, useState, useContext } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useRole = () => {
  const { user, loading: authLoading } = useAuth(); // from AuthProvider
  const axiosPublic = useAxiosPublic();

  const [role, setRole] = useState(null); // 'admin' | 'staff' | 'user' | null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setRole(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    axiosPublic
      .get(`/users/${user.email}`)
      .then(res => {
        setRole(res.data.role || "user"); // default to 'user' if backend missing
      })
      .catch(err => {
        console.error("Error fetching user role:", err);
        setRole(null);
      })
      .finally(() => setLoading(false));
  }, [user, axiosPublic]);

  // convenience booleans
  const isAdmin = role === "admin";
  const isStaff = role === "staff";
  const isUser = role === "user";

  return { role, isAdmin, isStaff, isUser, loading };
};

export default useRole;
