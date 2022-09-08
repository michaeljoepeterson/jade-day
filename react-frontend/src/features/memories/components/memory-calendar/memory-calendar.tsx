import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' 
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IMemory } from "../../../../models/memories/memory";
import CalendarControls from "./calendar-controls";

const MemoryCalendar = ({
    height = '45em',
    startDate,
    dayClicked,
    memories = [],
    eventClicked
}:{
    height?: string;
    startDate?: Date;
    dayClicked: (event: Date) => void;
    eventClicked: (event: Date) => void;
    memories?: IMemory[];
}) => {
    const calendar = React.createRef<FullCalendar>();
    const memoryEvents = useMemo<any[]>(() => memories.map(memory => ({
        title: memory.summary,
        date:  memory.date
    })), [memories]);
    const [currentDate, setCurrentDate] = useState<Date>(startDate ? startDate : new Date());

    useEffect(() => {
        setCurrentDate(startDate ? startDate : new Date());
    }, [startDate]);

    useEffect(() => {
        try{
            const api = calendar?.current?.getApi();
            api?.gotoDate(currentDate);
            console.log(api);
        }
        catch(e){
            console.warn(e);
        }
    }, [currentDate]);

    const handleDateClicked = useCallback((event: DateClickArg) => {
        try{
            dayClicked(event.date);
        }
        catch(e){
            console.warn(e);
        }
    }, [startDate, memories]);

    const handleEventClicked = useCallback((event: EventClickArg) => {
        try{
            if(event.event.start){
                eventClicked(event.event.start);
            }
        }
        catch(e){
            console.warn(e);
        }
    }, [memories, startDate]);

    const dateChanged = (date: Date) => {
        setCurrentDate(date);
    };

    return(
        <div className="h-full">
            <div>
                <CalendarControls
                    onDateChange={(date) => dateChanged(date)}
                />
            </div>
            <FullCalendar
                ref={calendar}
                height={height}
                plugins={[ dayGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                initialDate={startDate}
                dateClick={handleDateClicked}
                //todo add custom controls
                headerToolbar={false}
                events={memoryEvents}
                displayEventTime={false}
                eventClick={handleEventClicked}
            />
        </div>
    )
}

export default MemoryCalendar;