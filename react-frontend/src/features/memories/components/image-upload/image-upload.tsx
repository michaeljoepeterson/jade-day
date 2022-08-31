import { useRef, useState } from 'react';
import './styles.css';

const ImageUpload = ({
    imageAdded
}: {
    imageAdded: (file: File) => any;
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const fileInput = useRef<any>(null);
    const handleDragOver = (event: any) => {
        event.preventDefault();
        setIsHovered(true);
    };

    const handleDragOut = (event: any) => {
        event.preventDefault();
        setIsHovered(false);
    };

    const handleDrop = (event: any) => {
        event.preventDefault();
        try{
            if(event.dataTransfer.items.length > 0){
                const file = event.dataTransfer.items[0].getAsFile();
                //url for image preview
                const url = URL.createObjectURL(file);
                console.log(url);
                setImageUrl(url);
                imageAdded(file);
            }
        }
        catch(e){
            console.warn(e);
        }
    };

    const handleImageSelected = (event: any) => {
        const files = event.target.files;
        if(files.length > 0){
            const file = files[0];
            const url = URL.createObjectURL(file);
            console.log(url);
            setImageUrl(url);
            imageAdded(file);
        }
    }

    return (
        <div className="upload-container">
            <div
            className={`drop-file clickable ${isHovered ? 'file-hovered' : ''}`}
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={(e) => handleDragOut(e)}
            onMouseLeave={(e) => handleDragOut(e)}
            onDrop={(e) => handleDrop(e)}
            onClick={(e) => fileInput?.current ? fileInput.current.click() : null}>
                <div className="drop-description">
                    <span>
                        Drag and drop a file or click here to select a image
                    </span>
                </div>
            </div>
            <div className="hidden">
                <input
                ref={fileInput}
                type="file" 
                className="custom-file-input"
                onChange={(e) => handleImageSelected(e)}/>
            </div>
        </div>
    )
}

export default ImageUpload;