import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Product from '../screens/Product'
import Tabs from '../navigation/tabs'
import Cart from '../screens/Cart'
import Resetpassword from '../screens/ResetPassword'
import Signup from '../screens/SignUp'
import SearchSuggestions from './Search/SearchSuggestions'
import Search from './Search/Search'

const Stack = createStackNavigator()

const Appnavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Home'}
      >
        <Stack.Screen name='Home' component={Tabs} />
        <Stack.Screen name='Product' component={Product} />
        <Stack.Screen name='Cart' component={Cart} />
        <Stack.Screen name='Resetpassword' component={Resetpassword} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Search' component={Search} />
        <Stack.Screen name='SearchSuggestions' component={SearchSuggestions} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Appnavigator
