import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '../lib/tailwind'

export default function Favorites() {
  return (
    <SafeAreaView style={[tw`bg-gray-100`, { flex: 1 }]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw``}
      >
          <Text>Favorites</Text>
      </ScrollView>
    </SafeAreaView>
  )
}
