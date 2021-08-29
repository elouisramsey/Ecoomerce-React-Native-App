import React, { useState } from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import Appnavigator from './components/AppNavigator'
import { CartProvider } from './context/CartProvider'

const getFont = () =>
  Font.loadAsync({
    poppins: require('./assets/fonts/Poppins-Regular.ttf'),
    playfair: require('./assets/fonts/PlayfairDisplay-Regular.ttf')
  })

export default function App() {
  const [fontsLoaded, setFontLoaded] = useState(false)

  if (fontsLoaded) {
    return (
      <CartProvider>
        <Appnavigator />
      </CartProvider>
    )
  } else {
    return (
      <AppLoading
        startAsync={getFont}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    )
  }
}
