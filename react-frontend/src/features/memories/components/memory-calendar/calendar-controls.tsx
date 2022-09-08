import { TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, { Moment } from "moment";
import { useCallback, useEffect, useState } from "react";
import { IMemory } from "../../../../models/memories/memory";


const CalendarControls = ({
    selectedDate,
    onDateChange,
    memories = []
}: {
    onDateChange: (date: Date) => void;
    selectedDate?: Date | null;
    memories?: IMemory[];
}) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const [value, setValue] = useState<Moment>(moment(selectedDate));
    const [memoryLookup, setMemoryLookup] = useState<Map<string, IMemory>>(new Map);

    useEffect(() => {
        setValue(moment(selectedDate ? selectedDate : new Date()));
    }, [selectedDate]);

    useEffect(() => {
        const lookup = new Map();
        memories.forEach(memory => {
            if(memory.date){
                lookup.set(memory.date.toDateString(), memory);
            }
        })
        setMemoryLookup(lookup);
    }, [memories]);

    const handleDateChange = useCallback((val: Moment | null) => {
        if(!val){
            return;
        }
        setValue(val);
        onDateChange(val.toDate());
    }, []);

    const renderDay = (day: Moment, selected: Moment[], props: PickersDayProps<Moment>) => {
        const dateString = day.toDate().toDateString();
        if(memoryLookup.has(dateString)){
            return (
                <PickersDay 
                    className="bg-primary text-white"
                    {...props}
                />
            );
        }
        return (
            <PickersDay
                {...props}
            />
        );
    }
    
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl">
                    {monthNames[value.month()]}
                </h4>
                <MobileDatePicker
                    renderDay={renderDay}
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