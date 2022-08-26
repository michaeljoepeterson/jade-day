import { Dialog } from "@mui/material";
import React, { PropsWithChildren, useState } from "react";
import MemoryModal from "../memory-modal/memory-modal";

export enum MemoryDialogType{
    view = 'view',
    create = 'create'
}

export interface IWithMemoryModal{
    isOpen: boolean;
    setDialogIsOpen: (isOpen: boolean) => void;
    setDisplayed: (dialogType: MemoryDialogType) => void;
    setDialogSubTitle: (subTitle: string) => void;
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
    const [title, setTitle] = useState<string>();
    const [subTitle, setSubTitle] = useState<string>();
    
    const setDialogIsOpen = (isOpen: boolean) => {
        setIsOpen(isOpen);
    }

    const setDisplayed = (displayed: MemoryDialogType) => {
        setDisplayedDialog(displayed);
    }

    const dialogClosed = () => {
        setIsOpen(false);
    }

    const setDialogSubTitle = (subTitle: string) => {
        setSubTitle(subTitle);
    }

    return (
        <>
            <Component 
                memoryModal={{
                    isOpen,
                    setDialogIsOpen,
                    setDisplayed,
                    setDialogSubTitle
                }}
                {...props} 
            />
            <MemoryModal
                dialogClosed={dialogClosed}
                isOpen={isOpen}
                dialogType={displayedDialog}
                subTitle={subTitle}
                title={title}
            />
        </>
    );
}

export default withMemoryModal;