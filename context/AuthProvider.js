import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'
// import { auth, onAuthStateChanged, getAuth } from '../firebase'
import { firebase } from '../firebase'
import { Alert } from 'react-native'
  const auth = getAuth()

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [currentDocumentID, setcurrentDocumentID] = useState('')

  // const userHanlder = (user) => (user ? setUser(user) : setUser(null))
  // useEffect(() => {
  //   (() => {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user === null) {
  //         console.log('We are not authenticated!')
  //       }
  //       userHanlder(user)
  //       // console.log(user);
  //     })
  //   })()
  // }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setcurrentDocumentID,
        currentDocumentID,
        login: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
          } catch (error) {
            Alert.alert(
              'There was an error'
              // error.message + '\n\n What would you like to do next?',
              // [
              //   { text: 'Ok', style: 'cancel' },
              //   { text: 'Sign Up', onPress: () => navigation.push('Signup') }
              // ]
            )
          }
        },
        register: async (auth, email, password) => {
          try {
            await createUserWithEmailAndPassword(auth, email, password)
          } catch (error) {
            Alert.alert(
              'There was an error',
              // error.message + '\n\n What would you like to do next?',
              // [
              //   { text: 'Ok', style: 'cancel' },
              //   { text: 'Sign Up', onPress: () => navigation.push('Signup') }
              // ]
            )
          }
        },
        logout: async () => {
          try {
            await auth().signOut()
          } catch (error) {
          Alert.alert('Error', error.message)
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
