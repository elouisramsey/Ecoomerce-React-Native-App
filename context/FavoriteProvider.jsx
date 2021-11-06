import React, { createContext, useContext, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'FURNITURE_HOUSE_APP_FAVORITES'

const FavoriteContext = createContext()

const initialState = {
  favorites: [],
  numberOfFavoriteItems: 0
}

export function FavoriteProvider({ children }) {
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

  const addToFavorites = async (product) => {
    const storageState = await AsyncStorage.getItem(STORAGE_KEY)
    let { favorites } = JSON.parse(storageState)

    try {
      if (favorites.length) {
        const index = favorites.findIndex(
          (favoritesItem) => favoritesItem.id === product.id
        )
        if (index >= Number(0)) {
          /* If this item is already in the favorites, remove it */
          favorites = favorites.filter((fav) => fav.id !== product.id)
          product.isFavorite = false
        } else {
          /* If this item is not yet in the favorites, add it */
          favorites.push(product)
          product.isFavorite = true
        }
      } else {
        /* If no items in the favorites, add the first item. */
        favorites.push(product)
        product.isFavorite = true
      }
    } catch (error) {
      console.log(error)
    }

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        favorites,
        numberOfFavoriteItems: favorites.length
      })
    )
    setState({
      favorites,
      numberOfFavoriteItems: favorites.length
    })
  }

  const checkifItemIsInFavorites = async (product) => {
    const storageState = await AsyncStorage.getItem(STORAGE_KEY)
    let { favorites } = JSON.parse(storageState)

    if (
      favorites.filter((favoritesItem) => favoritesItem.id === product.id)
        .length > Number(0)
    ) {
      return true
    }
    return false
  }

  return (
    <FavoriteContext.Provider
      value={{
        ...state,
        addToFavorites,
        checkifItemIsInFavorites
      }}
    >
      {children}
    </FavoriteContext.Provider>
  )
}

export function useFavoriteContext() {
  return useContext(FavoriteContext)
}
