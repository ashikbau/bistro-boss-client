

// const MenuItem = ({item}) => {
//     const {name,price,image,recipe} = item;
//     return (



//           <div className="flex space-x-4">
//             <img style={{borderRadius: "0 200px 200px 200px"}} src={image} alt="" className="w-[100px]" />
//             <div>
//                 <h3 className="uppercase">{name}</h3>
//                 <p>{recipe}</p>

//             </div>
//             <p className="text-yellow-500">${price}</p>

//         </div>

//     );
// };

// export default MenuItem;
// user cart hook

// staff cart hook
import useCart from "../../../hooks/useCart";
import useStaffCart from "../../../hooks/useStaffCart";
const MenuItem = ({ item, cartType = "user" }) => {
    const { name, price, image, recipe } = item;

    // User cart (array)
    const { userCart, refetchUserCart } = useCart();

    // Staff cart (object)
    const { addToCart: addToStaffCart } = useStaffCart();

    const handleAddToCart = () => {
        try {
            if (cartType === "staff") {
                addToStaffCart({
                    productId: item._id,
                    name,
                    price,
                    quantity: 1,
                    image,
                });
                alert(`✅ ${name} added to Staff Cart`);
            } else {
                // For user, call your existing API or hook logic
                alert(`✅ ${name} added to User Cart`);
            }
        } catch (err) {
            console.error(err);
            alert("❌ Failed to add item to cart");
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image */}
            <div className="flex-shrink-0">
                <img
                    src={image}
                    alt={name}
                    className="w-full md:w-28 md:h-28 object-cover"
                    style={{ borderRadius: "0 200px 200px 200px" }}
                />
            </div>

            {/* Info */}
            <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="uppercase font-semibold text-lg">{name}</h3>
                    <p className="text-gray-600 mt-1">{recipe}</p>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between mt-3">
                    <p className="text-yellow-500 font-bold">${price}</p>
                    <button
                        onClick={handleAddToCart}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;
