import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerBanner = ({ selectedDate, setSelectedDate }) => {
    return (
        <div className="bg-white p-4 rounded shadow mb-6">
            <h2 className="text-lg font-semibold mb-2">Select Date</h2>
            <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                minDate={new Date()}
                inline
            />
        </div>
    );
};


export default DatePickerBanner;
