// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { FaTrashAlt, FaUserShield, FaUserTie } from "react-icons/fa";
// import Swal from "sweetalert2";

// const AllUsers = () => {
//     const axiosSecure = useAxiosSecure();

//     const { data: users = [], refetch } = useQuery({
//         queryKey: ["users"],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/users');
//             return res.data;
//         }
//     });

//     // 🔐 Make Admin
//     const handleMakeAdmin = (user) => {
//         axiosSecure.patch(`/users/admin/${user._id}`)
//             .then(res => {
//                 if (res.data.modifiedCount > 0) {
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: `${user.name} is now an Admin!`,
//                         showConfirmButton: false,
//                         timer: 1500
//                     });
//                     refetch();
//                 }
//             })
//             .catch(() => {
//                 Swal.fire({
//                     icon: "error",
//                     title: "Error",
//                     text: "Failed to promote user to admin."
//                 });
//             });
//     };

//     // 🧑‍💼 Make Staff
//     const handleMakeStaff = (user) => {
//         axiosSecure.patch(`/users/staff/${user._id}`)
//             .then(res => {
//                 if (res.data.modifiedCount > 0) {
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: `${user.name} is now Staff!`,
//                         showConfirmButton: false,
//                         timer: 1500
//                     });
//                     refetch();
//                 }
//             })
//             .catch(() => {
//                 Swal.fire({
//                     icon: "error",
//                     title: "Error",
//                     text: "Failed to promote user to staff."
//                 });
//             });
//     };

//     // ❌ Delete User
//     const handleDeleteUser = (user) => {
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
//                 axiosSecure.delete(`/users/${user._id}`)
//                     .then(res => {
//                         if (res.data.deletedCount > 0) {
//                             Swal.fire({
//                                 title: "Deleted!",
//                                 text: "User has been deleted.",
//                                 icon: "success"
//                             });
//                             refetch();
//                         }
//                     })
//                     .catch(() => {
//                         Swal.fire({
//                             icon: "error",
//                             title: "Error",
//                             text: "Failed to delete user."
//                         });
//                     });
//             }
//         });
//     };

//     return (
//         <div>
//             <div className="flex justify-evenly my-4">
//                 <h2 className="text-lg font-semibold">Users Management</h2>
//                 <h2 className="text-lg">Total Users: {users.length}</h2>
//             </div>
//             <div className="overflow-x-auto w-full">
//                 <table className="table">
//                     {/* Table Head */}
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Current Role</th>
//                             <th>Promote</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>
//                     {/* Table Body */}
//                     <tbody>
//                         {users.map((user, index) => (
//                             <tr key={user._id}>
//                                 <th>{index + 1}</th>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td className="capitalize">{user.role || "user"}</td>

//                                 {/* Promote Buttons */}
//                                 <td className="flex gap-2">
//                                     {/* Show Admin Button only if not already admin */}
//                                     {user.role !== "admin" && (
//                                         <button
//                                             onClick={() => handleMakeAdmin(user)}
//                                             className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white"
//                                             title="Make Admin"
//                                         >
//                                             <FaUserShield />
//                                         </button>
//                                     )}

//                                     {/* Show Staff Button only if not already staff or admin */}
//                                     {user.role !== "staff" && user.role !== "admin" && (
//                                         <button
//                                             onClick={() => handleMakeStaff(user)}
//                                             className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
//                                             title="Make Staff"
//                                         >
//                                             <FaUserTie />
//                                         </button>
//                                     )}
//                                 </td>

//                                 {/* Delete Button */}
//                                 <td>
//                                     <button
//                                         onClick={() => handleDeleteUser(user)}
//                                         className="btn btn-ghost btn-lg text-red-600 hover:bg-red-100"
//                                         title="Delete User"
//                                     >
//                                         <FaTrashAlt />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>

//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AllUsers;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUserShield, FaUserTie, FaUserMinus } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    // 🔐 Make Admin
    const handleMakeAdmin = (user) => {
        axiosSecure
            .patch(`/users/admin/${user._id}`)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now an Admin!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to promote user to admin.",
                });
            });
    };

    // 🧑‍💼 Make Staff
    const handleMakeStaff = (user) => {
        axiosSecure
            .patch(`/users/staff/${user._id}`)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now Staff!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    refetch();
                }
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to promote user to staff.",
                });
            });
    };

    // 🔻 Demote to User
    const handleDemoteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `${user.name} will be demoted to User.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, demote!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/users/demote/${user._id}`)
                    .then((res) => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.name} is now a User`,
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            refetch();
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to demote user.",
                        });
                    });
            }
        });
    };

    // ❌ Delete User
    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/users/${user._id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success",
                            });
                            refetch();
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to delete user.",
                        });
                    });
            }
        });
    };

    return (
        <div>
            <div className="flex justify-between my-4">
                <h2 className="text-lg font-semibold">Users Management</h2>
                <h2 className="text-lg">Total Users: {users.length}</h2>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Current Role</th>
                            <th>Actions</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="capitalize">{user.role || "user"}</td>

                                {/* Promote / Demote Buttons */}
                                <td className="flex gap-2">
                                    {/* Admin button */}
                                    {user.role !== "admin" && (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white"
                                            title="Make Admin"
                                        >
                                            <FaUserShield />
                                        </button>
                                    )}

                                    {/* Staff button */}
                                    {user.role !== "staff" && user.role !== "admin" && (
                                        <button
                                            onClick={() => handleMakeStaff(user)}
                                            className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                                            title="Make Staff"
                                        >
                                            <FaUserTie />
                                        </button>
                                    )}

                                    {/* Demote to user button */}
                                    {(user.role === "admin" || user.role === "staff") && (
                                        <button
                                            onClick={() => handleDemoteUser(user)}
                                            className="btn btn-sm bg-gray-500 hover:bg-gray-600 text-white"
                                            title="Demote to User"
                                        >
                                            <FaUserMinus />
                                        </button>
                                    )}
                                </td>

                                {/* Delete Button */}
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-lg text-red-600 hover:bg-red-100"
                                        title="Delete User"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;

