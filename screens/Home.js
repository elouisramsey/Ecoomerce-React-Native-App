import {
  StyleSheet,
  ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from '../lib/tailwind'
import Button from '../shared/Button'
import { LogBox } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NewProducts from '../components/New'
import Bestseller from '../components/BestSeller'
import { Categories } from '../components/Categories'
import { useCartContext } from '../context/CartProvider'
import InfiniteProducts from '../components/InfiniteProducts'
import CustomSlider from '../components/carousel/CustomSlider'
import data from '../components/carousel/data'

import { query, collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db, auth, where } from '../firebase'
import { useAuthContext } from '../context/AuthProvider'

const Home = ({ navigation }) => {
  const { numberOfItemsInCart } = useCartContext()
  const { setcurrentDocumentID } = useAuthContext()

  useEffect(() => {
    if (auth.currentUser) {
      let uid = auth?.currentUser?.uid
      const getters = async () => {
        const fav = collection(db, 'users')
        const q = query(fav, where('owner_uid', '==', uid))
        // const querySnapshot = await getDocs(q)
        onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setcurrentDocumentID(doc.id)
          })
        })
      }
      getters()
    }
  }, [auth.currentUser])

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomSlider data={data} navigation={navigation} />
        <NewProducts navigation={navigation} />
        <Bestseller navigation={navigation} />
        <Categories navigation={navigation} />
        <InfiniteProducts navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

