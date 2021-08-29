import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Image,
  FlatList,
  ScrollView,
  Dimensions
} from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from '../lib/tailwind'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

import {
  MaterialCommunityIcons,
  AntDesign,
  Feather,
  EvilIcons
} from '@expo/vector-icons'
import Button from '../shared/Button'

const initialLayout = { width: Dimensions.get('window').width }

const Product = ({ route, navigation }) => {
  const [product, setProduct] = useState(null)

  const FirstRoute = () => {
    return (
      <View style={tw`px-2 py-5 h-full`}>
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
                Sku:
              </Text>
              <Text style={[tw`text-black text-base w-2/3`, styles.paragraphs]}>
                {product.sku}
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
                {product.tags.join(', ')}
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
                dimensions:
              </Text>
              <Text
                style={[
                  tw`text-black text-base w-2/3 capitalize`,
                  styles.paragraphs
                ]}
              >
                {product.dimensions}
              </Text>
            </View>
          </>
        ) : (
          <Text style={[tw`text-black text-base`, styles.paragraphs]}>
            Loading product...
          </Text>
        )}
      </View>
    )
  }
  const renderItem = ({ item }) => {
    return (
      <View style={tw`flex border-b border-solid border-gray-200 py-3 w-full`}>
        <View>
          <Text
            style={[
              tw`text-black capitalize text-sm font-bold`,
              styles.paragraphs
            ]}
          >
            {item.name}
          </Text>
          <Text style={[tw`text-lightGrey text-xs`, styles.paragraphs]}>
            2 hours ago
          </Text>
        </View>
        <View style={tw`py-3`}>
          <View style={tw`flex flex-row items-center`}>
            <Text
              style={[
                tw`text-black capitalize text-sm mr-1 font-bold`,
                styles.paragraphs
              ]}
            >
              {item.star}
            </Text>
            <EvilIcons name='star' style={tw`text-lg text-gray-400 mr-2`} />
          </View>
          <Text style={[tw`text-black text-sm`, styles.paragraphs]}>
            {item.review}
          </Text>
        </View>
        <TouchableOpacity>
          <Text
            style={[tw`text-lightGrey text-xs capitalize`, styles.paragraphs]}
          >
            reply
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  const SecondRoute = () => {
    return (
      <View style={tw`px-2 py-5`}>
        <FlatList
          data={product?.review}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      </View>
    )
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

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute
  })

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'description' },
    { key: 'second', title: 'review' },
    { key: 'third', title: 'additional information' }
  ])

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor='black'
      inactiveColor='#a5a5a5'
      labelStyle={[tw`text-sm w-full capitalize`, styles.heading]}
      tabStyle={tw`flex flex-row items-center`}
      indicatorStyle={{ backgroundColor: 'black' }}
      style={tw`bg-transparent w-full px-0`}
    />
  )

  useEffect(() => {
    let { item } = route.params
    setProduct(item)
  }, [])

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View style={[tw`flex h-full`]}>
        <View style={[tw`flex flex-row items-center justify-between p-4`]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name='keyboard-backspace'
              style={tw`text-2xl text-black font-bold`}
            />
          </TouchableOpacity>

          {/* <Text
            style={[
              tw`font-bold text-2xl text-black capitalize`,
              styles.product
            ]}
          >
            {product?.name}
          </Text> */}
          <View style={tw`flex flex-row items-center`}>
            <TouchableOpacity>
              <Feather
                name='shopping-bag'
                style={tw`text-xl text-black font-bold`}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign
                name='hearto'
                style={tw`text-xl text-black font-bold ml-2`}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[tw`flex flex-row justify-between w-full py-2 px-4`]}>
          <View style={[tw`flex`]}>
            <Text
              style={[
                tw`text-2xl text-black font-bold capitalize`,
                styles.heading
              ]}
            >
              {product?.name}
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
            {'\u20A6'}
            {product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </View>
        <View
          style={tw`w-full h-40 flex items-center justify-center px-6 border-t border-solid border-gray-200 py-3 bg-light-200`}
        >
          <Image
            source={product?.image}
            resizeMode='contain'
            style={[
              tw`max-w-full`,
              { flex: 1, width: '100%', height: undefined }
            ]}
          />
        </View>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
        <View style={tw`mb-4 px-2`}>
          <Button title='add to cart' />
        </View>
      </View>
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
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0
  }
})
