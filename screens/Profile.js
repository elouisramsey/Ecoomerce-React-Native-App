import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '../lib/tailwind'
import { EvilIcons } from '@expo/vector-icons'
import Button from '../shared/Button'
import { profileBottom, profileTop } from '../components/Data/ProfileData'
import { AntDesign } from '@expo/vector-icons'

import { getAuth, signOut } from 'firebase/auth'
import {
  query,
  collection,
  getDocs,
  onSnapshot,
  where
} from 'firebase/firestore'
import { db } from '../firebase'
import Login from './Login'
import Skeleton from '../components/Loader/Skeleton'
import { useAuthContext } from '../context/AuthProvider'

export default function Profile({ navigation }) {
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [profileImage, setProfileImage] = useState()
  const [userID, setUserID] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [address, setAddress] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  const { logout, user } = useAuthContext

  const auth = getAuth()
  const currentUser = auth.currentUser

  useEffect(() => {
    if (currentUser !== null) {
      let uid = currentUser.uid
      const getters = async () => {
        const fav = collection(db, 'users')
        const q = query(fav, where('owner_uid', '==', uid))
        onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {
              username,
              email,
              owner_uid,
              profileImage,
              name,
              created_at,
              address,
              birthYear
            } = doc.data()
            setDate(
              new Date(
                created_at.seconds * 1000 + created_at.nanoseconds / 1000000
              )
                .toDateString()
                .substring(11, 15)
            )

            setName(name)
            setProfileImage(profileImage)
            setUserID(owner_uid)
            setEmail(email)
            setUserName(username)
            setBirthYear(birthYear)
            setGender(gender)
            setAddress(address)
            setPhone(phone)
          })
        })
      }
      getters()
    }
    navigation.navigate('Login')
  }, [])

  const signout = async () => {
    logout().then(() => navigation.navigate('Home'))
  }
  return (
    <SafeAreaView style={[tw`bg-gray-100`, { flex: 1 }]}>
      {currentUser !== null && (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw``}
        >
          <View style={tw`flex flex-row items-center h-12`}>
            <EvilIcons
              name='chevron-left'
              style={[tw`text-black font-bold`, { fontSize: 40 }]}
            />
            <Text style={[tw`text-2xl text-black font-bold`, styles.heading]}>
              Profile
            </Text>
          </View>
          <View style={tw`border-t border-b border-gray-300 pt-6`}>
            <View style={tw`flex flex-row px-2`}>
              <View style={tw`w-1/3`}>
                <View
                  style={tw`flex justify-center h-28 w-28 rounded-full items-center overflow-hidden bg-gray-300`}
                >
                  {profileImage ? (
                    <ImageBackground
                      source={{ uri: profileImage }}
                      style={tw`h-full w-full items-center justify-center`}
                    />
                  ) : (
                    <EvilIcons
                      name='image'
                      style={[tw`text-black font-bold`, { fontSize: 40 }]}
                    />
                  )}
                </View>
              </View>

              <View style={tw`justify-center ml-4`}>
                <Text
                  style={[
                    tw`text-2xl text-black font-bold capitalize tracking-wide`,
                    styles.paragraphs
                  ]}
                >
                  {name}
                </Text>
                <Text style={[tw`text-gray-400 text-tiny`, styles.paragraphs]}>
                  @{userName}
                </Text>
                <Text style={[tw`text-gray-400 my-2`, styles.paragraphs]}>
                  Member since {date}
                </Text>
                <View style={tw``}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('EditProfile', {
                        name: name,
                        profileImage: profileImage,
                        email: email,
                        phone: phone,
                        birthYear: birthYear,
                        gender: gender,
                        address: address
                      })
                    }
                    style={tw`justify-center items-center py-2 px-7 border rounded-sm shadow-sm bg-black`}
                  >
                    <Text
                      style={[
                        tw`text-sm font-bold capitalize tracking-wide text-white`,
                        styles.paragraphs
                      ]}
                    >
                      Edit account
                    </Text>
                  </Pressable>
                  {/* <Button title='edit account' /> */}
                </View>
              </View>
            </View>
            <View style={tw`flex flex-row px-3 h-16 py-4 mt-6`}>
              {profileTop?.map((item) => (
                <TouchableOpacity
                  style={tw`w-1/3 flex-row items-center justify-center ${
                    item.id === 2
                      ? 'border-l border-r border-solid border-gray-400 '
                      : ''
                  }`}
                  key={item.id}
                >
                  <View style={tw`h-6 w-6`}>
                    <Image
                      source={item.image}
                      resizeMode='cover'
                      style={tw`h-full w-full`}
                    />
                  </View>
                  <Text
                    style={[
                      tw`text-black text-base ml-1 capitalize font-medium`,
                      styles.paragraphs
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={tw`px-3`}>
            {profileBottom?.map((item) => (
              <TouchableOpacity key={item.id}>
                <View
                  style={tw`flex-row px-3 border-b border-solid border-gray-300 py-4 justify-between items-center`}
                >
                  <Text
                    style={[
                      tw`text-black text-base font-medium capitalize`,
                      styles.paragraphs
                    ]}
                  >
                    {item.name}
                  </Text>
                  <AntDesign
                    name='right'
                    style={tw`text-lg text-gray-400 mr-2`}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <Pressable
            onPress={signout}
            style={tw`justify-center items-center py-2 px-7 border rounded-sm shadow-sm bg-red-500 mx-3 my-4 border-red-500`}
          >
            <Text
              style={[
                tw`text-sm font-bold capitalize tracking-wide text-white`,
                styles.paragraphs
              ]}
            >
              Logout
            </Text>
          </Pressable>
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  paragraphs: {
    fontFamily: 'poppins'
  },
  heading: {
    fontFamily: 'playfair'
  }
})
