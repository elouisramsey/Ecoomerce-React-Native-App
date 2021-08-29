import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {
  Octicons,
  SimpleLineIcons,
  Fontisto,
  Ionicons
} from '@expo/vector-icons'

import tw from '../lib/tailwind'

import Home from '../screens/Home'

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
        component={Home}
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
