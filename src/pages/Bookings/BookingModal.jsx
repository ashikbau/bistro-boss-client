// import { useState } from 'react';
// import useAxiosPublic from '../../hooks/useAxiosPublic';
// import useAdmin from '../../hooks/useAdmin'; // ✅ Import the hook

// const BookingModal = ({ date, slot, onClose }) => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [guests, setGuests] = useState(2);
//     const [status, setStatus] = useState('');
//     const [phone, setPhone] = useState('');

//     const axiosPublic = useAxiosPublic();
//     const [isAdmin] = useAdmin(); // ✅ Get admin status

//     const handleSubmit = e => {
//         e.preventDefault();

//         if (isAdmin) {
//             setStatus("Admins are not allowed to make bookings.");
//             return;
//         }

//         axiosPublic.post('/api/book', {
//             date: date.toISOString().split('T')[0],
//             time: slot,
//             name,
//             email,
//             phone,
//             guests
//         })
//             .then(() => setStatus('Reservation confirmed!'))
//             .catch(err => setStatus(err.response?.data?.error || 'Error'));
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-white rounded p-6 w-80 shadow-lg">
//                 <h3 className="text-xl font-semibold mb-4">
//                     Book {slot} on {date.toDateString()}
//                 </h3>

//                 {status ? (
//                     <>
//                         <p className={`mb-4 ${status.includes('confirmed') ? 'text-green-600' : 'text-red-600'}`}>
//                             {status}
//                         </p>
//                         <button onClick={onClose} className="bg-blue-500 text-white px-3 py-1 rounded">
//                             Close
//                         </button>
//                     </>
//                 ) : (
//                     <form onSubmit={handleSubmit} className="space-y-3">
//                         <input
//                             type="text"
//                             placeholder="Your Name"
//                             className="border p-2 w-full"
//                             value={name}
//                             onChange={e => setName(e.target.value)}
//                             required
//                             disabled={isAdmin}
//                         />
//                         <input
//                             type="email"
//                             placeholder="Your Email"
//                             className="border p-2 w-full"
//                             value={email}
//                             onChange={e => setEmail(e.target.value)}
//                             required
//                             disabled={isAdmin}
//                         />
//                         <input
//                             type="tel"
//                             placeholder="Your Phone Number"
//                             className="border p-2 w-full"
//                             value={phone}
//                             onChange={e => setPhone(e.target.value)}
//                             required
//                             disabled={isAdmin}
//                         />
//                         <input
//                             type="number"
//                             min={1}
//                             className="border p-2 w-full"
//                             value={guests}
//                             onChange={e => setGuests(e.target.value)}
//                             required
//                             disabled={isAdmin}
//                         />

//                         <div className="flex justify-end space-x-2">
//                             <button type="button" onClick={onClose}>Cancel</button>
//                             <button
//                                 type="submit"
//                                 className={`px-3 py-1 rounded text-white ${isAdmin ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500'
//                                     }`}
//                                 disabled={isAdmin}
//                             >
//                                 Confirm
//                             </button>
//                         </div>
//                     </form>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default BookingModal;
import { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAdmin from '../../hooks/useAdmin';
import useAuth from '../../hooks/useAuth'; // ✅ Import auth hook

const BookingModal = ({ date, slot, onClose }) => {
    const [name, setName] = useState('');
    const [guests, setGuests] = useState(2);
    const [status, setStatus] = useState('');
    const [phone, setPhone] = useState('');

    const axiosPublic = useAxiosPublic();
    const [isAdmin] = useAdmin();
    const { user } = useAuth(); // ✅ Get logged-in user info (assumes user.email exists)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isAdmin) {
            setStatus("Admins are not allowed to make bookings.");
            return;
        }

        if (!date || !slot) {
            setStatus("Invalid booking details.");
            return;
        }

        try {
            await axiosPublic.post('/api/book', {
                date: date.toISOString().split('T')[0],
                time: slot,
                name,
                email: user?.email, // ✅ Use logged-in user's email
                phone,
                guests
            });

            setStatus('Reservation confirmed!');
            setTimeout(onClose, 1500); // ✅ Auto-close after success
        } catch (err) {
            const errorMsg = err.response?.data?.error || err.message || 'Error occurred.';
            setStatus(errorMsg);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded p-6 w-80 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                    Book {slot} on {date?.toDateString()}
                </h3>

                {status ? (
                    <>
                        <p className={`mb-4 ${status.includes('confirmed') ? 'text-green-600' : 'text-red-600'}`}>
                            {status}
                        </p>
                        <button onClick={onClose} className="bg-blue-500 text-white px-3 py-1 rounded">
                            Close
                        </button>
                    </>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="border p-2 w-full"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            disabled={isAdmin}
                        />

                        {/* ✅ Pre-filled, read-only email field */}
                        <input
                            type="email"
                            className="border p-2 w-full bg-gray-100 text-gray-700 cursor-not-allowed"
                            value={user?.email || ''}
                            readOnly
                        />

                        <input
                            type="tel"
                            placeholder="Your Phone Number"
                            className="border p-2 w-full"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            required
                            disabled={isAdmin}
                        />
                        <input
                            type="number"
                            min={1}
                            className="border p-2 w-full"
                            value={guests}
                            onChange={e => setGuests(e.target.value)}
                            required
                            disabled={isAdmin}
                        />

                        <div className="flex justify-end space-x-2">
                            <button type="button" onClick={onClose}>Cancel</button>
                            <button
                                type="submit"
                                className={`px-3 py-1 rounded text-white ${isAdmin ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500'
                                    }`}
                                disabled={isAdmin}
                            >
                                Confirm
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BookingModal;

