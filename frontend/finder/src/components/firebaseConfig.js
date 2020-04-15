import firebase from "firebase";

import "firebase/storage";



var firebaseConfig = {

    apiKey: "AIzaSyCQgPOQCHnbfOwkrggoMupPvKK5ZpyJhz4",
    authDomain: "uvaa-e6a2d.firebaseapp.com",
    databaseURL: "https://uvaa-e6a2d.firebaseio.com",
    projectId: "uvaa-e6a2d",
    storageBucket: "uvaa-e6a2d.appspot.com",
    messagingSenderId: "319956228239",
    appId: "1:319956228239:web:7c29c65b1c48df78bcb8fa",
    measurementId: "G-PNKT255CNP"

};


firebase.initializeApp(firebaseConfig);



const storage = firebase.storage();



export { storage, firebase as default };