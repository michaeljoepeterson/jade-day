import { DialogContent, DialogTitle, TextField } from "@mui/material";
import { IBaseMemoryProps } from "./base-memory-props";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ViewMemoryModal = ({
    memory
}: IBaseMemoryProps) => {
    if(!memory){
        return(
            <>
            </>
        );
    }
    return (
        <>
             <DialogTitle>
                <div className="flex flex-col">
                    <span className="font-bold text-2xl">
                        {memory.summary}
                    </span>
                    <span>
                        {memory.date?.toDateString()}
                    </span>
                </div>
            </DialogTitle>
            <DialogContent>
                <div>
                <div className="mt-4">
                        <TextField
                            variant="standard"
                            label="Title"
                            disabled={true}
                            value={memory.summary}
                        />
                    </div>
                    <div className="mt-4">
                        <CKEditor
                            editor={ClassicEditor}
                            disabled={true}
                            data={memory.description}
                            config={{
                                toolbar: []
                            }}
                        />
                    </div>
                </div>
            </DialogContent>
        </>
    )
}

export default ViewMemoryModal;