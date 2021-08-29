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

function useForceUpdate() {
  const [value, setValue] = useState(0) // integer state
  return () => setValue((value) => value + 1) // update the state to force render
}

export function CartProvider({ children }) {
  const forceUpdate = useForceUpdate()
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const setObjectValue = async () => {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
      const storageState = JSON.parse(jsonValue)
         
      if (!storageState) {
        const jsonValue = JSON.stringify(state)
     const data =   await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
     setState(data)
      }
    }
    setObjectValue()
  }, [])



  const setProductQty = async (product) => {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
    const storageState = JSON.parse(jsonValue)
    const { cart } = storageState
    const index = cart.findIndex((cartItem) => cartItem.id === product.id)
    cart[index].quantity = product.quantity

    const setObjectValue = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
      } catch (e) {
        // save error
        console.log('error setting quantity')
      }
      console.log('Done setting quantity')
    }

    setObjectValue({
      cart,
      numberOfItemsInCart: cart.length,
      total: calculateTotal(cart)
    })
  }

  const addToCart = async (product) => {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
    const storageState = JSON.parse(jsonValue)

    const { cart } = storageState

    if (cart.length) {
      const index = cart.findIndex((cartItem) => cartItem.id === product.id)
      if (index >= Number(0)) {
        /* If this item is already in the cart, update the quantity */
        cart[index].quantity = cart[index].quantity + product.quantity
      } else {
        /* If this item is not yet in the cart, add it */
        cart.push(product)
      }
    } else {
      /* If no items in the cart, add the first item. */
      cart.push(product)
    }

    const setObjectValue = async (value) => {
      try {
        const jsonValue = await JSON.stringify(value)
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
      } catch (e) {
        // save error
        console.log('error adding to cart')
      }
      console.log('item added to cart')
    }

    setObjectValue({
      cart,
      numberOfItemsInCart: cart.length,
      total: calculateTotal(cart)
    })
    
    forceUpdate()
  }

  const removeFromCart = async (product) => {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
    const storageState = JSON.parse(jsonValue)

    let { cart } = storageState
    cart = cart.filter((c) => c.id !== product.id)

    const setObjectValue = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
      } catch (e) {
        // save error
        console.log('error removing from cart')
      }
      console.log('item removed from cart')
    }

    setObjectValue({
      cart,
      numberOfItemsInCart: cart.length,
      total: calculateTotal(cart)
    })
  }

  const emptyCart = () => {
    const setObjectValue = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
      } catch (e) {
        // save error
        console.log('error adding to cart')
      }
      setObjectValue(initialState)
    }
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        setProductQty,
        addToCart,
        removeFromCart,
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
