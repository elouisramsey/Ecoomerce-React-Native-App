import React, { useRef, useState } from 'react'
// import Carousel from 'react-native-snap-carousel'
import {
  View,
  Animated,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native'
import tw from '../../lib/tailwind'
import Carousel from 'react-native-anchor-carousel'
const { width: viewportWidth } = Dimensions.get('window')
import { EvilIcons } from '@expo/vector-icons'
import Input from '../../shared/Input'

export default function CustomSlider({ data, navigation }) {
  const carouselRef = useRef(null)

  function renderItem({ item }) {
    const { source } = item
    return (
      <View
        style={{
          flex: 1,
          borderColor: 'white',
          width: '100%',
          height: '100%'
        }}
      >
        <ImageBackground
          source={source}
          resizeMode='cover'
          style={[
            {
              flex: 1,
              backgroundColor: 'rgba(0,0,0, 0.4)',
              borderWidth: 0,
              borderColor: 'white',
              width: viewportWidth
            },
            tw`overflow-hidden z-10`
          ]}
        />
      </View>
    )
  }

  return (
    <>
      <View style={tw`flex justify-end items-center flex-row`}>
        <View style={tw`flex-row w-full items-center`}>
          <Input
            onFocus={() => navigation.navigate('Search')}
            placeholder='Search for product'
            style={tw`w-full rounded-none border-gray-300 border-b-0`}
          />
        </View>
      </View>
      <View style={{ height: 230, overflow: 'hidden', width: viewportWidth }}>
        <Carousel
          style={{
            backgroundColor: '#fff',
            aspectRatio: 1.5,
            flexGrow: 0,
            height: '100%'
          }}
          ref={carouselRef}
          separatorWidth={0}
          renderItem={renderItem}
          data={data}
          itemWidth={viewportWidth}
          containerWidth={viewportWidth}
          minScrollDistance={5}
        />
      </View>
    </>
  )
}
