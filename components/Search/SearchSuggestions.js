import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import tw from '../../lib/tailwind'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Input from '../../shared/Input'
import Skeleton from '../Loader/Skeleton'
import Button from '../../shared/Button'

export default function SearchSuggestions({ navigation, route }) {
  const [searchTerm, setsearchTerm] = useState(route.params.query)

  const {
    data,
    error,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch
  } = useInfiniteQuery(
    ['FindProductByName', searchTerm],
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `https://ecommerc-api.herokuapp.com/products/getproductbyname/search?name=${searchTerm}&limit=10&page=${pageParam}`
      )
      return data
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.pages)
          return lastPage.currentPage + 1
        return false
      },
      enabled: false
    }
  )

  useEffect(() => {
    refetch()
  }, [])

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase()
    setsearchTerm(formattedQuery)
    refetch()
  }

  return (
    <SafeAreaView style={[styles.container, tw``]}>
      <View style={tw`flex-row justify-between px-3 py-4 w-full`}>
        <TouchableOpacity
          style={tw`justify-center h-11`}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name='keyboard-backspace'
            style={tw`text-2xl text-gray-500 font-bold`}
          />
        </TouchableOpacity>
        <View style={[tw`flex-row w-11/12`]}>
          <Input
            autoFocus={true}
            value={searchTerm}
            onChangeText={(queryText) => handleSearch(queryText)}
            placeholder={
              route.params.query ? route.params.query : 'Search for product'
            }
            style={tw`w-full`}
            onSubmitEditing={() => refetch()}
          />
        </View>
      </View>
      {isError || error ? (
        <>
          <Text
            style={[tw`text-lightGrey text-base text-center mb-3`, styles.name]}
          >
            There was an error
          </Text>
          <View style={tw`w-4/5 items-center justify-center mx-auto`}>
            <Button
              title='Continue shopping'
              onPress={() => navigation.navigate('Home')}
            />
          </View>
        </>
      ) : isFetching || isLoading ? (
        <Skeleton />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`w-full flex-row flex-wrap px-3 justify-between`}
          // style={tw`w-full flex-row flex-wrap justify-between`}
        >
          {data && data.pages[0].products.length ? (
            data.pages[0].products.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    tw`rounded-lg mb-2 bg-white`,
                    { height: 350, width: '48%' }
                  ]}
                  onPress={() => {
                    navigation.navigate('Product', { item })
                  }}
                >
                  <View style={[tw`w-full`, { height: '70%' }]}>
                    <Image
                      source={{ uri: item?.image[0] }}
                      resizeMode='contain'
                      style={[
                        tw`max-w-full`,
                        { flex: 1, width: '100%', height: undefined }
                      ]}
                    />
                  </View>
                  <View style={tw`p-3`}>
                    <Text
                      style={[
                        tw`text-gray-800 text-sm capitalize`,
                        styles.name
                      ]}
                    >
                      {item.name <= 20
                        ? item.name
                        : item.name.slice(0, 20) + '...'}
                    </Text>
                    <Text
                      style={[
                        tw`text-2xl text-gray-900 font-bold capitalize my-1`,
                        styles.headers
                      ]}
                    >
                      {'\u20A6'}{' '}
                      {(item?.price * 415.16)
                        .toFixed(2)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Text>
                    <Text style={[tw`text-gray-400 text-sm`, styles.name]}>
                      {item.sales ? `${item.sales} sold` : ''}{' '}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })
          ) : (
            <Skeleton />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f2f6',
    flex: 1,
    width: '100%'
  },
  headers: {
    fontFamily: 'playfair'
  },
  name: {
    fontFamily: 'poppins'
  }
})
