import firebase from "firebase/app";
import "firebase/database";
import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MEASUREMENT_ID,
  PROJECT_ID,
  SENDER_ID,
  STORAGE_BUCKET,
} from "../constant";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};
// Initialize Firebase
const firebaseConnect = firebase.initializeApp(firebaseConfig);
export default firebaseConnect;
