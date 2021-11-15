import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyD2fVhERPhtlgisDBSZIm-MIra3y15Zj0A",
  authDomain: "basereactn.firebaseapp.com",
  projectId: "basereactn",
  storageBucket: "basereactn.appspot.com",
  messagingSenderId: "1060768491000",
  appId: "1:1060768491000:web:7a787d8497acdfcb37a20d"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();