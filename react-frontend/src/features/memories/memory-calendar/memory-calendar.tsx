import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' 
import React, { useEffect } from "react";

const MemoryCalendar = ({
    height = '45em',
    startDate = new Date()
}:{
    height?: string;
    startDate?: Date
}) => {
    const calendar = React.createRef<FullCalendar>();

    useEffect(() => {
        try{
            const api = calendar?.current?.getApi();
            api?.gotoDate(startDate);
        }
        catch(e){
            console.warn(e);
        }
    }, [startDate])

    return(
        <div className="h-full">
            <FullCalendar
            ref={calendar}
            height={height}
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            initialDate={startDate}/>
        </div>
    )
}

export default MemoryCalendar;