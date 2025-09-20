import { useState } from "react";
import AvailableTables from "../AvailableTables";
import BookingModal from "../BookingModal";
import DatePickerBanner from "../DatePickerBanner";

const BookingPage = () => {
    // ✅ Declare state
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [slot, setSlot] = useState(null);

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Book a Table</h1>

            {/* Pass state as props */}
            <DatePickerBanner selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

            <AvailableTables selectedDate={selectedDate} onSelectSlot={setSlot} />

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
