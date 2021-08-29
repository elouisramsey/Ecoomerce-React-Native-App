import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Product from '../screens/Product'
import Tabs from '../navigation/tabs'

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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Appnavigator
