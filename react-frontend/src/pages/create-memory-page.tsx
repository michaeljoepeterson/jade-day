import { DateClickArg } from "@fullcalendar/interaction";
import { useCallback, useState } from "react"
import withMemoryModal, { IWithMemoryModal, MemoryDialogType } from "../features/memories/HOC/withMemoryModal";
import MemoryCalendar from "../features/memories/memory-calendar/memory-calendar"
import withLoggedIn from "../HOC/withLoggedIn"

const CreateMemoryPage = ({
    memoryModal
}: {
    memoryModal: IWithMemoryModal
}) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const {setDialogIsOpen, setDisplayed, setDialogSubTitle} = memoryModal;

    const updateDate = () => {
        setSelectedDate(new Date('2012/12/12'));
        console.log('update date');
    }

    const dayClicked = useCallback((event: DateClickArg) => {
        console.log('parent', event);
        //todo remove
        setDisplayed(MemoryDialogType.create);
        setDialogIsOpen(true);
        setDialogSubTitle(event.date.toDateString());
    }, [selectedDate]);
    console.log(memoryModal);
    return(
        <div>
            <h4 onClick={(e) => updateDate()}>Create a Memory</h4>
            <MemoryCalendar
            dayClicked={dayClicked}
            startDate={selectedDate}/>
        </div>
    )
}

export default withLoggedIn(withMemoryModal(CreateMemoryPage));