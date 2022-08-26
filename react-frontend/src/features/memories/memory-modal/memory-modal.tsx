import { Dialog } from "@mui/material";
import { MemoryDialogType } from "../HOC/withMemoryModal";
import CreateMemoryModal from "./create-memory-modal";
import ViewMemoryModal from "./view-memory-modal";

/**
 * wrapper to handle switching the current memory modal
 * @returns 
 */
const MemoryModal = ({
    isOpen = false,
    dialogType = MemoryDialogType.view
}: {
    isOpen?: boolean;
    dialogType?: MemoryDialogType
}) => {
    let dialogContent = null;
    switch(dialogType){
        case MemoryDialogType.view:
            dialogContent = (<ViewMemoryModal />);
            break;
        case MemoryDialogType.create:
            dialogContent = (<CreateMemoryModal />);
            break;
    }

    return (
        <Dialog
        open={isOpen}
        >
            {dialogContent}
        </Dialog>
    );
}

export default MemoryModal;