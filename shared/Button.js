import React from 'react'
import { Text, StyleSheet, Pressable } from 'react-native'
import tw from '../lib/tailwind'

export default function Button(props) {
  return (
    <Pressable
      style={[
        tw`items-center justify-center py-4 px-16 bg-black rounded-sm shadow-md`,
        { ...props.style }
      ]}
      onPress={props.onPress}
    >
      <Text
        style={[
          tw`text-base font-bold text-white capitalize`,
          styles.text,
          {...props.textStyle}
        ]}
      >
        {props.title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'poppins'
  }
})
