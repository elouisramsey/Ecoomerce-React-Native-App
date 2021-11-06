import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {
  Octicons,
  SimpleLineIcons,
  Fontisto,
  Ionicons,
  Feather
} from '@expo/vector-icons'

import tw from '../lib/tailwind'

import Home from '../screens/Home'
import Login from '../screens/Login'
import Cart from '../screens/Cart'
import Signup from '../screens/SignUp'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [
          {
            display: 'flex',
            borderTopWidth: 0,
            backgroundColor: 'white',
            elevation: 0
          },
          null
        ]
      }}
    >
      <Tab.Screen
        name='Homer'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Octicons
              name='home'
              size={24}
              style={tw`${
                focused ? 'text-black ' : 'text-gray-400  '
              } text-2xl`}
            />
          )
        }}
      />
      <Tab.Screen
        name='Bookmarks'
        component={Signup}
        options={{
          tabBarIcon: ({ focused }) => (
            <Fontisto
              name='bookmark'
              style={tw`${focused ? 'text-black ' : 'text-gray-400 '} text-2xl`}
            />
          )
        }}
      />
      <Tab.Screen
        name='Cart'
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name='shopping-bag'
              style={tw`${focused ? 'text-black ' : 'text-gray-400 '} text-2xl`}
            />
          )
        }}
      />
      <Tab.Screen
        name='Notifications'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <SimpleLineIcons
              name='bell'
              style={tw`${
                focused ? 'text-black ' : 'text-gray-400  '
              } text-2xl`}
            />
          )
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name='md-person-outline'
              style={tw`${
                focused ? 'text-black ' : 'text-gray-400  '
              } text-2xl`}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
