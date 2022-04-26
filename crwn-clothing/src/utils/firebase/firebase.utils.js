//firebase account: shappovala@gmail.com
import {initializeApp} from 'firebase/app';
import {
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    collection,
    writeBatch, 
    query,
    getDocs
  } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1D434m3xoFS8NJJ3xOpoe-HfgIUdJ5_0",
    authDomain: "capstone-f7203.firebaseapp.com",
    projectId: "capstone-f7203",
    storageBucket: "capstone-f7203.appspot.com",
    messagingSenderId: "770752780969",
    appId: "1:770752780969:web:eb06844e9c24dadbcc67b8"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
      prompt: 'select_account'
  });


  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


  export const db = getFirestore();

  export const addCollectionAndDocuments = async (
    collectionKey, 
    objectsToAdd,
    field
    ) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();

    console.log('done');

  }

  export const getCategoriesAndDocuments =  async() => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=> {
      const {title, items} = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})

    return categoryMap;



  }


  export const createUserDocumentfromAuth = async(
    userAuth, 
    additionalInformation={}
    ) => {

      if (!userAuth) return;

      const userDocRef = doc(db, 'users', userAuth.uid);

      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
          const {displayName, email} = userAuth;
          const createdAt = new Date();

          try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
          } catch (error) {
            console.log('error creating the user' , error.message);
          }

      }


      return userDocRef;



  };


  export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => {
    

    onAuthStateChanged(auth, callback);
  } 
