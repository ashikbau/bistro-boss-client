import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";


const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (sessionId) {
            // Optionally verify the payment on backend
            axiosSecure.post("/verify-payment", { sessionId })
                .then(res => {
                    console.log("Payment verified:", res.data);
                })
                .catch(err => {
                    console.error("Error verifying payment:", err);
                });
        }
    }, [sessionId, axiosSecure]);

    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-4"> Payment Successful!</h2>
            <p className="text-gray-600 mb-6">Thank you for your payment. Your order has been confirmed.</p>
            <a
                href="/"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Go to Home
            </a>
        </div>
    );
};

export default PaymentSuccess;

