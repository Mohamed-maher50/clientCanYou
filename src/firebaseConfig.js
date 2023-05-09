import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const {
  REACT_APP_APIKEY,
  REACT_APP_authDomain,
  REACT_APP_projectId,
  REACT_APP_storageBucket,
  REACT_APP_messagingSenderId,
  REACT_APP_appId,
  REACT_APP_measurementId,
} = process.env;
const firebaseConfig = {
  apiKey: REACT_APP_APIKEY,
  authDomain: REACT_APP_authDomain,
  projectId: REACT_APP_projectId,
  storageBucket: REACT_APP_storageBucket,
  messagingSenderId: REACT_APP_messagingSenderId,
  appId: REACT_APP_appId,
  measurementId: REACT_APP_measurementId,
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
