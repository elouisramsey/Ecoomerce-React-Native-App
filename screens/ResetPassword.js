import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '../lib/tailwind'
import { useForm, Controller } from 'react-hook-form'
import Button from '../shared/Button'
import Input from '../shared/Input'

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function Resetpassword({ navigation }) {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    console.log(errors)
  }
  return (
    <SafeAreaView style={[tw`px-3 py-8 bg-white `, { flex: 1 }]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[tw`w-6 items-center justify-center`]}
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
          <View style={tw`px-4`}>
            <Text
              style={[
                tw`text-2xl text-black font-bold my-8`,
                styles.paragraphs
              ]}
            >
              Forgot password
            </Text>
            <Text
              style={[
                tw`text-base text-black font-medium mb-8`,
                styles.paragraphs
              ]}
            >
              Please enter your email address. You will receive a link to create
              a new password via email.
            </Text>
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

            <View style={tw`mt-8`}>
              <Button
                title='send link'
                transform='uppercase'
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  headers: {
    fontFamily: 'playfair'
  },
  paragraphs: {
    fontFamily: 'poppins'
  }
})
