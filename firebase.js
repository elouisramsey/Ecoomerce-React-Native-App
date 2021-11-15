import { initializeApp } from 'firebase/app'
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getFirestore,
  where,
  query,
  getDocs
} from 'firebase/firestore'
import 'firebase/auth'
import 'firebase/compat/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBmJvkt9FcKPdOHqT-Ntg15an45bAbc1y0',
  authDomain: 'furniture-app-rn.firebaseapp.com',
  projectId: 'furniture-app-rn',
  storageBucket: 'furniture-app-rn.appspot.com',
  messagingSenderId: '256648358870',
  appId: '1:256648358870:web:4af8eb4ef43cfb5bdd9277'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export {
  db,
  auth,
  createUserWithEmailAndPassword,
  collection,
  addDoc,
  onAuthStateChanged,
  doc,
  setDoc,
  where,
  updateProfile,
  query
}
