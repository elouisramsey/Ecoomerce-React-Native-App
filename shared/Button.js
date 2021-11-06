import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import tw from '../lib/tailwind'

export default function Button(props) {
  const { onPress, title = 'Shop', transform='capitalize' } = props
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={[tw`${transform} `,styles.text]}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 1,
    elevation: 3,
    backgroundColor: 'black'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'poppins',
  }
})
