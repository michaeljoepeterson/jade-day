import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, connectStorageEmulator } from "firebase/storage";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  storageRef = getStorage();
  imagePath: string = 'images';

  constructor() {
    if(!environment.production){
      const storage = getStorage();
      connectStorageEmulator(storage, "localhost", 9199);
    }
  }

  async uploadImage(file:File){
    console.log(file);
    try{
      let imageType = 'image';
      if(file.type.includes(imageType)){
        let path = `${this.imagePath}/${file.name}`;
        let fileRef = ref(this.storageRef, path);
        await uploadBytes(fileRef,file);
      }
    }
    catch(e){
      let message = 'Error uploading image'
      console.warn(message,e);
      throw e;
    }
  }
}
