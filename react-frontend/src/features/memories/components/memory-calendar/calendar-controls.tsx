import { TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from "moment";
import { useCallback, useEffect, useState } from "react";


const CalendarControls = ({
    selectedDate
}: {
    onDateChange?: () => void;
    selectedDate?: Date | null;
}) => {
    const [value, setValue] = useState<Moment>(moment(selectedDate));

    useEffect(() => {
        console.log(selectedDate);
        setValue(moment(selectedDate ? selectedDate : new Date()));
    }, [selectedDate]);

    const handleDateChange = useCallback((val: any) => {
        setValue(val);
    }, []);
    
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDatePicker
                label="Select a Date"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}

export default CalendarControls;