import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  LogBox,
  ActivityIndicator,
  Dimensions
} from 'react-native'
import tw from '../lib/tailwind'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { convertCurrency } from '../actions/CurrencyConverter'

LogBox.ignoreLogs(['Setting a timer'])

export default function InfiniteProducts({ navigation }) {
  const [scrollBegin, setscrollBegin] = useState(true)
  const [
    onEndReachedCalledDuringMomentum,
    setonEndReachedCalledDuringMomentum
  ] = useState(true)
  const flatListRef = useRef(null)

  const {
    data,
    error,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching
  } = useInfiniteQuery(
    'ListOfProducts',
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `https://ecommerc-api.herokuapp.com/products?page=${pageParam}&limit=10`
      )
      return data
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.pages)
          return lastPage.currentPage + 1
        return false
      }
    }
  )

  const _onMomentumScrollBegin = () => {
    setonEndReachedCalledDuringMomentum(false)
  }

  const onEndReachedHandler = () => {
    if (!onEndReachedCalledDuringMomentum) {
      setonEndReachedCalledDuringMomentum(true)
    }
    fetchNextPage()
    console.log('i don reach ooo')
  }

  if (isLoading || isFetching) {
    return (
      <View styles={tw`items-center justify-center my-8`}>
        <ActivityIndicator size='small' color='#000' />
      </View>
    )
  }

  if (isError) {
    return (
      <Text
        style={[
          tw`text-black text-xl font-bold text-center capitalize`,
          { fontFamily: 'poppins' }
        ]}
      >
        error loading products {error.message}
      </Text>
    )
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          tw`rounded-lg mb-2 bg-white mx-2`,
          { height: 350, flex: 1 / 2 }
        ]}
        onPress={() => {
          navigation.navigate('Product', { item })
        }}
      >
        <View style={[tw`w-full`, { height: '70%' }]}>
          <Image
            source={{ uri: item?.image[0] }}
            resizeMode='cover'
            style={[
              tw`max-w-full`,
              { flex: 1, width: '100%', height: undefined }
            ]}
          />
        </View>
        <View style={tw`p-3`}>
          <Text style={[tw`text-gray-800 text-sm`, styles.name]}>
            {item.name < 20 ? item.name : item.name.slice(0, 20)}...
          </Text>
          <Text
            style={[
              tw`text-2xl text-gray-900 font-bold capitalize my-1`,
              styles.headers
            ]}
          >
            {convertCurrency(item.price * 22)}
          </Text>
          <Text style={[tw`text-gray-400 text-sm`, styles.name]}>
            {item.sales ? `${item.sales} sold` : ''}{' '}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <View style={[tw`my-5 flex flex-row px-2`]}>
        <Text style={[tw`text-black text-xl font-bold`, styles.headers]}>
          More to love
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          // onEndReached={() => onEndReachedHandler()}
          initialNumToRender={10}
          onMomentumScrollBegin={() => _onMomentumScrollBegin()}
          bounces={false}
          onEndReachedThreshold={0.4}
          data={data?.pages.flatMap((p) => p.products)}
          keyExtractor={(item) => `${item._id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={tw``}
          contentContainerStyle={tw`flex`}
          numColumns={2}
          ListEmptyComponent={
            <Text style={[tw`text-center py-2`, styles.price]}>
              Nothing to display at the moment
            </Text>
          }
        />
        {/* <Button onPress={() => fetchNextPage()} title={'fetch more'} /> */}
      </View>
    </>
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
