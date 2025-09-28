import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerBanner = ({ selectedDate, setSelectedDate }) => {
    return (
        <div className="bg-white mb-8 rounded shadow">
            <h2 className="text-lg text-center p-3 font-semibold mb-2">Select Date</h2>
            <div className='text-center w-full'>
                <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    minDate={new Date()}
                    inline
                    
                />
            </div>
        </div>
    );
};


export default DatePickerBanner;
