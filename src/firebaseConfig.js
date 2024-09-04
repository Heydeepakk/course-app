// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc,updateDoc,increment,onSnapshot  } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCuaXQRc57RQFCcabSCMIivKQS4D4jeB7U",
    authDomain: "react-hiring.firebaseapp.com",
    projectId: "react-hiring",
    storageBucket: "react-hiring.appspot.com",
    messagingSenderId: "741813755172",
    appId: "1:741813755172:web:4323ab8439c02a2e4f67b1",
    measurementId: "G-3SBSW1SDKS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, doc, getDoc,updateDoc, onSnapshot,increment  }; 