import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDfzLK4_Ct2TB45Iwf8svzN140u0j7t3xs",
  authDomain: "jobhunter-6f17c.firebaseapp.com",
  databaseURL: "https://jobhunter-6f17c.firebaseio.com",
  projectId: "jobhunter-6f17c",
  storageBucket: "jobhunter-6f17c.appspot.com",
  messagingSenderId: "673335986299",
  appId: "1:673335986299:web:68bd521f211805c7d5bade",
  measurementId: "G-RP9QQBVLG6"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const messaging = firebase.messaging();