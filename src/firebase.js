import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
     apiKey: "AIzaSyDePHjRLtyDFBI_uMaVb3eY5O9hhy4IWfc",
     authDomain: "nammayatri-a1422.firebaseapp.com",
     projectId: "nammayatri-a1422",
     storageBucket: "nammayatri-a1422.appspot.com",
     messagingSenderId: "1029640084331",
     appId: "1:1029640084331:web:e5c7f95edce8c3292d4a2e",
     measurementId: "G-KN3V5SEHDE"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();

const authPhone = getAuth();
function verifyPhone(number){
    const recaptchaVerifier = new RecaptchaVerifier('sign-in-phone-number', {
        'size': 'invisible',
        'callback': (response) => {
          // console.log(response);
        }
    }, authPhone);
    return signInWithPhoneNumber(authPhone, number, recaptchaVerifier);
}

// AUTHENTICATION FOR LOGIN
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();


export { auth, verifyPhone, provider };
export default db;