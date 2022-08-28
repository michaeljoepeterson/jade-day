import { Button, DialogContent, DialogTitle, TextField } from "@mui/material";
import { IBaseMemoryProps } from "./base-memory-props";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { INewMemory } from "../../../models/memories/new-memory";
import { useContext, useState } from "react";
import { MemoryContext } from "../contexts/memory.context";

const CreateMemoryModal = ({
    title = 'Create a New Memory',
    subTitle,
    date
}: IBaseMemoryProps) => {
    const {createMemory} = useContext(MemoryContext);

    const [newMemory, setNewMemory] = useState<INewMemory>({
        summary: null,
        description: null,
        date: date ? date : null
    });

    const updateSummary = (summary: string) => {
        const memory = {
            ...newMemory,
            summary
        };

        setNewMemory(memory);
    };

    const updateDescription = (description: any) => {
        console.log(description);
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
            await createMemory(newMemory);
        }
        catch(e){

        }
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
                    <TextField 
                        variant="standard"
                        label="Title"
                        onChange={(e) => updateSummary(e.currentTarget?.value)}
                    />
                    <CKEditor
                        editor={ClassicEditor}
                        onChange={(e: any, editor: any) => updateDescription(editor.getData())}
                    />
                    <div>
                        <Button 
                        type="submit"
                        variant="outlined">
                            Save
                        </Button>
                        <Button 
                        type="button"
                        variant="outlined">
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </>
    );
}

export default CreateMemoryModal;