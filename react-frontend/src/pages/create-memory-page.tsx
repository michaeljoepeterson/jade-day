import { DateClickArg } from "@fullcalendar/interaction";
import { useCallback, useState, useEffect, useContext } from "react"
import withMemoryModal, { IWithMemoryModal, MemoryDialogType } from "../features/memories/HOC/withMemoryModal";
import MemoryCalendar from "../features/memories/components/memory-calendar/memory-calendar"
import withLoggedIn from "../HOC/withLoggedIn"
import { IMemory } from "../models/memories/memory";
import useMemoryRequests from "../features/memories/hooks/useMemoryRequests";
import { NotificationContext } from "../contexts/notification.context";

const CreateMemoryPage = ({
    memoryModal
}: {
    memoryModal: IWithMemoryModal
}) => {
    const [date, setDate] = useState<Date>(new Date());
    const [memories, setMemories] = useState<IMemory[]>([]);
    const {setDialogIsOpen, setDisplayed, setDialogSubTitle, setSelectedDate} = memoryModal;
    const {getMemories} = useMemoryRequests();
    const {openSnackBar} = useContext(NotificationContext);

    const updateDate = () => {
        setDate(new Date('2012/12/12'));
        console.log('update date');
    }
    console.log('render', memories);
    
    useEffect(() => {
        const geUserMemories = async () => {
            try{
                const memories = await getMemories();
                setMemories(memories);
            }
            catch(e){
                openSnackBar(`Error getting memories ${e}`);
            }
        }

        geUserMemories();
    }, []);

    const dayClicked = useCallback((date: Date) => {
        const existingMemory = memories.find(memory => memory.date?.toDateString() === date.toDateString());
        const dialogType = existingMemory ? MemoryDialogType.view : MemoryDialogType.create;
        console.log(date);
        console.log(existingMemory, memories);
        setDisplayed(dialogType);
        setDialogIsOpen(true);
        setDialogSubTitle(date.toDateString());
        setSelectedDate(date);
    }, [memories]);

    return(
        <div>
            <h4 onClick={(e) => updateDate()}>Create a Memory</h4>
            <MemoryCalendar
                eventClicked={dayClicked}
                dayClicked={dayClicked}
                startDate={date}
                memories={memories}
            />
        </div>
    )
}

export default withLoggedIn(withMemoryModal(CreateMemoryPage));