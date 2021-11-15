import React, { createContext, useContext, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  get
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from './AuthProvider'

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
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0)
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  const { currentDocumentID } = useAuthContext()

  useEffect(() => {
    const getCartInfo = async () => {
      const checker = doc(db, 'users', currentDocumentID)
      const checkerSnapshot = await getDoc(checker)
      if (checkerSnapshot) {
        const itemsHolder = checkerSnapshot.data()
        setNumberOfItemsInCart(itemsHolder.numberOfItemsInCart)
        setCart(itemsHolder.cart)
        setTotal(itemsHolder.total)
      }
    }
    getCartInfo()
  }, [])

  // useEffect(() => {
  //   const setObjectValue = async () => {
  //     const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
  //     const storageState = JSON.parse(jsonValue)
  //     if (!storageState) {
  //       const jsonValue = JSON.stringify(initialState)
  //       await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
  //     }
  //     if (jsonValue) {
  //       setState(storageState)
  //     }
  //   }
  //   setObjectValue()
  // }, [])

  const addToCart = async (product) => {
    const checker = doc(db, 'users', currentDocumentID)
    const checkerSnapshot = await getDoc(checker)
    const itemsHolder = checkerSnapshot.data()

    if (itemsHolder.cart.length) {
      const index = itemsHolder.cart.findIndex(
        (cartItem) => cartItem._id === product._id
      )
      if (index >= Number(0)) {
        /* If this item is already in the cart, update the quantity */
        itemsHolder.cart[index].quantity =
          itemsHolder.cart[index].quantity + product.quantity
      } else {
        /* If this item is not yet in the cart, add it */
        await updateDoc(checker, {
          cart: arrayUnion({
            name: product.name,
            id: product._id,
            price: product.price,
            quantity: product.quantity,
            image: product.image[0]
          })
        })
      }
    } else {
      /* If no items in the cart, add the first item. */
      await updateDoc(checker, { cart: arrayUnion(product) })
    }
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
