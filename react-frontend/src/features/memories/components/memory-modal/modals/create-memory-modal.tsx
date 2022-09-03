import { Button, DialogContent, DialogTitle, TextField } from "@mui/material";
import { IBaseMemoryProps } from "../../../models/base-memory-props";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { INewMemory } from "../../../../../models/memories/new-memory";
import { useContext, useState } from "react";
import useMemoryRequests from "../../../hooks/useMemoryRequests";
import ImageUpload from "../../image-upload/image-upload";
import useImageUpload from "../../../../../firebase/hooks/useImageUpload";
import { NotificationContext } from "../../../../../contexts/notification.context";

const CreateMemoryModal = ({
    title = 'Create a New Memory',
    subTitle,
    date,
    cancelClicked
}:{
    cancelClicked: () => void
} & IBaseMemoryProps) => {
    const {createMemory} = useMemoryRequests();
    const {uploadImage} = useImageUpload();
    const {openSnackBar} = useContext(NotificationContext);

    const [newMemory, setNewMemory] = useState<INewMemory>({
        summary: null,
        description: null,
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
        console.log('new memory', newMemory);
        try{
            const memory = await createMemory(newMemory);
            if(image && memory.id){
                await uploadImage(image, memory.id);
            }
            openSnackBar('Memory Created!');
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
                            onChange={(e) => updateSummary(e.currentTarget?.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <CKEditor
                            editor={ClassicEditor}
                            onChange={(e: any, editor: any) => updateDescription(editor.getData())}
                        />
                    </div>
                    <div className="mt-4">
                        <ImageUpload imageAdded={handleImageAdded}/>
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