// import { useContext } from 'react';
// import { AuthContex } from '../provider/AuthProvider';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from './useAxiosSecure';

// const useStaff = () => {
//     const { user, loading } = useContext(AuthContex);
//     const axiosSecure = useAxiosSecure();

//     const { data: isStaff, isPending: isStaffLoading } = useQuery({
//         enabled: !loading && !!user?.email,
//         queryKey: ['isStaff', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/staff/${user.email}`);
//             return res.data?.staff;
//         }
//     });

//     return [isStaff, isStaffLoading];
// };

// export default useStaff;
import { useContext } from 'react';
import { AuthContex } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useStaff = () => {
    const { user, loading } = useContext(AuthContex);
    const axiosSecure = useAxiosSecure();

    const { data: isStaff = false, isLoading: isStaffLoading } = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: ['isStaff', user?.email],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/staff/${user.email}`);
                // Return a boolean, default to false if undefined
                return Boolean(res?.data?.staff);
            } catch (err) {
                console.error("Failed to fetch staff info:", err);
                return false;
            }
        }
    });

    return [isStaff, isStaffLoading];
};

export default useStaff;

