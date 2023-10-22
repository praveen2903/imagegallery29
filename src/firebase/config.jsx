// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {FacebookAuthProvider, getAuth,GithubAuthProvider,GoogleAuthProvider } from 'firebase/auth'
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2eVbYaZwXeZ27DUhh1uf_9ELFyF3yxbI",
  authDomain: "imagegallery-23.firebaseapp.com",
  projectId: "imagegallery-23",
  storageBucket: "imagegallery-23.appspot.com",
  messagingSenderId: "374406901801",
  appId: "1:374406901801:web:befb440bd77d9524946c38",
  measurementId: "G-10Z6MWV9M3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const storage = getStorage();
export const db=getFirestore()
export const googleprovider=new GoogleAuthProvider()
export const githubprovider=new GithubAuthProvider()
export const facebookprovider=new FacebookAuthProvider()