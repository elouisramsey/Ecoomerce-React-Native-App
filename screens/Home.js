import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'
import React, { useEffect } from 'react'
import tw from '../lib/tailwind'
import Button from '../shared/Button'
import { LogBox } from 'react-native'

import { Ionicons, Feather } from '@expo/vector-icons'
import  NewProducts  from '../components/New'
import Bestseller from '../components/BestSeller'
import { Categories } from '../components/Categories'
import { useCartContext } from '../context/CartProvider'

const Home = ({ navigation }) => {
 const { numberOfItemsInCart, emptyCart } = useCartContext()
 console.log(numberOfItemsInCart)
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
  }, [])
  function renderHeader() {
    const handleError = (e) => {
      console.log(e.nativeEvent.error)
    }
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: '100%'
          }}
        >
          <ImageBackground
            onError={handleError}
            imageStyle={{ opacity: 0.85 }}
            source={require('../assets/images/beautiful-couch.jpg')}
            style={[tw`px-4 py-6`, styles.image]}
          >
            <View style={tw`flex justify-between flex-row mb-5 mt-4`}>
              <TouchableOpacity>
                <Ionicons
                  name='menu-outline'
                  style={tw`text-gray-200 text-3xl`}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => emptyCart()}>
                <Text style={[tw`text-tiny text-red-500 `, styles.paragraphs]}>
                  reomve all
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`relative`}>
                <Feather
                  name='shopping-bag'
                  style={tw`text-gray-200 text-2xl`}
                />
                <View
                  style={tw`z-10 absolute -right-1 h-4 w-4 rounded-full flex items-center justify-center bg-white`}
                >
                  <Text
                    style={[tw`text-tiny text-red-500 `, styles.paragraphs]}
                  >
                    {numberOfItemsInCart}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={tw`h-full w-full`}>
              <View
                style={tw`border-r border-solid border-black px-2 flex justify-end flex-row`}
              >
                <Text
                  style={[
                    tw`font-light capitalize text-base text-right`,
                    styles.paragraphs
                  ]}
                >
                  couch{'\n'}
                  2021
                </Text>
              </View>
              <View style={tw`flex`}>
                <Text
                  style={[
                    tw`text-heroHead my-6 text-2xl font-bold`,
                    styles.heading
                  ]}
                >
                  Get furniture that gives comfort
                </Text>
                <Text style={[tw`text-base text-white`, styles.paragraphs]}>
                  We offer high quality furniture for the best prices with
                  access to doorstep delivery services
                </Text>
              </View>
              <View style={tw`my-6 w-1/2`}>
                <Button title='Shop now' />
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    )
  }
  return (
    <ScrollView style={[tw`bg-white`]}>
      {renderHeader()}
      <NewProducts navigation={navigation} />
      <Bestseller navigation={navigation} />
      <Categories navigation={navigation} />
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  paragraphs: {
    fontFamily: 'poppins'
  },
  container: {
    backgroundColor: '#f1f2f6'
  },
  heading: {
    fontFamily: 'playfair'
  },
  header: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'red'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    // backgroundColor: 'rgba(255,0,0,0.2)',
    height: null,
    width: null
    // opacity: 0.9
  }
})