import React, { useRef, useState } from 'react'
// import Carousel from 'react-native-snap-carousel'
import {
  View,
  Animated,
  Dimensions,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import tw from '../../lib/tailwind'
import Carousel from 'react-native-anchor-carousel'
const { width: viewportWidth } = Dimensions.get('window')
import { EvilIcons } from '@expo/vector-icons'
import Input from '../../shared/Input'

const INITIAL_INDEX = 0

export default function CustomSlider({ data, navigation }) {
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX)
  const [openInput, setOpenInput] = useState(false)

  function handleCarouselScrollEnd(item, index) {
    setCurrentIndex(index)
  }

  const fadeAnim = useRef(new Animated.Value(0)).current

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  function renderItem({ item }) {
    const { source } = item
    return (
      <View
        style={{
          // backgroundColor: 'rgb(255,0,0)',
          flex: 1,
          borderColor: 'white',
          // flexDirection: 'row',
          width: '100%',
          height: '100%'
        }}
      >
        <ImageBackground
          source={source}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0, 0.4)',
            borderWidth: 0,
            borderColor: 'white',
            resizeMode: 'contain'
            // opacity: 0.8
          }}
        >
          <View />
          <View style={tw`flex justify-end px-2 items-center flex-row`}>
            <Animated.View
              style={[
                tw`flex-row w-4/5 items-center`,
                {
                  // Bind opacity to animated value
                  opacity: fadeAnim
                }
              ]}
            >
              <Input
                onFocus={() => navigation.navigate('Search')}
                placeholder='Search for product'
                style={tw`w-full`}
              />
            </Animated.View>

            <TouchableOpacity
              style={tw`h-11 items-center flex justify-center mt-5`}
              onPress={fadeIn}
            >
              <EvilIcons name='search' style={tw`text-gray-200 text-3xl`} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )
  }

  return (
    <View style={{ height: 500 }}>
      <Carousel
        style={{
          backgroundColor: '#fff',
          aspectRatio: 1.5,
          flexGrow: 0,
          height: '100%'
          // marginBottom: 20
        }}
        onScrollEnd={handleCarouselScrollEnd}
        renderItem={renderItem}
        data={data}
        // ref={isCarousel}
        itemWidth={viewportWidth}
        // inActiveOpacity={0.3}
        containerWidth={viewportWidth}
      />
    </View>
  )
}
