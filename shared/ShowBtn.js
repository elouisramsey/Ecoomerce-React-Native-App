import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import tw from '../lib/tailwind'
import { MaterialIcons } from '@expo/vector-icons'

const Showbtn = (props) => {
  const { onPress, title = 'Show all' } = props
  return (
    <Pressable
      style={tw`text-black flex flex-row items-center`}
      onPress={onPress}
    >
      <View style={tw`flex flex-row items-center`}>
        <Text style={tw`text-black text-sm font-medium`}>{title}</Text>

        <MaterialIcons
          name='arrow-right'
          style={[tw`text-black text-sm text-3xl`, styles.text]}
        />
      </View>
    </Pressable>
  )
}

export default Showbtn

const styles = StyleSheet.create({
  text: {
    fontFamily: 'poppins'
  }
})
