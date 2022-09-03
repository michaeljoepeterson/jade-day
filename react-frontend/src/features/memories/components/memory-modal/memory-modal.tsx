import { Dialog } from "@mui/material";
import { IMemory } from "../../../../models/memories/memory";
import { IBaseMemoryModalProps } from "../../models/base-memory-props";
import CreateMemoryModal from "./modals/create-memory-modal";
import ViewMemoryModal from "./modals/view-memory-modal";

export enum MemoryDialogType{
    view = 'view',
    create = 'create'
}

const MemoryModal = ({
    dialogClosed,
    image,
    memory,
    displayedDialog = MemoryDialogType.create,
    date,
    isOpen
}: IBaseMemoryModalProps & {
    dialogClosed: () => void;
    image?: string | null;
    displayedDialog?: MemoryDialogType;
    isOpen: boolean;
}) => {
    let dialogContent = null;

    const handleclose = () => {
        try{
            dialogClosed();
        }
        catch(e){
            console.warn(e);
        }
    }

    if(!date){
        return null;
    }

    switch(displayedDialog){
        case MemoryDialogType.view:
            dialogContent = (
                <ViewMemoryModal
                    image={image}
                    memory={memory as IMemory}
                />
            );
            break;
        case MemoryDialogType.create:
            dialogContent = (
                <CreateMemoryModal 
                    subTitle={date.toDateString()}
                    date={date}
                    cancelClicked={handleclose}
                />
            );
            break;
    }

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleclose}
                fullWidth={true}
                maxWidth="lg"
            >
                {dialogContent}
            </Dialog>
        </>
    )
}

export default MemoryModal;