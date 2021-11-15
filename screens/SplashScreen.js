import React, { useEffect } from 'react'
import { View, Text, ImageBackground, LayoutAnimation } from 'react-native'
import tw from '../lib/tailwind'

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.spring()
      navigation.navigate('Home')
    }, 5000)
  }, [])

  return (
    <ImageBackground
      source={require('../assets/images/SplashScreen.jpg')}
      style={[{ width: '100%', height: '100%' }, tw`py-16`]}
    >
      <View style={[tw`h-full px-8 justify-end`, { fontFamily: 'poppins' }]}>
        <Text style={tw`text-sm text-gray-700 text-right mb-2`}>2021</Text>
        <Text
          style={tw`text-3xl text-black font-bold capitalize text-right mb-3`}
        >
          urban collection
        </Text>
        <Text style={tw`text-base text-gray-800 text-right`}>
          Discover our urban collection to spend the summer with great style.
        </Text>
      </View>
    </ImageBackground>
  )
}
