import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {TOKEN} from 'utils/constants';


class Authentication
{
    constructor()
    {
        app.initializeApp(TOKEN);
        this.auth = app.auth();
        this.db = app.firestore();
    }
    //handles signup
    signUp(email, password){
        return this.auth
        .createUserWithEmailAndPassword(email,password);  
    }
    //handles signin
    signIn(email, password){
        return this.auth
        .signInWithEmailAndPassword(email, password);
        
    }
    getApp()
    {
        return app;
    }
    //handles signout
    signOut()
    {
        this.auth.signOut();
    }
    reAuthenticate(password)
    {

        var user = this.auth.currentUser;
        var creadentials = app.auth.EmailAuthProvider.credential(user.email,password);
        return user.reauthenticateWithCredential(creadentials);
    }
    resetPassword(oldPassword, newPassword)
    {
        this.reAuthenticate(oldPassword)
        .then(function(){
            var activeUser = app.auth().currentUser;
            console.log(activeUser);
            activeUser.updatePassword(newPassword)
            .then(function(){
                return {message:"Password updated successfully",status:true};
            })
            .catch(function(error){
                return {message:"Unable to reset password.",status:false};
            });
        })
        .catch((error)=>{
            return {message:"Unable to reset password.",status:false};
        });

    }
    getUser()
    {
        var data = this.auth.currentUser;
        var currentUser = data.email;
        return currentUser;
    }
}
export default new Authentication();