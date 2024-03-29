import { Button, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { INewMemory } from "../../../../../models/memories/new-memory";
import { useContext, useState } from "react";
import ImageUpload from "../../image-upload/image-upload";
import { NotificationContext } from "../../../../../contexts/notification.context";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MemoryDialogType } from "../memory-modal";
import { IMemory } from "../../../../../models/memories/memory";
import useMemoryRequests from "../../../../../features/memories/hooks/useMemoryRequests";
import { IBaseMemoryModalProps } from "../../../../../features/memories/models/base-memory-props";

const CreateMemoryModal = ({
    title = 'Create a New Memory',
    subTitle,
    date,
    cancelClicked,
    cancelEditClicked,
    memory,
    imageUrl,
    memoryCreated,
    memoryUpdated
}:{
    cancelClicked: () => void;
    cancelEditClicked: (dialogType: MemoryDialogType) => void;
    memoryCreated: (memory: IMemory) => void;
    memoryUpdated: (memory: IMemory) => void; 
} & IBaseMemoryModalProps) => {
    const {createMemory, updateMemory} = useMemoryRequests();
    const {openSnackBar} = useContext(NotificationContext);

    const [newMemory, setNewMemory] = useState<INewMemory>({
        summary: memory ? memory.summary : '',
        description: memory ? memory.description : '',
        date: date ? date : null
    });

    const [image, setImage] = useState<File | null>(null);

    const updateSummary = (summary: string) => {
        const memory = {
            ...newMemory,
            summary
        };

        setNewMemory(memory);
    };

    const updateDescription = (description: any) => {
        const memory = {
            ...newMemory,
            description
        };

        setNewMemory(memory);
    };

    const saveMemory = async (event: any) => {
        event.preventDefault();
        try{
            let savedMemory;
            let memoryMessage;
            if(memory){
                savedMemory = await updateMemory({
                    ...memory,
                    description: newMemory.description,
                    summary: newMemory.summary
                }, image);
                memoryMessage = 'Memory Updated!';
            }
            else{
                savedMemory = await createMemory(newMemory, image);
                memoryMessage = 'Memory Created!';
            }

            openSnackBar(memoryMessage);
            if(!memory){
                memoryCreated(savedMemory);
            }
            else{
                memoryUpdated(savedMemory);
            }
            cancelClicked();
        }
        catch(e){
            console.warn(e);
            openSnackBar(`Error creating memory ${e}`);
        }
    };

    const handleCancelClicked = () => {
        try{
            cancelClicked();
        }
        catch(e){
            console.warn(e);
        }
    };

    const handleImageAdded = (file: File) => {
        console.log(file);
        setImage(file);
    }

    return (
        <>
            <DialogTitle>
                <div className="flex flex-col">
                    <span className="font-bold text-2xl">
                        {title}
                        {
                            memory && 
                            <IconButton
                            className="text-primary"
                            onClick={(e) => cancelEditClicked(MemoryDialogType.view)}>
                                <ArrowBackIcon/>
                            </IconButton>
                        }
                    </span>
                    {subTitle && (
                        <span>
                            {subTitle}
                        </span>
                    )}
                </div>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => saveMemory(e)}>
                    <div className="mt-4">
                        <TextField
                            variant="standard"
                            label="Title"
                            value={newMemory.summary}
                            onChange={(e) => updateSummary(e.currentTarget?.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <CKEditor
                            data={newMemory.description}
                            editor={ClassicEditor}
                            onChange={(e: any, editor: any) => updateDescription(editor.getData())}
                        />
                    </div>
                    <div className="mt-4">
                        <ImageUpload
                            imageUrl={imageUrl}
                            imageAdded={handleImageAdded}
                        />
                    </div>
                    <div className="mt-4 flex justify-between">
                        <Button 
                        type="submit"
                        variant="outlined">
                            Save
                        </Button>
                        <Button 
                        type="button"
                        color="secondary"
                        variant="outlined"
                        onClick={() => handleCancelClicked()}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </>
    );
}

export default CreateMemoryModal;