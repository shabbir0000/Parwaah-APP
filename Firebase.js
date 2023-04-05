// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref } from "firebase/database";
import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-6_O4n4PpnTQOuQA_8OaFFzzwpt-SyTY",
  authDomain: "parwaah-372be.firebaseapp.com",
  databaseURL: "https://parwaah-372be-default-rtdb.firebaseio.com",
  projectId: "parwaah-372be",
  storageBucket: "parwaah-372be.appspot.com",
  messagingSenderId: "362895043120",
  appId: "1:362895043120:web:65da39ade1fa5880df5bf5"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyAgB3zwfwPA0yO_zaaSuVjw4sdsGG_p8lc",
//   authDomain: "genderbase-d83b3.firebaseapp.com",
//   projectId: "genderbase-d83b3",
//   storageBucket: "genderbase-d83b3.appspot.com",
//   messagingSenderId: "21187895271",
//   appId: "1:21187895271:web:0a87ecad0721c756aee742"
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
//   useFetchStreams: false,
// });
// Initialize Firebase
export const ref1 = ref;
export const storage = getStorage(app);
