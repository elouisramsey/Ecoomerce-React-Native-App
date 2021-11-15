import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from '../lib/tailwind'
import Button from '../shared/Button'
import { LogBox } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, Feather } from '@expo/vector-icons'
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
  // const [currentDocumentID, setcurrentDocumentID] = useState('')
  const { numberOfItemsInCart } = useCartContext()
  const { setcurrentDocumentID, currentDocumentID } = useAuthContext()

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

  // useEffect(() => {
  //   const gettings = async () => {
  //     const checker = doc(db, 'users', currentDocumentID)
  //     const checkerSnapshot = await getDoc(checker)

  //     const addField = {
  //       favorite: checkerSnapshot
  //         .data()
  //         .favorite.includes('614b6311cb72aty9d1d2dder')
  //         ? arrayRemove('614b6311cb72aty9d1d2dder')
  //         : arrayUnion('614b6311cb72aty9d1d2dder')
  //     }
  //     await updateDoc(checker, addField)
  //   }
  //   gettings()
  // }, [currentDocumentID])

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
  }, [])
  function renderHeader() {
    const handleError = (e) => {
      console.log(e.nativeEvent.error)
    }
    return (
      <View style={{ height: 500, width: '100%' }}>
        <View
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          <ImageBackground
            onError={handleError}
            imageStyle={{ opacity: 0.85 }}
            source={require('../assets/images/beautiful-couch.jpg')}
            style={[tw`px-4 py-6`, styles.image]}
          >
            <View
              style={tw`flex justify-between items-center flex-row mb-5 mt-4`}
            >
              <TouchableOpacity>
                <Ionicons
                  name='menu-outline'
                  style={tw`text-gray-200 text-3xl`}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`relative`}
                onPress={() => {
                  navigation.navigate('Cart')
                }}
              >
                <Feather
                  name='shopping-bag'
                  style={tw`text-gray-200 text-2xl`}
                />
                <View
                  style={tw`z-10 absolute -right-1 h-4 w-4 rounded-full flex items-center justify-center bg-white`}
                >
                  <Text
                    style={[tw`text-tiny text-red-500 `, styles.paragraphs]}
                  >
                    {numberOfItemsInCart}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={tw`h-full w-full`}>
              <View
                style={tw`border-r border-solid border-black px-2 flex justify-end flex-row`}
              >
                <Text
                  style={[
                    tw`font-light capitalize text-base text-right`,
                    styles.paragraphs
                  ]}
                >
                  couch{'\n'}
                  2021
                </Text>
              </View>
              <View style={tw`flex`}>
                <Text
                  style={[
                    tw`text-heroHead my-6 text-2xl font-bold`,
                    styles.heading
                  ]}
                >
                  Get furniture that gives comfort
                </Text>
                <Text style={[tw`text-base text-white`, styles.paragraphs]}>
                  We offer high quality furniture for the best prices with
                  access to doorstep delivery services
                </Text>
              </View>
              <View style={tw`my-6 w-1/2`}>
                <Button title='Shop now' />
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    )
  }
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

const styles = StyleSheet.create({
  paragraphs: {
    fontFamily: 'poppins'
  },
  heading: {
    fontFamily: 'playfair'
  },
  header: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'red'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    height: null,
    width: null
  }
})
