import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // for admin token


const AllMessages = () => {
    const axiosSecure = useAxiosSecure();
    const [messages, setMessages] = useState([]);
    const [replyText, setReplyText] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axiosSecure.get("/api/messages");
                setMessages(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMessages();
    }, []);

    const handleReply = async () => {
        if (!replyText || !selectedId) return alert("Enter a reply");

        try {
            await axiosSecure.post("/api/messages/reply", {
                messageId: selectedId,
                reply: replyText,
            });
            alert("Reply sent!");
            setReplyText("");
            setSelectedId(null);
            // Update messages locally
            setMessages(prev => prev.map(m => m._id === selectedId ? { ...m, reply: replyText } : m));
        } catch (err) {
            console.error(err);
            alert("Failed to send reply");
        }
    };
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">User Messages</h2>
            <div className="space-y-4">
                {messages.map(msg => (
                    <div key={msg._id} className="p-4 bg-white shadow rounded">
                        <p><strong>Name:</strong> {msg.name}</p>
                        <p><strong>Email:</strong> {msg.email}</p>
                        <p><strong>Phone:</strong> {msg.phone}</p>
                        <p><strong>Message:</strong> {msg.message}</p>
                        {msg.reply && (
                            <p className="text-green-600"><strong>Replied:</strong> {msg.reply}</p>
                        )}
                        <textarea
                            value={selectedId === msg._id ? replyText : ""}
                            onChange={(e) => {
                                setSelectedId(msg._id);
                                setReplyText(e.target.value);
                            }}
                            className="w-full p-2 mt-2 border rounded"
                            placeholder="Type your reply..."
                        />
                        <button
                            onClick={handleReply}
                            className="mt-2 bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-800"
                        >
                            Send Reply
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllMessages;