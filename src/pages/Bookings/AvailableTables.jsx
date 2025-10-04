// import { useEffect, useState } from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';

// const AvailableTables = ({ selectedDate, onSelectSlot }) => {
//     const [slots, setSlots] = useState([]);
//     const dateStr = selectedDate.toISOString().split('T')[0];
//     const axiosSecure = useAxiosSecure();

//     useEffect(() => {
//         axiosSecure.get(`/api/slots?date=${dateStr}`)
//             .then(res => setSlots(res.data));
//     }, [dateStr, axiosSecure]);

//     return (
//         <div className="bg-white p-4 rounded shadow">
//             <h2 className="text-lg text-center font-semibold mb-3">
//                 Available Times for {selectedDate.toDateString()}
//             </h2>
//             <div className="grid grid-cols-3 gap-3">
//                 {slots.map(s => (
//                     <button
//                         key={s.time}
//                         disabled={!s.available}
//                         onClick={() => onSelectSlot(s.time)}
//                         className={`p-2 rounded border 
//               ${s.available
//                                 ? 'bg-green-200 hover:bg-green-300'
//                                 : 'bg-gray-300 cursor-not-allowed'}`}
//                     >
//                         {s.time}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AvailableTables;
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAdmin from '../../hooks/useAdmin'; // ✅ Import admin hook

const AvailableTables = ({ selectedDate, onSelectSlot }) => {
    const [slots, setSlots] = useState([]);
    const dateStr = selectedDate.toISOString().split('T')[0];
    const axiosSecure = useAxiosSecure();
    const [isAdmin] = useAdmin(); // ✅ Get admin status

    useEffect(() => {
        axiosSecure.get(`/api/slots?date=${dateStr}`)
            .then(res => setSlots(res.data));
    }, [dateStr, axiosSecure]);

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg text-center font-semibold mb-3">
                Available Times for {selectedDate.toDateString()}
            </h2>
            <div className="grid grid-cols-3 gap-3">
                {slots.map(s => {
                    const disabled = !s.available || isAdmin; // Block for admin
                    return (
                        <button
                            key={s.time}
                            disabled={disabled}
                            onClick={() => onSelectSlot(s.time)}
                            title={isAdmin ? 'Admins cannot book tables' : s.available ? 'Select time' : 'Unavailable'}
                            className={`p-2 rounded border text-center transition
                                ${disabled
                                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                    : 'bg-green-200 hover:bg-green-300'}`}
                        >
                            {s.time}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default AvailableTables;

