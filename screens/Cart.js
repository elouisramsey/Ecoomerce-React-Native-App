import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Image,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '../lib/tailwind'
import { Feather } from '@expo/vector-icons'
import { useCartContext } from '../context/CartProvider'
import Button from '../shared/Button'

const Cart = ({ navigation }) => {
  const { numberOfItemsInCart, total, cart, emptyCart, removeFromCart } =
    useCartContext()

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View style={tw`bg-transparent h-full`}>
        <View style={[tw`p-2`]}>
          <View style={tw`flex flex-row justify-between items-center`}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name='x' style={tw`text-2xl text-black font-bold`} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text
                style={[
                  tw`text-blue-600 font-bold text-base capitalize`,
                  styles.paragraphs
                ]}
              >
                edit
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={[tw`text-black font-bold text-3xl my-3`, styles.heading]}
          >
            Shopping cart
          </Text>
        </View>

        {cart.length ? (
          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={[
                  tw`border-t border-b border-solid border-gray-200 py-3 `
                ]}
              >
                <Text
                  style={[
                    tw`text-black text-xl font-medium my-2 px-2`,
                    styles.paragraphs
                  ]}
                >
                  {numberOfItemsInCart}{' '}
                  {numberOfItemsInCart > 1 ? 'products' : 'product'} in cart
                </Text>
                <View style={[tw`h-full`]}>
                  {cart.map((item) => (
                    <View style={tw`flex-row h-20 mb-6`} key={item.id}>
                      <View
                        style={tw`w-2/5 items-center justify-center px-4 bg-light`}
                      >
                        <Image
                          source={item.image}
                          style={{
                            width: '100%',
                            height: undefined,
                            aspectRatio: 1
                          }}
                          resizeMode='contain'
                        />
                      </View>
                      <View
                        style={tw`border-b border-solid border-gray-200 w-3/5 px-4`}
                      >
                        <View
                          style={[tw`flex-row items-center justify-between`]}
                        >
                          <Text
                            style={[
                              tw`text-black font-bold capitalize text-base`,
                              styles.heading
                            ]}
                          >
                            {item.name}
                          </Text>
                          <TouchableOpacity
                            onPress={() => removeFromCart(item)}
                            style={[
                              tw`h-4 w-4 rounded-full items-center justify-center bg-red-500`
                            ]}
                          >
                            <Text
                              style={[
                                tw`text-xs text-gray-100`,
                                styles.paragraphs
                              ]}
                            >
                              X
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <Text
                          style={[
                            tw`text-gray-400 text-sm mb-1`,
                            styles.paragraphs
                          ]}
                        >
                          {'\u20A6'}
                          {item.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Text>
                        <View style={tw`flex flex-row items-center`}>
                          <View style={tw`h-3 w-3 rounded-full bg-black`} />
                          <Text
                            style={[
                              tw`text-gray-400 text-sm capitalize mx-1`,
                              styles.paragraphs
                            ]}
                          >
                            black
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
            <View style={tw`border-t border-solid border-gray-300`}>
              <View style={tw`px-2 py-5`}>
                <View style={tw`flex flex-row justify-between w-full mb-1`}>
                  <Text
                    style={[
                      tw`text-gray-500 text-base w-2/5`,
                      styles.paragraphs
                    ]}
                  >
                    Shipping fee
                  </Text>
                  <Text
                    style={[
                      tw`text-gray-500 text-base w-2/5  text-right`,
                      styles.paragraphs
                    ]}
                  >
                    {'\u20A6'}
                    {(50000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
                <View style={tw`flex flex-row justify-between w-full mb-1`}>
                  <Text
                    style={[
                      tw`text-gray-500 text-base w-2/5`,
                      styles.paragraphs
                    ]}
                  >
                    Sub total
                  </Text>
                  <Text
                    style={[
                      tw`text-gray-500 text-base w-2/5 text-right`,
                      styles.paragraphs
                    ]}
                  >
                    {'\u20A6'}
                    {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
                <View style={tw`flex flex-row justify-between w-full mb-1`}>
                  <Text
                    style={[
                      tw`text-black font-bold text-base w-2/5`,
                      styles.paragraphs
                    ]}
                  >
                    Total
                  </Text>
                  <Text
                    style={[
                      tw`text-black font-bold text-base w-2/5 text-right`,
                      styles.paragraphs
                    ]}
                  >
                    {'\u20A6'}
                    {(450000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
              </View>
              <View style={tw`mb-4 px-2`}>
                <Button title='checkout' />
              </View>
            </View>
          </View>
        ) : (
          <Text>Nothing yet</Text>
        )}
      </View>
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({
  paragraphs: {
    fontFamily: 'poppins'
  },
  heading: {
    fontFamily: 'playfair'
  },
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 35 : 0
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0
  }
})
