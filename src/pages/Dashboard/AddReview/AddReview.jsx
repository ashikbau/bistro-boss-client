// import { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import SectionTitle from "../../../components/SectionTitle/SectionTitle";

// const AddReview = () => {

//     const queryClient = useQueryClient();

//     const [name, setName] = useState("");
//     const [rating, setRating] = useState(5);
//     const [details, setDetails] = useState("");
//     const axiosSecure = useAxiosSecure()

//     const addReviewMutation = useMutation({
//         mutationFn: async (newReview) => {
//             const res = await axiosSecure.post("/addReview", newReview);
//             return res.data;
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["reviews"] });
//             setName("");
//             setRating(5);
//             setDetails("");
//             alert("Review submitted successfully!");
//         },
//         onError: () => {
//             alert("Failed to submit review!");
//         },
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         addReviewMutation.mutate({ name, rating, details });
//     };




//     return (

//         <div>
//             <SectionTitle
//                 subHeading="---REVIEWS---"
//                 heading="Add Your Valuable Reviews Here"

//             ></SectionTitle>
//             <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full p-2 border rounded"
//                     required
//                 />
//                 <input
//                     type="number"
//                     placeholder="Rating (1-5)"
//                     value={rating}
//                     onChange={(e) => setRating(Number(e.target.value))}
//                     min={1}
//                     max={5}
//                     className="w-full p-2 border rounded"
//                     required
//                 />
//                 <textarea
//                     placeholder="Your review details..."
//                     value={details}
//                     onChange={(e) => setDetails(e.target.value)}
//                     className="w-full p-2 border rounded"
//                     required
//                 />
//                 <button
//                     type="submit"
//                     className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-800"
//                 >
//                     Submit Review
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddReview;

import { useState, useContext, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { AuthContex } from "../../../provider/AuthProvider";

const AddReview = () => {
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContex);

    const [name, setName] = useState("");
    const [rating, setRating] = useState(5);
    const [details, setDetails] = useState("");

    useEffect(() => {
        // Auto-fill name if available
        if (user?.displayName) {
            setName(user.displayName);
        }
    }, [user]);

    const addReviewMutation = useMutation({
        mutationFn: async (newReview) => {
            const res = await axiosSecure.post("/addReview", newReview);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            setRating(5);
            setDetails("");
            alert(" Review submitted successfully!");
        },
        onError: () => {
            alert(" Failed to submit review!");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user || !user.email) {
            alert("You must be logged in to submit a review.");
            return;
        }

        const newReview = {
            name: name || "Anonymous",
            email: user.email, // ✅ Include email
            rating,
            details,
        };

        addReviewMutation.mutate(newReview);
    };

    return (
        <div>
            <SectionTitle
                subHeading="---REVIEWS---"
                heading="Add Your Valuable Reviews Here"
            />

            <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded max-w-xl mx-auto">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    readOnly //  Make it read-only to avoid editing
                    className="w-full p-2 border rounded bg-gray-100"
                />

                <input
                    type="number"
                    placeholder="Rating (1-5)"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    min={1}
                    max={5}
                    className="w-full p-2 border rounded"
                    required
                />

                <textarea
                    placeholder="Your review details..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />

                <button
                    type="submit"
                    className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-800"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default AddReview;
