import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const ManageReviews = () => {
    const { user } = useAuth();        // must return {email: "..."}
    const queryClient = useQueryClient();
    const [editId, setEditId] = useState(null);
    const [editRating, setEditRating] = useState("");
    const [editDetails, setEditDetails] = useState("");
    const axiosSecure = useAxiosSecure();
    // Fetch my reviews
    const { data: myReviews = [], isLoading } = useQuery({
        queryKey: ["myReviews", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/myReviews", {
                params: { email: user.email },
            });
            return res.data;
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, rating, details }) =>
            axiosSecure.put(`/myReviews/${id}`, { rating, details }),
        onSuccess: () => queryClient.invalidateQueries(["myReviews", user.email]),
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/myReviews/${id}`),
        onSuccess: () => queryClient.invalidateQueries(["myReviews", user.email]),
    });

    const handleEditSave = (id) => {
        updateMutation.mutate({ id, rating: editRating, details: editDetails });
        setEditId(null);
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
            {myReviews.map((r) => (
                <div key={r._id} className="p-4 mb-4 bg-white shadow rounded">
                    {editId === r._id ? (
                        <>
                            <input
                                type="number"
                                min={1}
                                max={5}
                                value={editRating}
                                onChange={(e) => setEditRating(e.target.value)}
                                className="border p-2 mb-2 w-full"
                            />
                            <textarea
                                value={editDetails}
                                onChange={(e) => setEditDetails(e.target.value)}
                                className="border p-2 mb-2 w-full"
                            />
                            <button
                                className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                                onClick={() => handleEditSave(r._id)}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-400 text-white px-3 py-1 rounded"
                                onClick={() => setEditId(null)}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <p><strong>Name:</strong> {r.name}</p>
                            <p><strong>Rating:</strong> {r.rating}</p>
                            <p><strong>Details:</strong> {r.details}</p>
                            <button
                                className="bg-yellow-700 text-white px-3 py-1 rounded mr-2"
                                onClick={() => {
                                    setEditId(r._id);
                                    setEditRating(r.rating);
                                    setEditDetails(r.details);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-600 text-white px-3 py-1 rounded"
                                onClick={() => deleteMutation.mutate(r._id)}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ManageReviews;
