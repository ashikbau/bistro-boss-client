import { useState } from "react";
import AvailableTables from "../AvailableTables";
import BookingModal from "../BookingModal";
import DatePickerBanner from "../DatePickerBanner";
import useAdmin from "../../../hooks/useAdmin";

const BookingPage = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [slot, setSlot] = useState(null);
    const [isAdmin] = useAdmin();
    const handleSelectSlot = (selectedSlot) => {
        if (isAdmin) {
            Swal.fire({
                icon: 'warning',
                title: 'Admins cannot make bookings',
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }
        setSlot(selectedSlot);
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Book a Table</h1>

             {/* Date Picker */}
            <DatePickerBanner selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

            {/* Available Slots */}

            <AvailableTables selectedDate={selectedDate} onSelectSlot={handleSelectSlot} />

            {slot && (
                <BookingModal
                    date={selectedDate}
                    slot={slot}
                    onClose={() => setSlot(null)}
                />
            )}
        </div>
    );
};

export default BookingPage;
