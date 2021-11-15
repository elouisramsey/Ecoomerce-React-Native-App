import 'react-native-gesture-handler'
import React, { useState } from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { CartProvider } from './context/CartProvider'
import { FavoriteProvider } from './context/FavoriteProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SearchProvider } from './context/SearchProvider'
import AuthNavigation from './navigation/AuthNavigation'
import { AuthProvider } from './context/AuthProvider'

const getFont = () =>
  Font.loadAsync({
    poppins: require('./assets/fonts/Poppins-Regular.ttf'),
    playfair: require('./assets/fonts/PlayfairDisplay-Regular.ttf')
  })

export default function App() {
  const [fontsLoaded, setFontLoaded] = useState(false)

  const queryClient = new QueryClient()

  if (fontsLoaded) {
    return (
      <SafeAreaProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <CartProvider>
              <FavoriteProvider>
                <SearchProvider>
                  <AuthNavigation />
                </SearchProvider>
              </FavoriteProvider>
            </CartProvider>
          </QueryClientProvider>
        </AuthProvider>
      </SafeAreaProvider>
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
