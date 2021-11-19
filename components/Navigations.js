import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Product from '../screens/Product'
import Tabs from '../navigation/tabs'
import Resetpassword from '../screens/ResetPassword'
import Signup from '../screens/SignUp'
import SearchSuggestions from './Search/SearchSuggestions'
import Search from './Search/Search'
import EditProfile from '../screens/Profile/EditProfile'
import SplashScreen from '../screens/SplashScreen'
import { Easing } from 'react-native'
import Login from '../screens/Login'
import CreditCard from './cards/CreditCard'
import Checkout from '../screens/checkout/Checkout'

const Stack = createStackNavigator()

const config = {
  animation: 'timing',
  config: {
    duration: 2500,
    Easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99)
    // delay: 20
  }
}

export const SignedInStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName={'SplashScreen'}
    >
      <Stack.Screen
        name='SplashScreen'
        component={SplashScreen}
        options={{
          transitionSpec: {
            open: config,
            close: config
          }
        }}
      />
      <Stack.Screen
        name='Home'
        component={Tabs}
        options={{
          transitionSpec: {
            open: config,
            close: config
          },
          gestureEnabled: true
        }}
      />
      <Stack.Screen
        name='Product'
        component={Product}
        options={{
          transitionSpec: {
            open: config,
            close: config
          },
          gestureEnabled: true
        }}
      />
      <Stack.Screen name='Resetpassword' component={Resetpassword} />
      <Stack.Screen name='Search' component={Search} />
      <Stack.Screen name='Checkout' component={Checkout} />
      <Stack.Screen name='SearchSuggestions' component={SearchSuggestions} />
      <Stack.Screen
        name='EditProfile'
        component={EditProfile}
        options={{ gestureEnabled: true }}
      />
      <Stack.Screen
        name='CreditCard'
        component={CreditCard}
        options={{ gestureEnabled: true }}
      />
    </Stack.Navigator>
  )
}

export const SignedOutStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName={'SplashScreen'}
    >
      <Stack.Screen
        name='SplashScreen'
        component={SplashScreen}
        options={{
          transitionSpec: {
            open: config,
            close: config
          }
        }}
      />
      <Stack.Screen
        name='Home'
        component={Tabs}
        options={{
          transitionSpec: {
            open: config,
            close: config
          }
        }}
      />
      <Stack.Screen
        name='Product'
        component={Product}
        options={{ gestureEnabled: true }}
      />
      <Stack.Screen
        name='Resetpassword'
        component={Resetpassword}
        options={{ gestureEnabled: true }}
      />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name='Search' component={Search} />
      <Stack.Screen name='SearchSuggestions' component={SearchSuggestions} />
      <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
  )
}
