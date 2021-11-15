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
import Cart from '../screens/Cart'
import Profile from '../screens/Profile'
import Favorites from '../screens/Favorites'
import { View, Text } from 'react-native'
import Notification from '../screens/Notification'

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
        name='Favorites'
        component={Favorites}
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
            <View style={tw`relative`}>
              <View
                style={tw`absolute h-4 w-4 rounded-full justify-center items-center bg-red-500 z-10 right-0`}
              >
                <Text style={tw`text-tiny text-white`}>0</Text>
              </View>
              <Feather
                name='shopping-bag'
                style={tw`${
                  focused ? 'text-black ' : 'text-gray-400 '
                } text-2xl`}
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name='Notification'
        component={Notification}
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
        component={Profile}
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
