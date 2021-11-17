import React from 'react'
import Showbtn from '../shared/ShowBtn'
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
import ExpoFastImage from 'expo-fast-image'

import { useQuery } from 'react-query'
import axios from 'axios'

const Bestseller = ({ navigation }) => {
  const { data, loading, error, isFetching } = useQuery(
    'BestSellers',
    async () => {
      const { data } = await axios.get(
        `https://ecommerc-api.herokuapp.com/products/topsales?sales=300`
      )
      return data
    }
  )

  if (loading || isFetching) {
    return (
      <View styles={tw`items-center justify-center my-8`}>
        <ActivityIndicator size='small' color='#000' />
      </View>
    )
  }

  if (error) {
    return (
      <Text
        style={[
          tw`text-black text-xl font-bold text-center capitalize`,
          { fontFamily: 'poppins' }
        ]}
      >
        error loading products
      </Text>
    )
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item._id}
        style={tw`h-32 flex flex-row bg-white mb-5 w-full overflow-hidden`}
        onPress={() => {
          navigation.navigate('Product', { item })
        }}
      >
        <View
          style={tw`w-32 h-32 items-center rounded justify-center bg-light`}
        >
          <Image
            source={{ uri: item.image[0] }}
            resizeMode='cover'
            style={[tw`w-full `, { flex: 1, width: '100%', height: undefined }]}
          />
        </View>
        <View style={tw`ml-4 w-full flex justify-center`}>
          <Text style={[tw`text-black font-bold text-xl`, styles.name]}>
            {item.name < 20 ? item.name : item.name.slice(0, 10)}...
          </Text>

          <Text
            style={[tw`text-base font-light text-gray-500 mt-3`, styles.price]}
          >
            {'\u20A6'}
            {(item.price * 22).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[tw`mb-8 px-4`]}>
      <View style={[tw`mb-5 flex flex-row justify-between items-center`]}>
        <Text style={[tw`text-black text-xl font-bold`, styles.headers]}>
          Best Sellers
        </Text>
        <Showbtn />
      </View>
      <FlatList
        data={data?.products.slice(1, 6).map((item) => item)}
        keyExtractor={(item) => `${item._id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        bounces={false}
        ListEmptyComponent={
          <View styles={tw`items-center justify-center my-8`}>
            <ActivityIndicator size='small' color='#000' />
          </View>
        }
      />
    </View>
  )
}

export default Bestseller

const styles = StyleSheet.create({
  headers: {
    fontFamily: 'playfair'
  },
  price: {
    fontFamily: 'poppins'
  },
  name: {
    fontFamily: 'playfair',
    textTransform: 'capitalize'
  }
})
