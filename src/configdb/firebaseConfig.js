import firebase from "firebase/app";
import "firebase/database";
import * as env from "./index";

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.SENDER_ID,
  appId: env.APP_ID,
  measurementId: env.MEASUREMENT_ID,
};
// Initialize Firebase
const firebaseConnect = firebase.initializeApp(firebaseConfig);
export default firebaseConnect;
