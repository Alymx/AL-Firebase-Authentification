import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const config = {
    apiKey: "AIzaSyDsmvyUh1B28439PQ9wDKUUY640ioqyQ2Y",
    authDomain: "producthunt - 8c751.firebaseapp.com",
    databaseURL: "https://producthunt-8c751.firebaseio.com",
    projectId: "producthunt - 8c751",
    storageBucket: "producthunt - 8c751.appspot.com",
    messagingSenderId: "1066929061021",
};

// const devConfig = {
//     apiKey: process.env.REACT_APP_PROD_API_KEY,
//     authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROD_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
// };

// const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

class Firebase {
    constructor(props) {
        //Instanciation de la dependance database de
        app.initializeApp(config);
        //Instanciation de la dependance authentification de FB
        this.auth = app.auth();
        this.db = app.database();
    }

    // *** API d'authentification ***
    //Creation d'utilisateur via MAIL et PASS
    doCreateUserWithEmailAndPassword = (email, password) =>
        (this.auth.createUserWithEmailAndPassword(email, password));

    //Connexion d'utilisateur via MAIL et PASS
    doSignInWithEmailAndPassword = (email, password) =>
        (this.auth.signInWithEmailAndPassword(email, password));

    //Deconnexion (Si connecte, sinon erreur)
    doSignOut = () => (this.auth.signOut());

    //Reinitailiser le PASS via MAIL
    doPasswordReset = (email) => (this.auth.sendPasswordResetEmail(email));

    //Changer PASS (Si connecte, sinon erreur)
    doPasswordUpdate = (password) => (this.auth.currentUser.updatePassword(password));

    // *** User API ***
    user = (uid) => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

}

export default Firebase;