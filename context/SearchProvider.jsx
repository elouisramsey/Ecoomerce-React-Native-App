import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
const STORAGE_KEY = 'FURNITURE_HOUSE_APP_RECENT_SEARCHES'

const RecentSearchContext = createContext()

const initialState = {
  searches: []
}

export function SearchProvider({ children }) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const setObjectValue = async () => {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
      const storageState = JSON.parse(jsonValue)
      if (!storageState) {
        const jsonValue = JSON.stringify(initialState)
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
      }
      if (jsonValue) {
        setState(storageState)
      }
    }
    setObjectValue()
  }, [])

  const addToRecentSearch = async (search) => {
    const storageState = await AsyncStorage.getItem(STORAGE_KEY)
    const { searches } = await JSON.parse(storageState)

    if (searches.length) {
      const index = searches.findIndex((searchItem) => searchItem === search)
      if (index >= Number(0)) {
        return
      } else {
        searches.push(search)
      }
    } else {
      searches.push(search)
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ searches }))
    setState({ searches })
  }

  return (
    <RecentSearchContext.Provider value={{ ...state, addToRecentSearch }}>
      {children}
    </RecentSearchContext.Provider>
  )
}

export function useRecentSearchContext() {
  return useContext(RecentSearchContext)
}
