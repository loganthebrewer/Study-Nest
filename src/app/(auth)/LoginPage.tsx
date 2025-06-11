import React, { useState } from 'react'
import { Alert, StyleSheet, AppState, TextInput, Button, useColorScheme, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { supabase } from '@/lib/supabase'
import Colors from '@/constants/Colors'
import { Text, View } from '@/components/Themed'


// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert("Signup Error", error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  const colorScheme = useColorScheme()

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior='padding' style={[styles.container, {backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background}]} >
        <Text style={styles.headline}>Study Nest</Text> 
        <View style={styles.loginComponent}>
          <View style={[styles.emailInput, styles.verticallySpaced, {borderColor: '#ccc'}]}>
            <Text>Email</Text>
            <TextInput
              style={{color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text}}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={'none'}
            />
          </View>
          <View style={[styles.passwordInput, styles.verticallySpaced, {borderColor: '#ccc'}]}>
            <Text>Password</Text>
            <TextInput
              style={{color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text}}  
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={'none'}
            />
          </View>
          <View style={[styles.loginButton, styles.verticallySpaced, styles.mt20]} lightColor={Colors.light.button} darkColor={Colors.dark.button}>
            <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} color={colorScheme === 'dark' ? Colors.dark.buttonText : Colors.light.buttonText} />
          </View>
          <View style={styles.verticallySpaced}>
            <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} color={colorScheme === 'dark' ? Colors.dark.text : Colors.light.text} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loginComponent: {
    width: '90%',
    borderRadius: 25,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  emailInput: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  passwordInput: {
    borderWidth: 1,
    padding: 8, 
    borderRadius: 4,
  },
  loginButton: {
    borderRadius: 4,
  }
})