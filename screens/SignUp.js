import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '../lib/tailwind'
import Button from '../shared/Button'
import Input from '../shared/Input'
import { useForm, Controller } from 'react-hook-form'
import {
  db,
  createUserWithEmailAndPassword,
  collection,
  addDoc,
  updateProfile
} from '../firebase'
import { getAuth } from 'firebase/auth'
import { useAuthContext } from '../context/AuthProvider'

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function Signup({ navigation }) {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  const auth = getAuth()
  // console.log(auth);

  const onSubmit = async (data) => {
    const { email, password, username, name } = data
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)

      await updateProfile(auth.currentUser, {
        displayName: name
      })

       addDoc(collection(db, 'users'), {
         owner_uid: user.user.uid,
         profileImage: user.user.photoURL,
         username: username,
         name: user.user.displayName,
         email: email,
         phone: '',
         favorite: [],
         cart: [],
         wishlist: [],
         created_at: new Date(),
         address: '',
         orders: [],
         cards: [],
         offers: [],
         language: []
       }).then(() => navigation.navigate('Home'))

    } catch (error) {
      Alert.alert(
        'There was an error creating your account',
        error.message + '\n\n What would you like to do next?',
        [
          { text: 'Ok', style: 'cancel' },
          { text: 'Sign in', onPress: () => navigation.push('Login') }
        ]
      )
    }
  }

  return (
    <SafeAreaView style={[tw`bg-gray-100`, { flex: 1 }]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw``}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={[{ flex: 1, height: '100%' }, tw`px-3`]}>
            <View style={tw`flex flex-row items-center h-12`}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[
                  tw`w-6 h-6 bg-red-500 rounded-full items-center justify-center ml-2`
                ]}
              >
                <Text style={[tw`text-sm text-gray-200`, styles.paragraphs]}>
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[tw`w-full justify-center h-4/5 mt-4`]}>
              <View style={tw`px-4`}>
                <Text
                  style={[
                    tw`text-2xl text-black font-bold mb-3`,
                    styles.paragraphs
                  ]}
                >
                  Create your account
                </Text>
                <View style={tw`mb-2`}>
                  <Controller
                    name='name'
                    control={control}
                    rules={{
                      required: { value: true, message: 'Name is required' },
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      }
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        error={errors.name}
                        errorText={errors?.name?.message}
                        onChangeText={(text) => onChange(text)}
                        value={value}
                        placeholder='Name'
                      />
                    )}
                  />
                </View>
                <View style={tw`mb-2`}>
                  <Controller
                    name='username'
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'Username is required'
                      },
                      minLength: {
                        value: 7,
                        message: 'Username must be at least 7 characters'
                      }
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        error={errors.username}
                        errorText={errors?.username?.message}
                        onChangeText={(text) => onChange(text)}
                        value={value}
                        placeholder='Username'
                      />
                    )}
                  />
                </View>
                <View style={tw`mb-2`}>
                  <Controller
                    keyboardType='email-address'
                    name='email'
                    control={control}
                    rules={{
                      required: { value: true, message: 'Email is required' },
                      pattern: {
                        value: EMAIL_REGEX,
                        message: 'Not a valid email address'
                      }
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        error={errors.email}
                        errorText={errors?.email?.message}
                        onChangeText={(text) => onChange(text)}
                        value={value}
                        placeholder='Email'
                      />
                    )}
                  />
                </View>

                <View style={tw`mb-2`}>
                  <Controller
                    name='password'
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'Password is required'
                      },
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      }
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        secureTextEntry={true}
                        error={errors.password}
                        errorText={errors?.password?.message}
                        onChangeText={(text) => onChange(text)}
                        value={value}
                        placeholder='Password'
                      />
                    )}
                  />
                </View>

                {/* <Controller
              as={<DatePicker minDate={new Date()} />}
              name='DOB'
              control={control}
            /> */}
                <View style={tw`my-8`}>
                  <Button
                    title='create account'
                    transform='uppercase'
                    onPress={handleSubmit(onSubmit)}
                  />
                </View>
              </View>
              <View style={tw`flex flex-row justify-center items-center`}>
                <Text
                  style={[
                    tw`text-center text-black font-semibold text-base`,
                    styles.paragraphs
                  ]}
                >
                  Have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text
                    style={[tw`font-bold text-base ml-2`, styles.paragraphs]}
                  >
                    Sign in
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headers: {
    fontFamily: 'playfair'
  },
  paragraphs: {
    fontFamily: 'poppins'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25
  }
})
