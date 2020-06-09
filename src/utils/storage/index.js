import app from 'firebase/app';
import 'firebase/storage';
import {
    TOKEN,
    STATE_CHANGED,
    SET_UPLOAD_PROGRESS,
    SET_UPLOAD,
    SET_PUBLICURL
} from 'utils/constants';
import {store} from 'utils/redux/store';
import {uploadProgressAction} from 'utils/redux/actions';

class Drive
{
    deleteFileFromStorage(fileName)
    {
        return app.storage().ref().child(fileName).delete();
    }
    uploadFilesToStorage(path,file,callback)
    {
        store.dispatch({type:SET_UPLOAD,payload:true});
        const uploadProgress =  app.storage().ref().child(path).put(file);
        uploadProgress.on(STATE_CHANGED,function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
            store.dispatch({type:SET_UPLOAD_PROGRESS, payload:progress});
        },
        function(error){

        },
        function()
        {
            uploadProgress
            .snapshot
            .ref
            .getDownloadURL()
            .then(function(downloadURL){
                store.dispatch({type:SET_UPLOAD,payload:false});
                store.dispatch({type: SET_PUBLICURL,payload:downloadURL});
                callback(downloadURL);

            })
            .catch(function(error){

            });
        });
    }
}
export default new Drive();