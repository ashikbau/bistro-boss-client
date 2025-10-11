import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContex } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
    const { user } = useContext(AuthContex);
    const axiosSecure = useAxiosSecure();

    const { data: isUser, isLoading: isUserLoading } = useQuery({
        queryKey: ['isUser', user?.email],
        queryFn: async () => {
            if (!user?.email) return false; // safety check

            const res = await axiosSecure.get(`/users/${encodeURIComponent(user.email)}`);
            // return true if role is "user", else false
            return res.data?.role === 'user';
        },
        enabled: !!user?.email,
        staleTime: 5 * 60 * 1000, // optional: cache for 5 mins
    });

    return [isUser, isUserLoading];
};

export default useUser;
