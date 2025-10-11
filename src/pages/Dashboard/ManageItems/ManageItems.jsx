import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useRole from "../../../hooks/useRole";


const ManageItems = () => {
    const [menu, loading, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();
    const { isAdmin } = useRole();

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    await refetch();

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500,
                        toast: true
                    });
                }


            }
        });
    }

    const handleToggleFeatured = (id, currentStatus) => {
        const newStatus = !currentStatus;
        console.log("Toggling featured:", id, "to", newStatus); // ✅ DEBUG LINE
        axiosSecure.patch(`/menu/feature/${id}`, { featured: newStatus })
            .then(res => {
                console.log("PATCH response:", res.data); // ✅ DEBUG LINE
                if (res.data.modifiedCount > 0) {
                    refetch(); // If you're using react-query or SWR
                    Swal.fire('Updated!', `Item is now ${newStatus ? 'Featured' : 'Not Featured'}`, 'success');
                }
            })
            .catch(err => {
                console.error("Error in toggleFeatured:", err);
                Swal.fire('Error', 'Could not update featured status', 'error');
            });
    };



    return (
        <div>
            <SectionTitle heading="Manage All Items" subHeading="Hurry up"></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                                <th>Featured</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) => <tr key={item._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td className="text-right">${item.price}</td>
                                    {isAdmin && (
                                        <>
                                            <td>
                                                <Link to={`/dashboard/updateItem/${item._id}`}>
                                                    <button className="btn btn-ghost btn-lg bg-orange-500">
                                                        <FaEdit className="text-white" />
                                                    </button>
                                                </Link>
                                            </td>

                                            <td>
                                                <button
                                                    onClick={() => handleDeleteItem(item)}
                                                    className="btn btn-ghost btn-lg"
                                                >
                                                    <FaTrashAlt className="text-red-600" />
                                                </button>
                                            </td>

                                            <td>
                                                <button
                                                    onClick={() => handleToggleFeatured(item._id, item.featured)}
                                                    className={`btn btn-xs ${item.featured ? "btn-success" : "btn-outline"}`}
                                                >
                                                    {item.featured ? "Featured" : "Not Featured"}
                                                </button>
                                            </td>
                                        </>
                                    )}

                                </tr>)
                            }
                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;