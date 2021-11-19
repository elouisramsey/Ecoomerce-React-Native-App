import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EvilIcons } from '@expo/vector-icons'
import tw from '../../lib/tailwind'

export default function CreditCard() {
  return (
    <SafeAreaView style={[tw`bg-gray-100`, { flex: 1 }]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw``}
      >
        <View
          style={tw`flex-row items-center h-12 border-b border-gray-300`}
        >
          <EvilIcons
            name='chevron-left'
            style={[tw`text-black font-bold`, { fontSize: 40 }]}
          />
          <Text style={[tw`text-2xl text-black font-bold`, styles.heading]}>
            Credit Cards
          </Text>
        </View>
        <View style={tw`pt-6 items-center`}>
          <View style={tw`w-72 rounded-xl relative p-6 pt-10 bg-blue-800`}>
            <View style={[styles.bgCircle, styles.rightBgCircle]} />
            <View style={[styles.bgCircle, styles.bottomBgCircle]} />
            <View style={tw`relative mb-6`}>
              <View style={tw`w-12 h-12 rounded-full bg-red-500 z-10`} />
              <View
                style={tw`w-12 h-12 rounded-full bg-yellow-400 absolute left-5`}
              />
            </View>
            <View style={tw`flex-row justify-between items-center`}>
              <View style={tw`flex-row`}>
                <Text
                  style={[
                    tw`text-white text-base tracking-wide`,
                    styles.paragraphs
                  ]}
                >
                  4190
                </Text>
              </View>
              <View style={tw`flex-row`}>
                <View style={tw`w-2 h-2 mr-1 rounded-full bg-white`} />
                <View style={tw`w-2 h-2 mr-1 rounded-full bg-white`} />
                <View style={tw`w-2 h-2 mr-1 rounded-full bg-white`} />
                <View style={tw`w-2 h-2 mr-1 rounded-full bg-white`} />
              </View>
              <View style={tw`flex-row`}>
                <View style={tw`w-2 h-2 mr-1 rounded-full bg-white`} />
                <View style={tw`w-2 h-2 mr-1 rounded-full bg-white`} />
                <View style={tw`w-2 h-2 mr-1 rounded-full bg-white`} />
                <View style={tw`w-2 h-2 mr-1 rounded-full bg-white`} />
              </View>
              <View style={tw`flex-row`}>
                <Text
                  style={[
                    tw`text-white text-base tracking-wide`,
                    styles.paragraphs
                  ]}
                >
                  8867
                </Text>
              </View>
            </View>
            <View style={tw`flex-row justify-between items-center mt-6`}>
              <Text
                style={[
                  tw`text-white text-lg tracking-wide`,
                  styles.paragraphs
                ]}
              >
                Louis Ramsey
              </Text>
              <Text
                style={[
                  tw`text-white text-lg tracking-wide`,
                  styles.paragraphs
                ]}
              >
                09/23
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const circleSize = 250

const styles = StyleSheet.create({
  paragraphs: {
    fontFamily: 'poppins'
  },
  heading: {
    fontFamily: 'playfair'
  },
  bgCircle: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.05,
    height: circleSize,
    width: circleSize,
    borderRadius: circleSize
  },
  rightBgCircle: {
    top: (-1 * circleSize) / 4,
    right: (-1 * circleSize) / 2
  },
  bottomBgCircle: {
    bottom: (-1 * circleSize) / 2,
    left: (0 * (-1 * circleSize)) / 2
  }
})
