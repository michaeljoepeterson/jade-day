import { Dialog } from "@mui/material";
import { MemoryDialogType } from "../HOC/withMemoryModal";
import { IBaseMemoryProps } from "./base-memory-props";
import CreateMemoryModal from "./create-memory-modal";
import ViewMemoryModal from "./view-memory-modal";

/**
 * wrapper to handle switching the current memory modal
 * @returns 
 */
const MemoryModal = ({
    isOpen = false,
    dialogType = MemoryDialogType.view,
    dialogClosed,
    title,
    subTitle,
    date
}: {
    isOpen?: boolean;
    dialogType?: MemoryDialogType;
    dialogClosed: () => void;
} & IBaseMemoryProps) => {
    let dialogContent = null;

    const handleclose = () => {
        try{
            dialogClosed()
        }
        catch(e){
            console.warn(e);
        }
    }

    switch(dialogType){
        case MemoryDialogType.view:
            dialogContent = (<ViewMemoryModal />);
            break;
        case MemoryDialogType.create:
            dialogContent = (
                <CreateMemoryModal 
                    title={title}
                    subTitle={subTitle}
                    date={date}
                    cancelClicked={handleclose}
                />
            );
            break;
    }

    return (
        <Dialog
        open={isOpen}
        onClose={handleclose}
        >
            {dialogContent}
        </Dialog>
    );
}

export default MemoryModal;