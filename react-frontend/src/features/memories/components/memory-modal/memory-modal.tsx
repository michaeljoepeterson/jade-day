import { Dialog } from "@mui/material";
import { useCallback } from "react";
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
    isOpen,
    dialogChanged,
    memoryCreated
}: IBaseMemoryModalProps & {
    dialogClosed: () => void;
    image?: string | null;
    displayedDialog?: MemoryDialogType;
    isOpen: boolean;
    dialogChanged: (dialogType: MemoryDialogType) => void;
    memoryCreated: (memory: IMemory) => void;
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

    const changeModalClicked = useCallback((modalType: MemoryDialogType) => {
        dialogChanged(modalType);
    }, []);

    if(!date){
        return null;
    }

    switch(displayedDialog){
        case MemoryDialogType.view:
            dialogContent = (
                <ViewMemoryModal
                    imageUrl={image}
                    memory={memory as IMemory}
                    editClicked={(dialogType) => changeModalClicked(dialogType)}
                />
            );
            break;
        case MemoryDialogType.create:
            dialogContent = (
                <CreateMemoryModal 
                    memory={memory}
                    subTitle={date.toDateString()}
                    date={date}
                    cancelClicked={handleclose}
                    cancelEditClicked={(dialogType) => changeModalClicked(dialogType)}
                    imageUrl={image}
                    memoryCreated={(memory) => memoryCreated(memory)}
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