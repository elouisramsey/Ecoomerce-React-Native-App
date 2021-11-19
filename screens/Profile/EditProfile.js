import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Platform,
  Image,
  PermissionsAndroid,
  Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '../../lib/tailwind'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { EvilIcons } from '@expo/vector-icons'
import { useForm, Controller } from 'react-hook-form'

import * as ImagePicker from 'expo-image-picker'
import { getAuth, updateProfile, updateEmail } from 'firebase/auth'
import { db } from '../../firebase'
import { updateDoc, doc } from 'firebase/firestore'
import { useAuthContext } from '../../context/AuthProvider'
import Input from '../../shared/Input'

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function EditProfile({ navigation, route }) {
  const { email, name, profileImage, address, birthYear, gender, phone } =
    route.params

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  const [filePath, setFilePath] = useState(null)

  const auth = getAuth()
  const { currentDocumentID } = useAuthContext()

  useEffect(() => {
    if (profileImage !== null) {
      setFilePath(profileImage)
    }

    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.cancelled) {
      setFilePath(result.uri)
    }
  }

  // Update firebase profile
  const updateFirebaseProfile = async (data) => {
    const checker = doc(db, 'users', currentDocumentID)

    const addField = {
      profileImage: filePath,
      name: data.fullName || name,
      address: data.address || address,
      birthYear: data.birthYear || birthYear,
      gender: data.gender || gender,
      phone: data.phone || phone,
      email: data.email || email
    }
    if (data.email) {
      await updateEmail(auth.currentUser, data.email)
    }
    await updateProfile(auth.currentUser, {
      displayName: data.fullName,
      photoURL: filePath
    })
    await updateDoc(checker, addField)
      .then(() => {
        navigation.navigate('Profile')
      })
      .catch((error) => {
        Alert.alert(error.message)
      })
  }

  const allowOnlyNumber = (value) => {
    return value.replace(/[^0-9]/g, '')
  }

  return (
    <SafeAreaView style={[tw`bg-gray-100`, { flex: 1 }]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw``}
      >
        <View
          style={tw`flex-row items-center justify-between h-12 w-full px-3`}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={[
                tw`text-xl text-black font-bold capitalize`,
                styles.heading
              ]}
            >
              cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit(updateFirebaseProfile)}>
            <Text
              style={[tw`text-xl text-gray-500 capitalize`, styles.heading]}
            >
              save
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={tw`border-t border-solid border-gray-300 p-3 items-center`}
        >
          <View style={tw`w-1/3 mt-4`}>
            <TouchableOpacity
              style={tw`justify-center h-28 w-28 rounded-full items-center overflow-hidden relative bg-gray-300`}
              activeOpacity={0.5}
              onPress={pickImage}
            >
              {filePath !== null ? (
                <View
                  style={tw`h-full w-full items-center justify-center bg-gray-300`}
                >
                  <Image source={{ uri: filePath }} style={tw`h-full w-full`} />
                  <View
                    style={tw`h-8 w-8 overflow-hidden rounded-full items-center justify-center bg-gray-300 absolute right-2 top-4 border border-solid border-gray-300 z-10`}
                  >
                    <EvilIcons
                      name='image'
                      style={[tw`text-black font-bold`, { fontSize: 20 }]}
                    />
                  </View>
                </View>
              ) : (
                <EvilIcons
                  name='image'
                  style={[tw`text-black font-bold`, { fontSize: 40 }]}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`p-3 items-center w-full`}>
          <View style={tw`mb-2 w-full`}>
            <Controller
              name='fullName'
              control={control}
              rules={{
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  error={errors.fullName}
                  errorText={errors?.fullName?.message}
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  placeholder={name || 'Full Name'}
                />
              )}
            />
          </View>
          <View style={tw`mb-2 w-full`}>
            <Controller
              name='email'
              control={control}
              rules={{
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Not a valid email address'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  keyboardType='email-address'
                  error={errors.email}
                  errorText={errors?.email?.message}
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  placeholder={email || 'Email address'}
                />
              )}
            />
          </View>
          <View style={tw`mb-2 w-full`}>
            <Controller
              name='phone'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  keyboardType={
                    Platform.OS === 'android' ? 'numeric' : 'number-pad'
                  }
                  error={errors.phone}
                  errorText={errors?.phone?.message}
                  onChangeText={(text) => onChange(allowOnlyNumber(text))}
                  value={value}
                  // placeholder={phone || 'Phone Number'}
                  placeholder={phone || 'Phone Number'}
                />
              )}
            />
          </View>
          <View style={tw`mb-2 w-full`}>
            <Controller
              name='gender'
              control={control}
              rules={{
                minLength: {
                  value: 2,
                  message: 'Gender must be at least 2 characters'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  error={errors.gender}
                  errorText={errors?.gender?.message}
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  placeholder={gender || 'Gender'}
                />
              )}
            />
          </View>
          <View style={tw`mb-2 w-full`}>
            <Controller
              name='birthYear'
              control={control}
              rules={{
                minLength: {
                  value: 4,
                  message: 'Birth year must be at least 4 characters'
                },
                maxLength: {
                  value: 4,
                  message: 'Birth year must be at most 4 characters'
                },
                // required: { value: true, message: 'DOB is required' }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  keyboardType={
                    Platform.OS === 'android' ? 'numeric' : 'number-pad'
                  }
                  error={errors.birthYear}
                  errorText={errors?.birthYear?.message}
                  onChangeText={(text) => onChange(allowOnlyNumber(text))}
                  value={ birthYear || value }
                  placeholder={birthYear || 'Birth year'}
                />
              )}
            />
          </View>
          <View style={tw`mb-2 w-full`}>
            <Controller
              name='address'
              control={control}
              rules={{
                minLength: {
                  value: 6,
                  message: 'Address must be at least 6 characters'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  error={errors.address}
                  errorText={errors?.address?.message}
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  placeholder={address || 'Delivery Address'}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
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
