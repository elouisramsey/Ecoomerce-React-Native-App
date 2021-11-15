import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import tw from '../lib/tailwind'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

import {
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc
} from 'firebase/firestore'
import { db } from '../firebase'

import {
  MaterialCommunityIcons,
  AntDesign,
  Feather,
  EvilIcons
} from '@expo/vector-icons'
import Button from '../shared/Button'
import { useFavoriteContext } from '../context/FavoriteProvider'
import { useAuthContext } from '../context/AuthProvider'
import { useCartContext } from '../context/CartProvider'

const Product = ({ route, navigation }) => {
  const [product, setProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  const [favorite, setFavorite] = useState()
  const { addToFavorites, checkifItemIsInFavorites } = useFavoriteContext()
  const [selectedTab, setSelectedTab] = React.useState('first')

  const { addToCart } = useCartContext()
  const { currentDocumentID } = useAuthContext()

  const FirstRoute = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={tw`px-2`}
        contentContainerStyle={[{ flexGrow: 1 }, tw``]}
      >
        {product ? (
          <>
            <Text style={[tw`text-base mb-3 text-black`, styles.paragraphs]}>
              {product.description}
            </Text>
            <View
              style={[
                tw`flex flex-row items-center w-full justify-between mb-3`
              ]}
            >
              <Text style={[tw`text-lightGrey text-base`, styles.paragraphs]}>
                Name:
              </Text>
              <Text
                style={[
                  tw`text-black text-base w-2/3 capitalize`,
                  styles.paragraphs
                ]}
              >
                {product.name}
              </Text>
            </View>
            <View
              style={[
                tw`flex flex-row items-center w-full justify-between mb-3`
              ]}
            >
              <Text style={[tw`text-lightGrey text-base`, styles.paragraphs]}>
                Quantity sold:
              </Text>
              <Text style={[tw`text-black text-base w-2/3`, styles.paragraphs]}>
                {product.sales}
              </Text>
            </View>
            <View
              style={[
                tw`flex flex-row items-center w-full justify-between mb-3`
              ]}
            >
              <Text style={[tw`text-lightGrey text-base`, styles.paragraphs]}>
                Categories:
              </Text>
              <Text
                style={[
                  tw`text-black text-base w-2/3 capitalize`,
                  styles.paragraphs
                ]}
              >
                {product.category}
              </Text>
            </View>
            <View
              style={[
                tw`flex flex-row items-center w-full justify-between mb-3`
              ]}
            >
              <Text
                style={[
                  tw`text-lightGrey text-base capitalize`,
                  styles.paragraphs
                ]}
              >
                Tags:
              </Text>
              <Text
                style={[
                  tw`text-black text-base w-2/3 capitalize`,
                  styles.paragraphs
                ]}
              >
                {product.type}
                {/* {product.tags.join(', ')} */}
              </Text>
            </View>
            <View
              style={[
                tw`flex flex-row items-center w-full justify-between mb-3`
              ]}
            >
              <Text style={[tw`text-lightGrey text-base`, styles.paragraphs]}>
                In stock:
              </Text>
              <Text style={[tw`text-black text-base w-2/3`, styles.paragraphs]}>
                {product.stock}
              </Text>
            </View>
            <View
              style={[
                tw`flex flex-row items-center w-full justify-between mb-3`
              ]}
            >
              <Text style={[tw`text-lightGrey text-base`, styles.paragraphs]}>
                Color:
              </Text>
              <Text
                style={[
                  tw`text-black text-base w-2/3 capitalize`,
                  styles.paragraphs
                ]}
              >
                {product.color}
              </Text>
            </View>
          </>
        ) : (
          <Text style={[tw`text-black text-base`, styles.paragraphs]}>
            Loading product...
          </Text>
        )}
      </ScrollView>
    )
  }
  const SecondRoute = () => {
    console.log(product)
    // {
    //   product?.reviews[0].flatMap((product) => {
    //     return (
    //       <View
    //         style={tw`flex border-b border-solid border-gray-200 py-3 w-full`}
    //       >
    //         <View>
    //           <Text
    //             style={[
    //               tw`text-black capitalize text-sm font-bold`,
    //               styles.paragraphs
    //             ]}
    //           >
    //             {product.name}
    //           </Text>
    //           <Text style={[tw`text-lightGrey text-xs`, styles.paragraphs]}>
    //             2 hours ago
    //           </Text>
    //         </View>
    //         <View style={tw`py-3`}>
    //           <View style={tw`flex flex-row products-center`}>
    //             <Text
    //               style={[
    //                 tw`text-black capitalize text-sm mr-1 font-bold`,
    //                 styles.paragraphs
    //               ]}
    //             >
    //               {product.star}
    //             </Text>
    //             <EvilIcons name='star' style={tw`text-lg text-gray-400 mr-2`} />
    //           </View>
    //           <Text style={[tw`text-black text-sm`, styles.paragraphs]}>
    //             {product.review}
    //           </Text>
    //         </View>
    //         <TouchableOpacity>
    //           <Text
    //             style={[
    //               tw`text-lightGrey text-xs capitalize`,
    //               styles.paragraphs
    //             ]}
    //           >
    //             reply
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //     )
    //   })
    // }
  }

  const ThirdRoute = () => {
    return (
      <View style={tw`px-2 py-5 h-full`}>
        <Text style={[tw`text-base mb-3 text-black`, styles.paragraphs]}>
          This is just a place for extra information that you need to send to
          your potential buyers. It can be about wanting to increase quantity or
          other things
        </Text>
      </View>
    )
  }

  const [routes] = React.useState([
    { key: 'first', title: 'description' },
    { key: 'second', title: 'review' },
    { key: 'third', title: 'additional information' }
  ])

  useEffect(() => {
    let { item } = route.params
    setProduct(item)
  }, [])

  // check if product is in favorites
  const handleLike = async (id) => {
    const checker = doc(db, 'users', currentDocumentID)
    const checkerSnapshot = await getDoc(checker)

    const addField = {
      favorite: checkerSnapshot.data().favorite.includes(id)
        ? arrayRemove(id)
        : arrayUnion(id)
    }
    await updateDoc(checker, addField)
  }

  const numberOfitems = 1

  function addProductToCart(product) {
    product['quantity'] = numberOfitems
    addToCart(product)
  }

  return (
    <SafeAreaView>
      <View style={[tw`flex flex-row items-center justify-between px-2 h-12`]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name='keyboard-backspace'
            style={tw`text-2xl text-black font-bold`}
          />
        </TouchableOpacity>
        <View style={tw`flex flex-row items-center`}>
          <TouchableOpacity>
            <Feather
              name='shopping-bag'
              style={tw`text-xl text-black font-bold`}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLike(product._id)}>
            <AntDesign
              name='heart'
              style={tw`text-xl font-bold ml-2 text-gray-300`}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={[tw`mb-4`]}
        contentContainerStyle={[{ flexGrow: 1 }, tw``]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[tw`flex flex-row justify-between w-full py-2 px-4`]}>
          <View style={[tw`flex`]}>
            <Text
              style={[
                tw`text-2xl text-black font-bold capitalize`,
                styles.heading
              ]}
            >
              {product?.name <= 20
                ? product?.name
                : product?.name.slice(0, 20) + '...'}
            </Text>
            <View style={tw`flex flex-row`}>
              <EvilIcons name='star' style={tw`text-lg text-gray-400 mr-2`} />

              <EvilIcons name='star' style={tw`text-lg text-gray-400 mr-2`} />

              <EvilIcons name='star' style={tw`text-lg text-gray-400 mr-2`} />
            </View>
          </View>
          <Text
            style={[
              tw`text-2xl text-red-600 font-bold capitalize`,
              styles.heading
            ]}
          >
            {'\u20A6'}{' '}
            {(product?.price * 415.16)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </View>
        <View
          style={[
            tw`w-full flex items-center justify-center border-t border-solid border-gray-200 bg-white`,
            { height: 300 }
          ]}
        >
          <Image
            source={{ uri: product?.image[0] }}
            resizeMode='contain'
            style={[
              tw`max-w-full`,
              { flex: 1, width: '100%', height: undefined }
            ]}
          />
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={tw`h-12`}
        >
          {routes.map((route) => {
            return (
              <TouchableOpacity
                key={route.key}
                style={tw`flex items-center justify-center px-2`}
                onPress={() => setSelectedTab(route.key)}
              >
                <Text
                  style={[
                    tw`text-base ${
                      selectedTab === route.key ? 'text-black' : 'text-gray-400'
                    }`,
                    styles.name
                  ]}
                >
                  {route.title}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        <ScrollView
          // style={[tw`h-full`]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={tw`h-72`}
        >
          {selectedTab === 'first' && FirstRoute()}
          {selectedTab === 'second' && SecondRoute()}
          {selectedTab === 'third' && ThirdRoute()}
        </ScrollView>

        <View style={tw`my-8 px-2`}>
          <Button
            title='add to cart'
            onPress={() => addProductToCart(product)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Product

const styles = StyleSheet.create({
  paragraphs: {
    fontFamily: 'poppins'
  },
  heading: {
    fontFamily: 'playfair'
  },
  container: {
    flex: 1,
    width: '100%'
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  name: {
    fontFamily: 'poppins',
    textTransform: 'capitalize'
  }
})
