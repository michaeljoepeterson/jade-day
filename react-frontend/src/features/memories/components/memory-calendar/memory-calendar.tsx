import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' 
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import React, { useCallback, useEffect } from "react";

const MemoryCalendar = ({
    height = '45em',
    startDate = new Date(),
    dayClicked
}:{
    height?: string;
    startDate?: Date;
    dayClicked: (event: DateClickArg) => void;
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
    }, [startDate]);

    const handleDateClicked = useCallback((event: DateClickArg) => {
        console.log(event);
        try{
            dayClicked(event);
        }
        catch(e){
            console.warn(e);
        }
    }, [startDate]);

    return(
        <div className="h-full">
            <FullCalendar
            ref={calendar}
            height={height}
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            initialDate={startDate}
            dateClick={handleDateClicked}
            //todo add custom controls
            headerToolbar={undefined}
            />
        </div>
    )
}

export default MemoryCalendar;