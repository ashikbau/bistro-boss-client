// import React from 'react';
// import useCart from '../../../hooks/useCart';
// import SectionTitle from '../../../components/SectionTitle/SectionTitle';
// import { FaTrashAlt } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { Link } from 'react-router-dom';

// const Cart = () => {
//     const [cart,refetch] = useCart();
//     const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
//     const axiosSecure = useAxiosSecure();
//     const handleDelete = id => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 // Swal.fire({
//                 //     title: "Deleted!",
//                 //     text: "Your file has been deleted.",
//                 //     icon: "success"
//                 // });
//                 axiosSecure.delete(`/carts/${id}`)
//                     .then(res => {
//                         if (res.data.deletedCount > 0) {
//                             refetch()
//                             Swal.fire({
//                                 title: "Deleted!",
//                                 text: "Your file has been deleted.",
//                                 icon: "success"
//                             });

//                         }
//                     })
//             }
//         });

//     }

//     return (
//         <div>
//             <div>
//                 <SectionTitle
//                     heading=" WANNA ADD MORE?"
//                     subHeading="My Cart"
//                 ></SectionTitle>
//             </div>
//             <div className='flex flex-col sm:flex-row sm:justify-evenly sm:items-center gap-4 p-4 mb-4'>
//                 <h2 className='text-2xl sm:text-3xl text-center'>Items : {cart.length}</h2>
//                 <h2 className='text-2xl sm:text-3xl text-center'>Total Price : ${totalPrice.toFixed(2)}</h2>
//                  {cart.length ? <Link to="/dashboard/orders">
//                     <button className="btn btn-primary">Pay</button>
//                 </Link>:
//                 <button disabled className="btn btn-primary">Pay</button>
//                 }
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="table w-full text-sm sm:text-base">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th>
//                                 Number
//                             </th>
//                             <th>Image</th>
//                             <th>Name</th>
//                             <th>Price</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             cart.map((item, index) => <tr key={item._id}>
//                                 <th>
//                                     {
//                                         index + 1
//                                     }
//                                 </th>
//                                 <td>
//                                     <div className="flex items-center gap-3">
//                                         <div className="avatar">
//                                             <div className="mask mask-squircle h-12 w-12">
//                                                 <img
//                                                     src={item.image}
//                                                     alt="Avatar Tailwind CSS Component" />
//                                             </div>
//                                         </div>

//                                     </div>
//                                 </td>
//                                 <td>
//                                     {item.name}

//                                 </td>
//                                 <td>{item.price}</td>
//                                 <th>
//                                     <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-lg">
//                                         <FaTrashAlt></FaTrashAlt>
//                                     </button>
//                                 </th>
//                             </tr>)
//                         }

//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     );
// };

// export default Cart;
import React from 'react';
import useCart from '../../../hooks/useCart';
import useAdmin from '../../../hooks/useAdmin'; // ✅ Import admin hook
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, refetch] = useCart();
    const [isAdmin] = useAdmin(); // ✅ Get admin status
    const axiosSecure = useAxiosSecure();

    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Item has been removed from your cart.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    return (
        <div>
            {/* Section Title */}
            <SectionTitle
                heading="WANNA ADD MORE?"
                subHeading="My Cart"
            />

            {/* Summary Row */}
            <div className='flex flex-col sm:flex-row sm:justify-evenly sm:items-center gap-4 p-4 mb-4'>
                <h2 className='text-2xl sm:text-3xl text-center'>Items: {cart.length}</h2>
                <h2 className='text-2xl sm:text-3xl text-center'>Total Price: ${totalPrice.toFixed(2)}</h2>

                {/* ✅ Pay button logic */}
                {
                    isAdmin ? (
                        <button className="btn btn-disabled" disabled>
                            Admins cannot order
                        </button>
                    ) : cart.length ? (
                        <Link to="/dashboard/orders">
                            <button className="btn btn-primary">Pay</button>
                        </Link>
                    ) : (
                        <button className="btn btn-disabled" disabled>Pay</button>
                    )
                }
            </div>

            {/* Cart Table */}
            <div className="overflow-x-auto">
                <table className="table w-full text-sm sm:text-base">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {
                            cart.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={item.image} alt="Food item" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-lg text-red-600">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;
