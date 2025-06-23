import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, TouchableWithoutFeedback, useColorScheme } from 'react-native'
import { Text, View } from '@/components/Themed'
import Colors from '@/constants/Colors'

import React from 'react'

const newMarketplacePost = () => {
  const colorScheme = useColorScheme();
  return (
    <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior='padding' style={[styles.container, {backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background}]} >
        <Text lightColor={Colors.light.text} darkColor={Colors.dark.text}>Post Title</Text>
        <TextInput
          style={[styles.textInputTitle, {color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text}]}
          placeholder="Post Title"
        />
        <View style={styles.carousel}>
          <Image src='https://api.thecatapi.com/v1/images/search'></Image>
        </View>
        <Text></Text>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default newMarketplacePost

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textInput: {
    marginHorizontal: 200
  },  
  textInputTitle: {
    height: 60,
    borderWidth: 2,
    fontSize: 50
  },
  carousel: {
  
  },
  carouselImage: {
    aspectRatio: 1
  }



})