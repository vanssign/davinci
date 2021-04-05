import firebase from 'firebase';

//firebase configs const

const firebaseConfig = {
    apiKey: "AIzaSyDJbxny_56x-BVvHMAOUtGDd7Byf_hPpr8",
    authDomain: "davinci-4d7ea.firebaseapp.com",
    projectId: "davinci-4d7ea",
    storageBucket: "davinci-4d7ea.appspot.com",
    messagingSenderId: "945947471424",
    appId: "1:945947471424:web:96f8fd4cc134c52edc39a5",
    measurementId: "G-C3J653PEH7"
};

try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}
const fire = firebase;

export default fire;