import { Injectable } from '@angular/core';
import { getDownloadURL } from '@angular/fire/storage';
import { getStorage, ref, uploadBytes, connectStorageEmulator } from "firebase/storage";
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  storageRef = getStorage();
  imagePath: string = 'images';

  constructor(
    private authService: AuthService
  ) {
    if(!environment.production){
      const storage = getStorage();
      connectStorageEmulator(storage, "localhost", 9199);
    }
  }

  async uploadImage(file: File, id:string){
    console.log(file);
    const user = this.authService.getUser();
    try{
      let imageType = 'image';
      if(file.type.includes(imageType)){
        let path = `${this.imagePath}/${user.email}/${id}`;
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
  //todo potentially hookup to cache
  async getImage(id: string){
    const user = this.authService.getUser();
    let path = `${this.imagePath}/${user.email}/${id}`;
    try{
      let url = await getDownloadURL(ref(this.storageRef,path));
      return url;
    }
    catch(e){
      console.warn(e);
      return null;
    }
  }
}
