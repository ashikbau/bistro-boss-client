import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {
    const { name, recipe, image, price, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [,refetch] = useCart();

    const handleAddToCart = food => {
        // console.log(food)
        if (user && user.email) {
            //    to do
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }

            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to youe Cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }

                })



        }
        else {
            Swal.fire({
                title: "You Are Not LogIn",
                text: "Please login to add to Cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } })

                }
            });

        }

    }
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure className="px-10 pt-10">
                <img
                    src={image}
                    alt="Shoes"
                    className="rounded-xl" />

            </figure>
            <p className="bg-slate-900 text-neutral-content absolute right-0 mx-12 mt-16 px-4">{price}</p>
            <div className="card-body items-center text-center ">
                <h2 className="card-title">{name}</h2>
                <p >${recipe}</p>
                <div className="card-actions">
                    <button onClick={() => handleAddToCart(item)} className="btn  text-[#BB8506] border-1 border-x-0 border-t-0 border-b-4 border-yellow-600 mb-24">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;