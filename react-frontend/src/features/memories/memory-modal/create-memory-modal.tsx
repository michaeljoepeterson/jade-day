import { DialogContent, DialogTitle, TextField } from "@mui/material";
import { IBaseMemoryProps } from "./base-memory-props";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreateMemoryModal = ({
    title = 'Create a New Memory',
    subTitle
}: IBaseMemoryProps) => {

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
                <form>
                    <TextField 
                        variant="standard"
                        label="Title"
                    />
                    <CKEditor
                        
                        editor={ClassicEditor}
                    />
                </form>
            </DialogContent>
        </>
    );
}

export default CreateMemoryModal;