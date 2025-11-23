

import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import useStaffCart from "../../hooks/useStaffCart";

const FoodCard = ({ item, cartType = "user" }) => {
    const { name, recipe, image, price, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();
    const { addToCart: addToStaffCart } = useStaffCart();

    const handleAddToCart = () => {
        if (cartType === "staff") {
            addToStaffCart({
                productId: _id,
                name,
                price,
                quantity: 1,
                image,
            });
            Swal.fire({
                icon: "success",
                title: `${name} added to Staff Cart`,
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            // user cart
            if (user && user.email) {
                const cartItem = { menuId: _id, email: user.email, name, image, price };
                axiosSecure.post("/carts", cartItem).then((res) => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your Cart`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        refetch();
                    }
                });
            } else {
                Swal.fire({
                    title: "You Are Not Logged In",
                    text: "Please login to add to Cart",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, login!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/login", { state: { from: location } });
                    }
                });
            }
        }
    };

    // Role-based button visibility
    const showButton =
        (cartType === "user" && user?.role === "user") ||
        (cartType === "staff" && user?.role === "staff");

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure className="px-10 pt-10">
                <img src={image} alt={name} className="rounded-xl" />
            </figure>
            <p className="bg-slate-900 text-neutral-content absolute right-0 mx-12 mt-16 px-4">${price}</p>
            <div className="card-body items-center text-center ">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                {showButton && (
                    <div className="card-actions">
                        <button
                            onClick={handleAddToCart}
                            className="btn text-[#BB8506] border-1 border-x-0 border-t-0 border-b-4 border-yellow-600 mb-24"
                        >
                            Add To Cart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodCard;
