import { Dialog } from "@mui/material";
import React, { PropsWithChildren, useState } from "react";
import CreateMemoryModal from "../components/memory-modal/create-memory-modal";
import ViewMemoryModal from "../components/memory-modal/view-memory-modal";

export enum MemoryDialogType{
    view = 'view',
    create = 'create'
}

export interface IWithMemoryModal{
    isOpen: boolean;
    setDialogIsOpen: (isOpen: boolean) => void;
    setDisplayed: (dialogType: MemoryDialogType) => void;
    setDialogSubTitle: (subTitle: string) => void;
    setSelectedDate: (date: Date) => void;
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
    const [date, setDate] = useState<Date>();
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

    const setSelectedDate = (date: Date) => {
        setDate(date);
    }

    let dialogContent = null;

    const handleclose = () => {
        try{
            dialogClosed()
        }
        catch(e){
            console.warn(e);
        }
    }

    switch(displayedDialog){
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
        <>
            <Component 
                memoryModal={{
                    isOpen,
                    setDialogIsOpen,
                    setDisplayed,
                    setDialogSubTitle,
                    setSelectedDate
                }}
                {...props} 
            />
            <Dialog
                open={isOpen}
                onClose={handleclose}
                fullWidth={true}
                maxWidth="lg"
            >
                {dialogContent}
            </Dialog>
        </>
    );
}

export default withMemoryModal;