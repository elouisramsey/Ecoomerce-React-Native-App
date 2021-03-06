import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  ScrollView,
  Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '../lib/tailwind'
import Button from '../shared/Button'
import Input from '../shared/Input'

import { useForm, Controller } from 'react-hook-form'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Login = ({ navigation }) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  const auth = getAuth()

  const onSubmit = async (data) => {
    const { email, password } = data
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigation.navigate('Home'))
      .catch((error) => {
        Alert.alert(error.message)
      })
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
                  Login to your account
                </Text>
                <View style={tw`mb-2`}>
                  <Controller
                    name='email'
                    defaultValue=''
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
                        style={tw``}
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
                    defaultValue=''
                    control={control}
                    rules={{
                      required: { value: true, message: 'Password is required' }
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        style={tw``}
                        error={errors.password}
                        errorText={errors?.password?.message}
                        onChangeText={(text) => onChange(text)}
                        value={value}
                        placeholder='Password'
                      />
                    )}
                  />
                  <View style={tw`mt-8`}>
                    <Button
                      title='Login'
                      transform='uppercase'
                      onPress={handleSubmit(onSubmit)}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Resetpassword')}
              >
                <Text
                  style={[
                    tw`text-center text-black font-semibold my-8 text-base`,
                    styles.paragraphs
                  ]}
                >
                  Forgot your password?
                </Text>
              </TouchableOpacity>
              <View style={tw`mb-8 px-4`}>
                <Pressable
                  style={[
                    tw`border border-solid border-blue-600 bg-white`,
                    styles.button
                  ]}
                >
                  <Text style={[tw`text-blue-600 uppercase`, styles.text]}>
                    Login with facebook
                  </Text>
                </Pressable>
              </View>
              <View style={tw`flex flex-row justify-center items-center`}>
                <Text
                  style={[
                    tw`text-center text-black font-semibold text-base`,
                    styles.paragraphs
                  ]}
                >
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text
                    style={[tw`font-bold text-base ml-2`, styles.paragraphs]}
                  >
                    Sign up
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
export default Login
