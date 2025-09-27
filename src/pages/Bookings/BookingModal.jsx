import { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const BookingModal = ({ date, slot, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [guests, setGuests] = useState(2);
    const [status, setStatus] = useState('');
    const [phone, setPhone] = useState('');

    const axiosPublic = useAxiosPublic();

    const handleSubmit = e => {
        e.preventDefault();
        axiosPublic.post('/api/book', {
            date: date.toISOString().split('T')[0],
            time: slot,
            name,
            email,
            phone,
            guests
        })
            .then(() => setStatus('Reservation confirmed!'))
            .catch(err => setStatus(err.response?.data?.error || 'Error'));
    };



    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded p-6 w-80">
                <h3 className="text-xl font-semibold mb-4">
                    Book {slot} on {date.toDateString()}
                </h3>

                {status ? (
                    <>
                        <p className="text-green-600 mb-4">{status}</p>
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
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="border p-2 w-full"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Your Phone Number"
                            className="border p-2 w-full"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            required // or make optional if SMS is optional
                        />

                        <input
                            type="number"
                            min={1}
                            className="border p-2 w-full"
                            value={guests}
                            onChange={e => setGuests(e.target.value)}
                            required
                        />
                        <div className="flex justify-end space-x-2">
                            <button type="button" onClick={onClose}>Cancel</button>
                            <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
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