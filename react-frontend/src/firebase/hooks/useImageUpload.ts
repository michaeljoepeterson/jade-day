import { getStorage, ref, uploadBytes, connectStorageEmulator } from "firebase/storage";
import { useContext } from "react";
import { AuthContext } from "../../auth/auth.context";

export interface IImageUpload{
    uploadImage: (file: File, id: string) => Promise<any>
}

const useImageUpload = (): IImageUpload => {
    const storageRef = getStorage();
    const imagePath = 'images';
    const {getUser} = useContext(AuthContext);
    if(process.env.NODE_ENV !== 'production'){
        const storage = getStorage();
        connectStorageEmulator(storage, "localhost", 9199);
    }

    const uploadImage = async (file: File, id:string) => {
        console.log(file);
        const user = getUser();
        if(!user){
            return;
        }
        try{
          let imageType = 'image';
          if(file.type.includes(imageType)){
            let path = `${imagePath}/${user.email}/${id}`;
            let fileRef = ref(storageRef, path);
            return await uploadBytes(fileRef,file);
          }
        }
        catch(e){
          let message = 'Error uploading image'
          console.warn(message,e);
          throw e;
        }
    }

    return {
        uploadImage
    }
}

export default useImageUpload;

