import { useQueries, useQuery } from "@tanstack/react-query";
import { use, useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";

import { AuthContex } from "../provider/AuthProvider";


const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContex)

    const {data:cart=[],refetch} = useQuery({
        queryKey:['cart', user?.email],
        queryFn: async()=>{
            // const res = await axiosSecure.get(`/carts?email=${user.email}`);
            const res = await axiosSecure.get(`/carts?email=${user.email}`)
            return res.data
        }

    })
    return [cart,refetch]
};

export default useCart;