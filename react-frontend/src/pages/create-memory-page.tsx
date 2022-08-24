import { useState } from "react"
import MemoryCalendar from "../features/memories/memory-calendar/memory-calendar"
import withLoggedIn from "../HOC/withLoggedIn"

const CreateMemoryPage = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const updateDate = () => {
        setSelectedDate(new Date('2012/12/12'));
        console.log('update date');
    }

    return(
        <div>
            <h4 onClick={(e) => updateDate()}>Create a Memory</h4>
            <MemoryCalendar 
            startDate={selectedDate}/>
        </div>
    )
}

export default withLoggedIn(CreateMemoryPage);