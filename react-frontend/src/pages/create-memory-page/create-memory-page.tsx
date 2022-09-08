import { useCallback, useState, useEffect, useContext } from "react"
import MemoryCalendar from "../../features/memories/components/memory-calendar/memory-calendar"
import withLoggedIn from "../../HOC/withLoggedIn"
import { IMemory } from "../../models/memories/memory";
import useMemoryRequests from "../../features/memories/hooks/useMemoryRequests";
import { NotificationContext } from "../../contexts/notification.context";
import useImageUpload from "../../firebase/hooks/useImageUpload";
import MemoryModal, { MemoryDialogType } from "./components/memory-modal/memory-modal";

const CreateMemoryPage = () => {
    const [date, setDate] = useState<Date>(new Date());
    const [memories, setMemories] = useState<IMemory[]>([]);
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const [image, setImage] = useState<string | null>(null);
    const [displayed, setDisplayed] = useState<MemoryDialogType>();
    const [selectedMemory, setSelectedMemory] = useState<IMemory | undefined | null>();
    const {getMemories} = useMemoryRequests();
    const {openSnackBar} = useContext(NotificationContext);
    const {getImage} = useImageUpload();

    const updateDate = () => {
        setDate(new Date('2012/12/12'));
        console.log('update date');
    }

    const handleDialogClosed = useCallback(() => {
        setDialogIsOpen(false);
    }, []);

    
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

    const dialogChanged = useCallback((dialogType: MemoryDialogType) => {
        console.log(dialogType)
        setDisplayed(dialogType);
    }, []);

    const dayClicked = useCallback(async (date: Date) => {
        const existingMemory = memories.find(memory => memory.date?.toDateString() === date.toDateString());
        const dialogType = existingMemory ? MemoryDialogType.view : MemoryDialogType.create;
        let image = null;
        if(existingMemory){
            image = await getImage(existingMemory.id);
        }
        setDisplayed(dialogType);
        setDialogIsOpen(true);
        setSelectedMemory(existingMemory);
        setDate(date);
        setImage(image);
    }, [memories]);

    const memoryCreated = useCallback((memory: IMemory) => {
        const newMemories = [...memories];
        newMemories.push(memory);
        setMemories(newMemories);
    }, [memories]);

    const memoryUpdated = useCallback((memory: IMemory) => {
        const newMemories = [...memories];
        const foundMemoryIndex = newMemories.findIndex(currentMemory => currentMemory.id === memory.id);
        newMemories[foundMemoryIndex] = memory;
        setMemories(newMemories);
    }, [memories]);

    return(
        <div>
            <h2 className="text-3xl mb-5" onClick={(e) => updateDate()}>Create a Memory</h2>
            <MemoryCalendar
                eventClicked={dayClicked}
                dayClicked={dayClicked}
                startDate={date}
                memories={memories}
            />
            <MemoryModal
                memory={selectedMemory}
                image={image}
                displayedDialog={displayed}
                isOpen={dialogIsOpen}
                dialogClosed={handleDialogClosed}
                date={date}
                dialogChanged={dialogChanged}
                memoryCreated={memoryCreated}
                memoryUpdated={memoryUpdated}
            />
        </div>
    )
}

export default withLoggedIn(CreateMemoryPage);