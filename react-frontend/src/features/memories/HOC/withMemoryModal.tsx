import { Dialog } from "@mui/material";
import React, { PropsWithChildren, useState } from "react";

export enum MemoryDialogType{
    view = 'view',
    create = 'create'
}

export interface IWithMemoryModal{
    isOpen: boolean;
    setDialogIsOpen: (isOpen: boolean) => void;
    setDisplayed: (dialogType: MemoryDialogType) => void;
}

/**
 * HOC to centralize memory modal functionality and offload from component
 * @param Component
 * @returns
 */
const withMemoryModal = (Component: React.FC<PropsWithChildren<{
    memoryModal: IWithMemoryModal
}>>) => (props: PropsWithChildren): React.ReactElement => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [displayedDialog, setDisplayedDialog] = useState<MemoryDialogType>(MemoryDialogType.view);
    
    const setDialogIsOpen = (isOpen: boolean) => {
        setIsOpen(isOpen);
    }

    const setDisplayed = (displayed: MemoryDialogType) => {
        setDisplayedDialog(displayed);
    }

    return (
        <>
            <Component 
            memoryModal={{
                isOpen,
                setDialogIsOpen,
                setDisplayed
            }}
            {...props} />
            <Dialog
            open={isOpen}
            >
                <p>test</p>
            </Dialog>
        </>
    );
}

export default withMemoryModal;