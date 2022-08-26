import { DialogTitle } from "@mui/material";
import { IBaseMemoryProps } from "./base-memory-props";

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
        </>
    );
}

export default CreateMemoryModal;