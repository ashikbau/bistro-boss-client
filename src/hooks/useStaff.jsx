import { useContext } from 'react';
import { AuthContex } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useStaff = () => {
    const { user, loading } = useContext(AuthContex);
    const axiosSecure = useAxiosSecure();

    const { data: isStaff, isPending: isStaffLoading } = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: ['isStaff', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/staff/${user.email}`);
            return res.data?.staff;
        }
    });

    return [isStaff, isStaffLoading];
};

export default useStaff;
