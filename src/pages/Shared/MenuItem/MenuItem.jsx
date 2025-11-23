// // staff cart hook
// import useCart from "../../../hooks/useCart";
// import useRole from "../../../hooks/useRole";
// const MenuItem = ({ item }) => {
//     const { name, price, image, recipe } = item;

//     const { addToCart } = useCart();
//     const { role, loading } = useRole();

//     const handleAddToCart = () => {
//         addToCart({
//             productId: item._id,
//             name,
//             price,
//             quantity: 1,
//             image,
//         });
//         alert(`✅ ${name} added to Cart`);
//     };

//     // Show nothing until role is loaded
//     if (loading || !role) return null;

//     // Only show Add to Cart if role is "user"
//     const showAddToCartButton = role === "user";

//     return (
//         <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="flex-shrink-0">
//                 <img
//                     src={image}
//                     alt={name}
//                     className="w-full md:w-28 md:h-28 object-cover"
//                     style={{ borderRadius: "0 200px 200px 200px" }}
//                 />
//             </div>

//             <div className="flex-1 p-4 flex flex-col justify-between">
//                 <div>
//                     <h3 className="uppercase font-semibold text-lg">{name}</h3>
//                     <p className="text-gray-600 mt-1">{recipe}</p>
//                 </div>

//                 <div className="flex items-center justify-between mt-3">
//                     <p className="text-yellow-500 font-bold">${price}</p>
//                     {showAddToCartButton && (
//                         <button
//                             onClick={handleAddToCart}
//                             className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
//                         >
//                             Add to Cart
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MenuItem;
import useStaffCart from "../../../hooks/useStaffCart";
import useAuth from "../../../hooks/useAuth";

const MenuItem = ({ item, cartType = "user" }) => {
    const { addToCart: addToStaffCart } = useStaffCart();
    const { user } = useAuth();

    const handleAddToCart = () => {
        if (cartType === "staff") {
            addToStaffCart({
                productId: item._id,
                name: item.name,
                price: item.price,
                quantity: 1,
                image: item.image,
            });
            alert(`✅ ${item.name} added to Staff Cart`);
        }
    };

    return (
        <div className="card bg-white shadow-md rounded-lg p-4">
            <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-lg" />
            <h3 className="mt-2 font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price}</p>

            {cartType === "staff" && (
                <button
                    onClick={handleAddToCart}
                    className="btn btn-yellow mt-2"
                >
                    Add to Staff Cart
                </button>
            )}
        </div>
    );
};

export default MenuItem;


