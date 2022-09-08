import { TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from "moment";
import { useCallback, useEffect, useState } from "react";


const CalendarControls = ({
    selectedDate,
    onDateChange
}: {
    onDateChange: (date: Date) => void;
    selectedDate?: Date | null;
}) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const [value, setValue] = useState<Moment>(moment(selectedDate));

    useEffect(() => {
        setValue(moment(selectedDate ? selectedDate : new Date()));
    }, [selectedDate]);

    const handleDateChange = useCallback((val: Moment | null) => {
        if(!val){
            return;
        }
        setValue(val);
        onDateChange(val.toDate());
    }, []);
    
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl">
                    {monthNames[value.month()]}
                </h4>
                <MobileDatePicker
                    label="Select a Date"
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </div>
        </LocalizationProvider>
    );
}

export default CalendarControls;