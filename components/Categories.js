import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList
} from 'react-native'
import tw from '../lib/tailwind'
import Showbtn from '../shared/ShowBtn'
import { useCartContext } from '../context/CartProvider'

import { useQuery } from 'react-query'
import axios from 'axios'
import { convertCurrency } from '../actions/CurrencyConverter'

export const Categories = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = React.useState('MensFashion')
  const [numberOfitems, updateNumberOfItems] = React.useState(1)
  const { addToCart } = useCartContext()

  const {
    data: AllCategories,
    loading,
    error,
    isFetching
  } = useQuery('Categories', async () => {
    const { data } = await axios.get(
      `https://ecommerc-api.herokuapp.com/categories/`
    )
    return data
  })

  const { data: CategoryProducts, isFetching: getProducts } = useQuery(
    ['Products', selectedCategory],
    async () => {
      const { data } = await axios.get(
        `https://ecommerc-api.herokuapp.com/categories/getitemsbycategory?category=${selectedCategory}&page=1&limit=10`
      )
      return data
    }
  )

  useEffect(() => {
    setSelectedCategory('MensFashion')
  }, [])

  function onSelectCategory(category) {
    setSelectedCategory(category)
  }

  function addProductToCart(product) {
    product['quantity'] = numberOfitems
    addToCart(product)
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item._id}
        style={[
          tw`rounded-sm shadow-xl my-4 h-64 flex-row bg-white mx-2 overflow-hidden`,
          { width: '45%' }
        ]}
        onPress={() => {
          navigation.navigate('Product', { item })
        }}
      >
        <View style={tw`w-full h-full`}>
          <View style={tw`w-full h-3/5 items-center justify-center`}>
            <Image
              source={{ uri: item.image[0] }}
              resizeMode='cover'
              style={[
                tw`max-w-full`,
                { flex: 1, width: '100%', height: undefined }
              ]}
            />
          </View>
          <View style={tw`px-3 py-2 h-2/5`}>
            <Text
              style={[
                tw`text-black font-bold text-base capitalize`,
                styles.name
              ]}
            >
              {item.name < 20 ? item.name : item.name.slice(0, 10)}...
            </Text>

            <Text style={[tw`text-gray-400 text-xs py-3`]} numberOfLines={1}>
              {item.description}
            </Text>

            <View style={tw`flex flex-row w-full items-center`}>
              <Text style={[tw`text-lg font-bold text-base`, styles.price]}>
                {convertCurrency(item.price * 22)}
              </Text>

              <TouchableOpacity
                style={tw`bg-black items-center justify-center h-6 w-6 rounded-full absolute right-0`}
                onPress={() => {
                  addProductToCart(item)
                }}
              >
                <Ionicons name='add-outline' style={tw`text-white text-base`} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[tw`flex bg-white py-2`]}>
      <View style={[tw`px-2 mb-5 flex flex-row justify-between items-center`]}>
        <Text style={[tw`text-black text-xl font-bold`, styles.headers]}>
          Categories
        </Text>
        <Showbtn />
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={tw`px-2`}
      >
        {AllCategories?.categories.slice(1, 7).map((category) => {
          return (
            <TouchableOpacity
              key={category._id}
              style={tw`pb-5 flex items-center justify-center mr-5`}
              onPress={() => onSelectCategory(category.category_id)}
            >
              <Text
                style={[
                  tw`text-base pb-3 ${
                    selectedCategory?.id === category._id
                      ? 'text-black border-b border-solid border-gray-600'
                      : 'text-gray-400'
                  }`,
                  styles.name
                ]}
              >
                {category.category_name}
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      {getProducts ? (
        <View styles={tw`items-center justify-center my-4`}>
          <ActivityIndicator size='small' color='#000' />
        </View>
      ) : (
        <FlatList
          data={CategoryProducts?.products.map((item) => item)}
          keyExtractor={(item) => `${item._id}`}
          renderItem={renderItem}
          numColumns={2}
          initialNumToRender={2}
          showsVerticalScrollIndicator={false}
          bounces={false}
          ListEmptyComponent={
            <View styles={tw`items-center justify-center my-8`}>
              <ActivityIndicator size='small' color='#000' />
            </View>
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  headers: {
    fontFamily: 'playfair'
  },
  price: {
    fontFamily: 'poppins'
  },
  name: {
    fontFamily: 'poppins',
    textTransform: 'capitalize'
  }
})
