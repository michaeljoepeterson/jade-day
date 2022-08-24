import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' 

const MemoryCalendar = ({
    height = '45em'
}:{
    height?: string;
}) => {
    return(
        <div className="h-full">
            <FullCalendar
            height={height}
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"/>
        </div>
    )
}

export default MemoryCalendar;