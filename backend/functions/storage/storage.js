const { fb } = require('../config');

class ImageStorage{
    constructor(){
        this.storage = fb.storage().bucket();
        this.imagePath = 'images';
    }

    async saveImage(file, email, id){
        try{
            const path = `${this.imagePath}/${email}/${id}`
            await this.storage.file(path).save(file, {
                contentType: 'image/png',
                cacheControl: 'public, max-age=31536000'
            });
        }
        catch(e){
            throw e;
        }
    }

    async getImage(email, id){
        const path = `${this.imagePath}/${email}/${id}`;
        try{
            let file = this.storage.file(path);
            let url = await file.getSignedUrl({action:'read',expires:'03-09-2491'});
            return url ? url[0] : null;
        }
        catch(e){
          throw e;
        }
    }
}

const imageStorage = new ImageStorage();

module.exports = {imageStorage};