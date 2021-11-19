import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native'
import tw from '../../lib/tailwind'
import { EvilIcons } from '@expo/vector-icons'
import { convertCurrency } from '../../actions/CurrencyConverter'

export default function Checkout({ route }) {
  const { cart } = route.params

  return (
    <SafeAreaView style={[tw`bg-gray-100`, { flex: 1 }]}>
      <View
        style={tw`flex-row items-center justify-between h-12 border-b border-solid border-gray-200`}
      >
        <View style={tw`flex-row`}>
          <EvilIcons
            name='chevron-left'
            style={[tw`text-black font-bold`, { fontSize: 40 }]}
          />
          <Text
            style={[
              tw`text-2xl text-black font-bold capitalize`,
              styles.heading
            ]}
          >
            Checkout
          </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={tw`border-b border-solid border-gray-200 px-3 py-4`}>
          <Text style={tw`text-xl text-black font-bold`}>Louis Ramsey</Text>
          <TouchableOpacity style={tw`flex-row justify-between my-2`}>
            <View style={tw``}>
              <Text style={tw`text-gray-600 text-sm mb-1 capitalize`}>
                22a Floyd jageer street
              </Text>

              <Text style={tw`text-gray-600 text-sm mb-1 capitalize`}>
                London
              </Text>

              <Text style={tw`text-gray-600 text-sm capitalize`}>
                United Kingdom
              </Text>
            </View>
            <EvilIcons
              name='chevron-right'
              style={[tw`text-gray-400 font-bold`, { fontSize: 40 }]}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={tw`border-b border-solid border-gray-200 px-3 py-5 flex-row justify-between items-center`}
        >
          <View style={tw``}>
            <View style={tw`w-8 h-8 rounded-full bg-red-500 z-10`} />
            <View
              style={tw`w-8 h-8 rounded-full bg-yellow-400 absolute left-5`}
            />
          </View>
          <Text style={tw`text-base text-black font-bold`}>
            Master Card ending ***67
          </Text>
          <EvilIcons
            name='chevron-right'
            style={[tw`text-gray-400 font-bold`, { fontSize: 40 }]}
          />
        </TouchableOpacity>
        <View style={tw`border-b border-solid border-gray-200 px-3 py-5`}>
          {cart?.map((item) => (
            <View
              style={tw`flex-row h-28 border-b border-solid border-gray-200 mb-3`}
              key={item.id}
            >
              <View
                style={tw`flex-row items-center h-full w-2/5 overflow-hidden`}
              >
                <Image
                  source={{ uri: item.image }}
                  style={[
                    {
                      width: '100%',
                      height: undefined,
                      aspectRatio: 1
                    },
                    tw``
                  ]}
                  resizeMode='cover'
                />
              </View>
              <View style={tw`p-4`}>
                <Text style={tw`text-lg text-black font-bold capitalize`}>
                  {item.name}
                </Text>
                <Text style={tw`text-tiny text-gray-400`}>Ref: {item.id}</Text>
                <View style={tw`flex-row justify-between`}>
                  <Text style={tw`text-base text-black font-bold`}>
                    {convertCurrency(item.price * 22 * item.quantity)}
                
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={tw`px-3 py-5`}>
          <Text style={tw`text-base text-black font-bold`}></Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  paragraphs: {
    fontFamily: 'poppins'
  },
  heading: {
    fontFamily: 'playfair'
  }
})
