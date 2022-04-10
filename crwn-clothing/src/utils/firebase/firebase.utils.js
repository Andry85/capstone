import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEUTvgfd6EPQKcpu8AbaQVUK__Nq6qZzg",
    authDomain: "crwn-clothing-db-9e875.firebaseapp.com",
    projectId: "crwn-clothing-db-9e875",
    storageBucket: "crwn-clothing-db-9e875.appspot.com",
    messagingSenderId: "583518348880",
    appId: "1:583518348880:web:cfc9cc85592c9a09095355"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: 'select_account'
  });


  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);