import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'
import tw from '../lib/tailwind'
import Button from '../shared/Button'
import Input from '../shared/Input'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import { firebase, db, auth } from '../firebase'

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function Signup({ navigation }) {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    const { email, password, username } = data
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password)

      db.collection('users').add({
        owner_uid: user.user.uid,
        username: username,
        email: email
      })
      console.log('user created');
    } catch (error) {
      Alert.alert(
        'There was an error creating your account',
        error.message + '\n\n What would you like to do next?',
        [
          { text: 'Ok', style: 'cancel' },
          { text: 'Sign Up', onPress: () => navigation.push('Signup') }
        ]
      )
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[{ flex: 1, height: '100%' }, tw`px-3 py-8`]}>
        <TouchableOpacity
          // onPress={}
          style={[tw`w-6 items-center justify-center my-4 ml-2`]}
        >
          <Text
            style={[
              tw`text-2xl text-black font-medium max-w-full`,
              styles.paragraphs
            ]}
          >
            X
          </Text>
        </TouchableOpacity>
        <View style={[tw`w-full justify-center h-4/5`]}>
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
                name='username'
                defaultValue=''
                control={control}
                rules={{
                  required: { value: true, message: 'Username is required' },
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
                    error={errors.email}
                    errorText={errors?.email?.message}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder='Email'
                  />
                )}
              />
            </View>
            {/* <View style={tw`mb-2`}>
              <Controller
                name='phone'
                defaultValue=''
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Phone number is required'
                  },
                  min: 10,
                  max: 14
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    error={errors.phone}
                    errorText={errors?.phone?.message}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder='Phone'
                  />
                )}
              />
            </View> */}
            {/* <View style={tw`mb-2`}>
              <Controller
                name='address'
                defaultValue=''
                control={control}
                rules={{
                  required: { value: true, message: 'Address is required' },
                  minLength: 5
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    error={errors.address}
                    errorText={errors?.address?.message}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                    placeholder='Address'
                  />
                )}
              />
            </View> */}
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login')
              }}
            >
              <Text style={[tw`font-bold text-base ml-2`, styles.paragraphs]}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
