import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' 
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import React, { useCallback, useEffect, useMemo } from "react";
import { IMemory } from "../../../../models/memories/memory";

const MemoryCalendar = ({
    height = '45em',
    startDate = new Date(),
    dayClicked,
    memories = []
}:{
    height?: string;
    startDate?: Date;
    dayClicked: (event: DateClickArg) => void;
    memories?: IMemory[];
}) => {
    const calendar = React.createRef<FullCalendar>();
    const memoryEvents = useMemo<any[]>(() => memories.map(memory => ({
        title: memory.summary,
        date:  memory.date
    })), [memories]);

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

    const handleEventClicked = useCallback(() => {
        console.log('event clicked');
    }, [memories]);

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
                events={memoryEvents}
                displayEventTime={false}
                eventClick={handleEventClicked}
            />
        </div>
    )
}

export default MemoryCalendar;