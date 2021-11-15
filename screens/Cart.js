import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Image,
  ScrollView,
  Pressable
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '../lib/tailwind'
import { EvilIcons } from '@expo/vector-icons'
import { useCartContext } from '../context/CartProvider'
import Button from '../shared/Button'

import { getAuth } from 'firebase/auth'
import {
  query,
  collection,
  onSnapshot,
  where
} from 'firebase/firestore'
import { db } from '../firebase'

const Cart = ({ navigation }) => {
  const [cart, setCart] = useState([])
  // const { numberOfItemsInCart, total, cart, emptyCart, removeFromCart } =
  //   useCartContext()

      const auth = getAuth()
      const user = auth.currentUser
  useEffect(() => {
    if (user !== null) {
      let uid = user.uid
      const getters = async () => {
        const fav = collection(db, 'users')
        const q = query(fav, where('owner_uid', '==', uid))
        onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
         const { cart } = doc.data()
         setCart(cart)
          })
        })
      }
      getters()
    }
  }, [])

  return (
    <SafeAreaView style={[tw`bg-gray-100`, { flex: 1 }]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`h-full`}
      >
        <View style={[tw`px-3`]}>
          <View style={tw`flex flex-row justify-between items-center h-12`}>
            <TouchableOpacity
              // onPress={navigation.goBack()}
              style={[
                tw`w-6 h-6 bg-red-500 rounded-full items-center justify-center`
              ]}
            >
              <Text style={[tw`text-sm text-gray-200`, styles.paragraphs]}>
                X
              </Text>
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
            style={[tw`text-black font-bold text-3xl mt-2`, styles.heading]}
          >
            Shopping cart
          </Text>
        </View>

        <View style={[{ flex: 1 }, tw`h-full`]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`h-full`}
          >
            {cart.length ? (
              <>
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
                    {cart.length}{' '}
                    {cart.length > 1 ? 'products' : 'product'} in cart
                  </Text>
                  <View style={[tw`h-full my-4`]}>
                    {cart.map((item) => (
                      <View style={tw`flex-row h-20 mb-6`} key={item.id}>
                        <View
                          style={tw`w-2/5 items-center justify-center px-4 bg-light overflow-hidden h-full`}
                        >
                          <Image
                            source={{uri: item.image}}
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
                          {/* <View style={tw`flex flex-row items-center`}>
                            <View style={[tw`h-3 w-3 rounded-full bg-black`]} />
                            <Text
                              style={[
                                tw`text-gray-400 text-sm capitalize mx-1`,
                                styles.paragraphs
                              ]}
                            >
                              {item.color}
                            </Text>
                          </View> */}
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
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
                        {(50000)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
                        5000
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
                        {(450000)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </Text>
                    </View>
                  </View>
                  <View style={tw`mb-4 px-2`}>
                    <Button title='checkout' />
                  </View>
                </View>
              </>
            ) : (
              <View
                style={tw`justify-center items-center h-full`}
              >
                <View
                  style={tw`justify-center items-center h-36 w-36 rounded-full bg-gray-300 mb-6`}
                >
                  <EvilIcons
                    name='cart'
                    style={[tw`text-black font-bold`, { fontSize: 80 }]}
                  />
                </View>
                <Text style={[tw`text-gray-600 text-base`, styles.paragraphs]}>
                  Unfortunately, your cart is Empty
                </Text>
                <Text
                  style={[tw`text-gray-400 text-sm mb-6 mt-2`, styles.paragraphs]}
                >
                  Please add some products to your cart
                </Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate('Home')
                  }
                  style={tw`justify-center items-center py-2 px-7 border rounded-sm shadow-sm bg-black`}
                >
                  <Text
                    style={[
                      tw`text-sm font-bold capitalize tracking-wide text-white`,
                      styles.paragraphs
                    ]}
                  >
                   continue shopping
                  </Text>
                </Pressable>
              </View>
            )}
          </ScrollView>
        </View>
      </ScrollView>
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
