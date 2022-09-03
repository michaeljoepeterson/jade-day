import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const MemoryImage = ({
    url,
    clearImage,
    height = '100%'
}:{
    height?: string;
    url: string;
    clearImage?: () => void;
}) => {

    return(
        <div
        style={{
            height
        }}>
            {
                clearImage && 
                <IconButton 
                onClick={(e) => clearImage()}
                className="text-secondary">
                    <CloseIcon/>
                </IconButton>
            }
            <img
            className="w-full object-contain"
            src={url}/>
        </div>
    )
}

export default MemoryImage;