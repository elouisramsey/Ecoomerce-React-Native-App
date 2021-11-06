import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

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
!firebase.apps.length ? initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()
const auth = firebase.auth()

export default { firebase, db, auth }
