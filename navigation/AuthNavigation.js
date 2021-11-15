import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SignedInStack, SignedOutStack } from '../components/Navigations'
import { useAuthContext } from '../context/AuthProvider'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Loading from '../components/Loader/Loading'

export default function AuthNavigation() {
  const { user, setUser } = useAuthContext()
  const [isLoading, setIsLoading] = useState(true)
  const [initializing, setInitializing] = useState(true)
const auth = getAuth()

  // Handle user state changes
  function onAuthStateChange(user) {
    setUser(user)
    if (initializing) setInitializing(false)
    setIsLoading(false)
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthStateChange)
    return subscriber // unsubscribe on unmount
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {user ? <SignedInStack /> : <SignedOutStack />}
    </NavigationContainer>
  )
}
