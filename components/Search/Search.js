import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import tw from '../../lib/tailwind'
import Input from '../../shared/Input'
import { useRecentSearchContext } from '../../context/SearchProvider'

export default function Search({ navigation }) {
  const [query, setQuery] = useState('')

  const { addToRecentSearch, searches } = useRecentSearchContext()

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase()
    setQuery(formattedQuery)
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={tw`flex-row justify-between px-3 w-full py-4`}>
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
            value={query}
            onChangeText={(queryText) => handleSearch(queryText)}
            placeholder='Search for product'
            style={tw`w-full`}
            onSubmitEditing={() => {
              navigation.navigate('SearchSuggestions', { query })
              addToRecentSearch(query)
            }}
          />
        </View>
      </View>
      <View style={tw`mx-3 my-2`}>
        <Text style={[tw`font-bold text-base text-black`, styles.headers]}>
          Search history
        </Text>
        <View style={tw`flex-wrap flex-row`}>
          {searches?.map((search) => (
            <Text
              onPress={(event) => {
                setQuery(event._dispatchInstances.memoizedProps.children)
              }}
              style={[
                tw`text-tiny text-gray-500 border border-solid border-gray-300 rounded-full py-2 px-2 items-center justify-center self-start m-1`,
                styles.name
              ]}
            >
              {search}
            </Text>
          ))}
        </View>
      </View>
      <View style={tw`px-3 my-2`}>
        <Text style={[tw`font-bold text-base text-black`, styles.headers]}>
          Discover more
        </Text>
        <View style={tw`flex-wrap justify-between flex-row`}>
          <Text
            style={[
              tw`text-tiny text-gray-500 border border-solid border-gray-300 rounded-full py-2 px-2 items-center justify-center self-start m-1`,
              styles.name
            ]}
          >
            Rubber slippers
          </Text>
        </View>
      </View>
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
