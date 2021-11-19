import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
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
import { query, collection, onSnapshot, where } from 'firebase/firestore'
import { db } from '../firebase'
import Input from '../shared/Input'
import { convertCurrency } from '../actions/CurrencyConverter'

const Cart = ({ navigation }) => {
  const [cart, setCart] = useState([])
  const [promocode, setPromocode] = useState(false)
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)
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

            cart.forEach((item) => {
              const c = item.price * 22 * item.quantity
              setPrices((oldp) => [...oldp, c])
            })
            setCart(cart)
          })
        })
      }
      getters().then(() => setLoading(false))
    }
  }, [])

  if (loading) {
    return (
      <View styles={tw`items-center justify-center my-4`}>
        <ActivityIndicator size='small' color='#000' />
      </View>
    )
  }

  const totalPrice = prices?.reduce((a, b) => a + b, 0)

  return (
    <SafeAreaView style={[tw`bg-gray-100`, { flex: 1 }]}>
      <View style={tw`flex-row items-center justify-between h-12`}>
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
            shopping cart
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={[
              tw`text-blue-600 font-bold text-base capitalize mr-3`,
              styles.paragraphs
            ]}
          >
            edit
          </Text>
        </TouchableOpacity>
      </View>
      {cart.length < 1 && loading === false && (
        <View style={tw`justify-center items-center h-full`}>
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
            onPress={() => navigation.navigate('Home')}
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
      <View style={{ flex: 1 }}>
        <View
          style={[
            tw`border-t border-b border-solid border-gray-200 py-3`,
            { flex: 1 }
          ]}
        >
          <Text
            style={[
              tw`text-black text-xl font-medium my-2 px-2`,
              styles.paragraphs
            ]}
          >
            {cart.length} {cart.length > 1 ? 'products' : 'product'} in cart
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            // contentContainerStyle={{ flexGrow: 1 }}
          >
            {cart.map((item) => (
              <View style={tw`flex-row h-20 mb-6`} key={item.id}>
                <View
                  style={tw`w-2/5 items-center justify-center px-4 bg-light overflow-hidden h-full`}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: '100%',
                      height: undefined,
                      aspectRatio: 1
                    }}
                    resizeMode='cover'
                  />
                </View>
                <View
                  style={tw`border-b border-solid border-gray-200 w-3/5 px-4`}
                >
                  <View style={[tw`flex-row items-center justify-between`]}>
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
                        style={[tw`text-xs text-gray-100`, styles.paragraphs]}
                      >
                        X
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={[tw`text-gray-400 text-sm mb-1`, styles.paragraphs]}
                  >
                    {convertCurrency(item.price * item.quantity * 22)}
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
          </ScrollView>
        </View>
        <View style={tw`px-3 w-full`}>
          <View style={tw`border-solid py-6 border-gray-200 border-b`}>
            <TouchableOpacity onPress={() => setPromocode(!promocode)}>
              <Text
                style={[
                  tw`text-black font-medium text-base`,
                  styles.paragraphs
                ]}
              >
                Do you have a promotional code?
              </Text>
              {promocode && <Input style={tw`mt-2`} />}
            </TouchableOpacity>
          </View>
          <View style={tw`flex flex-row justify-between w-full mb-1 mt-4`}>
            <Text
              style={[tw`text-gray-500 text-base w-2/5`, styles.paragraphs]}
            >
              Sub total
            </Text>
            <Text
              style={[
                tw`text-gray-500 text-base w-2/5 text-right`,
                styles.paragraphs
              ]}
            >
              {convertCurrency(totalPrice)}
            </Text>
          </View>
          <View style={tw`flex-row justify-between items-center mb-4 pt-2`}>
            <Text
              style={[tw`text-black font-medium text-base`, styles.paragraphs]}
            >
              Delivery
            </Text>
            <Text
              style={[
                tw`text-gray-600 font-medium text-base`,
                styles.paragraphs
              ]}
            >
              Standard - Free
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
              {convertCurrency(totalPrice)}
            </Text>
          </View>
          <View style={tw`my-8`}>
            <Button
              title='proceed to checkout'
              onPress={() =>
                navigation.navigate('Checkout', { cart, totalPrice })
              }
            />
          </View>
        </View>
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
})
