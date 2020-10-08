import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
   
    apiKey: "AIzaSyCSQK3o5HoVNIfsih1wXmwACodVT50f1qo",
    authDomain: "crwn-db-c940d.firebaseapp.com",
    databaseURL: "https://crwn-db-c940d.firebaseio.com",
    projectId: "crwn-db-c940d",
    storageBucket: "crwn-db-c940d.appspot.com",
    messagingSenderId: "15234030989",
    appId: "1:15234030989:web:41aeb97c37fe7ccb59b1c4",
    measurementId: "G-KMGED685H4"
      
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, ...additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    
    if(!snapShot.exists){
        const {displayName, email} = userAuth;  
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user ' + error.message);
        }
    }

    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });     

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator 
    }, {})
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = ()=> auth.signInWithPopup(googleProvider);

export default firebase;