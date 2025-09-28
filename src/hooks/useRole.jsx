// hooks/useRole.js
import { useContext, useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContex } from '../provider/AuthProvider';

const useRole = () => {
  const { user } = useContext(AuthContex);
  const [role, setRole] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/role/${user.email}`)
        .then(res => {
          setRole(res.data.role); // 'admin' or 'user'
        })
        .catch(() => setRole(null));
    }
  }, [user, axiosSecure]);

  return role;
};

export default useRole;
