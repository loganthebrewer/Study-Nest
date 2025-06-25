import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, TouchableWithoutFeedback, useColorScheme } from 'react-native'
import { Text, View } from '@/components/Themed'
import Colors from '@/constants/Colors'

import React from 'react'
import { ScrollView } from 'react-native'

const newMarketplacePost = () => {
  const colorScheme = useColorScheme();
  return (
    <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()}>
      <ScrollView alwaysBounceHorizontal={false} style={[styles.container, {backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background}, {padding: 10}]}>
        <TextInput
          style={[styles.textInputTitle, {color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text}]}
          placeholder="Title"
          placeholderTextColor={colorScheme === 'dark' ? Colors.dark.textSecondary : Colors.light.textSecondary}
        /> 
        <TextInput
          style={[styles.textInputPrice, {color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text}]}
          placeholder="Price"
          placeholderTextColor={colorScheme === 'dark' ? Colors.dark.textSecondary : Colors.light.textSecondary}
          caretHidden={true}
          inputMode='decimal'
        /> 
        <View style={[styles.cardContainer, styles.imagesContainer, styles.marginVertical10, { backgroundColor: colorScheme == 'dark' ? Colors.dark.card : Colors.light.card }]}>
          <Text style={styles.cardTitle}>Images</Text>
          <ScrollView horizontal={true} style={[styles.carousel]}>
            <Image
              source={{ uri: "https://www.wondercide.com/cdn/shop/articles/Upside_down_gray_cat.png?v=1685551065" }}
              style={styles.carouselImage}
            />
            <Image
              source={{ uri: "https://www.wondercide.com/cdn/shop/articles/Upside_down_gray_cat.png?v=1685551065" }}
              style={styles.carouselImage}
            />
            <Image
              source={{ uri: "https://www.wondercide.com/cdn/shop/articles/Upside_down_gray_cat.png?v=1685551065" }}
              style={styles.carouselImage}
            />
            <Image
              source={{ uri: "https://www.wondercide.com/cdn/shop/articles/Upside_down_gray_cat.png?v=1685551065" }}
              style={styles.carouselImage}
            />
            
          </ScrollView>
        </View>
        
        
        <View style={[styles.cardContainer, styles.descriptionContainer, styles.marginVertical10, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : Colors.light.card }]}>
          <Text style={styles.cardTitle}>Description</Text>
          <TextInput
            style={[styles.textInputDescription, {color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text},]}
            placeholder="Description"
            multiline={true}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

export default newMarketplacePost

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cardContainer: {
    borderRadius: 20,
    padding: 15,
  },
  cardTitle: {
    paddingBottom: 10,
  },
  textInput: {
    marginVertical: 10,
  },  
  textInputTitle: {
    height: 60,
    fontSize: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  textInputPrice: {
    height: 50,
    fontSize: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  descriptionContainer: {
    flex: 1,
    minHeight: 200,
  },
  textInputDescription: {
    fontSize: 25
  },
  imagesContainer: {
    flex:1,
    minHeight: 150
  },
  carousel: {
    
  },
  carouselImage: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    borderRadius: 15,
    marginHorizontal: 5
  },
  marginVertical10: {
    marginVertical: 10,
  },
  marginHorizontal10: {
    marginHorizontal: 10,
  }
})