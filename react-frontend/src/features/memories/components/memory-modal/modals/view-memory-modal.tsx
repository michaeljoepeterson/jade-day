import { DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { IBaseMemoryModalProps } from "../../../models/base-memory-props";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MemoryImage from "../../memory-image/memory-image";
import EditIcon from '@mui/icons-material/Edit';
import { MemoryDialogType } from "../memory-modal";

const ViewMemoryModal = ({
    memory,
    imageUrl,
    editClicked
}: {
    editClicked: (dialogType: MemoryDialogType) => void;
} & IBaseMemoryModalProps) => {
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
                        <IconButton
                        className="text-primary"
                        onClick={(e) => editClicked(MemoryDialogType.create)}>
                            <EditIcon/>
                        </IconButton>
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
                    <div>
                        {
                            imageUrl && 
                            <MemoryImage
                                url={imageUrl}
                            />
                        }
                    </div>
                </div>
            </DialogContent>
        </>
    )
}

export default ViewMemoryModal;