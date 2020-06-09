import app from 'firebase';
import 'firebase/database';
import {TOKEN} from 'util/constants';

class Database{
    constructor()
    {
        app.initializeApp(TOKEN);
        this.db = app.firestore();
    }
    
    createDocument(collection, data, docName=null)
    {
        return this.db
                .collection(collection)
                .doc(docName)
                .set(data);
    }
}
export default new Database();