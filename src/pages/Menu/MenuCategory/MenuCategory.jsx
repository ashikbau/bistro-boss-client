// // import { Link } from "react-router-dom";
// // import Cover from "../../Shared/Cover/Cover";
// // import MenuItem from "../../Shared/MenuItem/MenuItem";


// // const MenuCategory = ({ items,title,img }) => {
// //     return (
// //         <div className="mb-10">
// //              {title && <Cover img = {img} title={title}></Cover>}
// //             <div className=' grid md:grid-cols-2 gap-10 my-16'>
// //                 {
// //                     items.map(item => <MenuItem
// //                         key={item._id}
// //                         item={item}

// //                     ></MenuItem>)
// //                 }
// //             </div>
// //            <div className="flex justify-center mt-4">
// //     <Link to={`/order/${title}`}>
// //       <button className="btn btn-outline border-0 border-b-4">Order Food Now</button>
// //     </Link>
// //   </div>
// //         </div>
// //     );
// // };

// // export default MenuCategory;
// import { Link } from "react-router-dom";
// import Cover from "../../Shared/Cover/Cover";
// import MenuItem from "../../Shared/MenuItem/MenuItem";

// const MenuCategory = ({ items, title, img, cartType = "user" }) => {
//     return (
//         <div className="mb-10">
//             {title && <Cover img={img} title={title} />}

//             <div className="grid md:grid-cols-2 gap-10 my-16">
//                 {items.map(item => (
//                     <MenuItem
//                         key={item._id}
//                         item={item}
//                         cartType={cartType} // forward cartType
//                     />
//                 ))}
//             </div>

//             <div className="flex justify-center mt-4">
//                 <Link to={`/order/${title}`}>
//                     <button className="btn btn-outline border-0 border-b-4">
//                         Order Food Now
//                     </button>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default MenuCategory;
import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, img, cartType = "user" }) => {
    return (
        <div className="mb-10 p-6 rounded-xl">
            {title && <Cover img={img} title={title} />}

            <div className="grid md:grid-cols-2 gap-10 my-16">
                {items.map(item => (
                    <MenuItem key={item._id} item={item} cartType={cartType} />
                ))}
            </div>

            <div className="flex justify-center mt-4">
                <Link
                    to={cartType === "staff" ? "/dashboard/placeOrders" : `/order/${title}`}
                >
                    <button className="btn btn-outline border-0 border-b-4">
                        {cartType === "staff" ? "Proceed to Create Order" : "Order Food Now"}
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;

