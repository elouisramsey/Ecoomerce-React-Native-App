import React, { createContext, useContext, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'FURNITURE_HOUSE_APP'

// create context
const CartContext = createContext()

const initialState = {
  cart: [],
  numberOfItemsInCart: 0,
  total: 0
}

function calculateTotal(cart) {
  const total = cart.reduce((acc, next) => {
    const quantity = next.quantity
    acc = acc + JSON.parse(next.price) * quantity
    return acc
  }, 0)
  return total
}

export function CartProvider({ children }) {
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
    // const clearAllData = () => {
    //   AsyncStorage.getAllKeys()
    //     .then((keys) => AsyncStorage.multiRemove(keys))
    //     .then(() => alert('success'))
    // }
    // clearAllData()
  }, [])

  const addToCart = async (product) => {
    const storageState = await AsyncStorage.getItem(STORAGE_KEY)
    const { cart } = JSON.parse(storageState)
    if (cart.length) {
      const index = cart.findIndex((cartItem) => cartItem.id === product.id)
      if (index >= Number(0)) {
        /* If this item is already in the cart, update the quantity */
        (cart[index].quantity =
          cart[index].quantity + product.quantity)
      } else {
        /* If this item is not yet in the cart, add it */
        cart.push(product)
      }
    } else {
      /* If no items in the cart, add the first item. */
      cart.push(product)
    }

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cart,
        numberOfItemsInCart: cart.length,
        total: calculateTotal(cart)
      })
    )
    setState({
      cart,
      numberOfItemsInCart: cart.length,
      total: calculateTotal(cart)
    })
  }

  const removeFromCart = async (product) => {
    const storageState = await AsyncStorage.getItem(STORAGE_KEY)
    let { cart } = JSON.parse(storageState)
    cart = cart.filter((c) => c.id !== product.id)

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cart,
        numberOfItemsInCart: cart.length,
        total: calculateTotal(cart)
      })
    )
    setState({
      cart,
      numberOfItemsInCart: cart.length,
      total: calculateTotal(cart)
    })
  }

  const emptyCart = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        removeFromCart,
        addToCart,
        emptyCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  return useContext(CartContext)
}
