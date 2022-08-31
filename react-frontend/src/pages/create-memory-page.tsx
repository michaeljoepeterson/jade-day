import { DateClickArg } from "@fullcalendar/interaction";
import { useCallback, useState } from "react"
import withMemoryModal, { IWithMemoryModal, MemoryDialogType } from "../features/memories/HOC/withMemoryModal";
import MemoryCalendar from "../features/memories/components/memory-calendar/memory-calendar"
import withLoggedIn from "../HOC/withLoggedIn"

const CreateMemoryPage = ({
    memoryModal
}: {
    memoryModal: IWithMemoryModal
}) => {
    const [date, setDate] = useState<Date>(new Date());
    const {setDialogIsOpen, setDisplayed, setDialogSubTitle, setSelectedDate} = memoryModal;

    const updateDate = () => {
        setDate(new Date('2012/12/12'));
        console.log('update date');
    }

    const dayClicked = useCallback((event: DateClickArg) => {
        console.log('parent', event);
        //todo remove
        setDisplayed(MemoryDialogType.create);
        setDialogIsOpen(true);
        setDialogSubTitle(event.date.toDateString());
        setSelectedDate(event.date);
    }, [setDate]);
    console.log(memoryModal);
    return(
        <div>
            <h4 onClick={(e) => updateDate()}>Create a Memory</h4>
            <MemoryCalendar
            dayClicked={dayClicked}
            startDate={date}/>
        </div>
    )
}

export default withLoggedIn(withMemoryModal(CreateMemoryPage));