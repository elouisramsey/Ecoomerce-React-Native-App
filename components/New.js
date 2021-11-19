import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import tw from '../lib/tailwind'
import Showbtn from '../shared/ShowBtn'

import { useQuery } from 'react-query'
import axios from 'axios'
import { convertCurrency } from '../actions/CurrencyConverter'

export default NewProducts = ({navigation}) => {
const { data, loading, error, isFetching } = useQuery(
  'NewProducts',
  async () => {
    const {data} = await axios.get(
      `https://ecommerc-api.herokuapp.com/categories/getitemsbycategory?category=HomePetAppliance&page=1&limit=10`
    )
    return data
  }
)

  return (
    <View style={[tw`py-5 px-4 flex`]}>
      <View style={[tw`mb-5 flex flex-row justify-between items-center`]}>
        <Text style={[tw`text-black text-xl font-bold`, styles.headers]}>
          New Arrivals
        </Text>
        <Showbtn />
      </View>
      <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {data?.products.map(item => {
          return (
            <TouchableOpacity
              key={item._id}
              style={tw`h-52 mr-5 bg-white overflow-hidden`}
              onPress={() => {
                navigation.navigate('Product', { item })
              }}
            >
              <View
                style={tw`w-32 h-32 flex items-center rounded justify-center px-4`}
              >
                <Image
                  source={{ uri: item?.image[0] }}
                  resizeMode='contain'
                  style={[
                    tw`max-w-full`,
                    { flex: 1, width: '100%', height: undefined }
                  ]}
                />
              </View>
              <View style={tw`px-2 py-1`}>
                <Text style={[tw`text-black font-bold text-base`, styles.name]}>
                  {item.name < 20 ? item.name : item.name.slice(0, 10)}...
                </Text>

                <Text
                  style={[tw`text-sm font-light text-gray-500`, styles.price]}
                >
                  {convertCurrency(item.price * 22)}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
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
    fontFamily: 'playfair',
    textTransform: 'capitalize'
  }
})
