import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import tw from '../lib/tailwind'

export default function Input(props) {
 return (
   <View style={tw`w-full`}>
     <TextInput
       {...props}
       selectionColor={'lightgrey'}
       autoCapitalize='none'
       autoCorrect={false}
       clearButtonMode='always'
       style={[
         tw`h-11 border border-gray-300 rounded text-sm text-gray-700 p-2`,
         styles.paragraphs,
         props.error && tw`border-red-500`,
         props.style
       ]}
     />
     {props.errorText && (
       <Text style={[tw` mb-1 text-red-500`, styles.paragraphs]}>
         {props.errorText}
       </Text>
     )}
   </View>
 )   
}

const styles = StyleSheet.create({
  paragraphs: {
    fontFamily: 'poppins'
  },
})