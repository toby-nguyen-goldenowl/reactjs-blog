import firebase from "firebase/app";
import "firebase/database";
import * as env from "../constant-env/index";

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: "blog-a87a5.firebaseapp.com",
  projectId: "blog-a87a5",
  storageBucket: "blog-a87a5.appspot.com",
  messagingSenderId: "845741781236",
  appId: "1:845741781236:web:5c4f5ee16784a3c8bf6ea1",
  measurementId: "G-3YMCGJ9CKP",
};
// Initialize Firebase
const firebaseConnect = firebase.initializeApp(firebaseConfig);
export default firebaseConnect;
