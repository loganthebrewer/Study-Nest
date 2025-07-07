import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, TouchableWithoutFeedback, useColorScheme } from 'react-native'
import { Text, View } from '@/components/Themed'
import colors from '@/constants/colors'
import { Dimensions } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import ImageUploadCarousel from '@/components/ImageUploadCarousel'

const newMarketplacePost = () => {
  const screenWidth = Dimensions.get('window').width;

  const colorScheme = useColorScheme();
  return (
    <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()}>
      <ScrollView alwaysBounceHorizontal={false} style={[styles.container, {backgroundColor: colorScheme === 'dark' ? colors.dark.background : colors.light.background}, {padding: 10}]}>
        <TextInput
          style={[styles.textInputTitle, {color: colorScheme === 'dark' ? colors.dark.text : colors.light.text}]}
          placeholder="Title"
          placeholderTextColor={colorScheme === 'dark' ? colors.dark.textSecondary : colors.light.textSecondary}
        />
        <View style={ styles.priceInputContainer }>
          <Text style={[styles.dollarSign, {color: colorScheme === 'dark' ? colors.dark.textSecondary : colors.light.textSecondary}]}>$</Text>
          <TextInput
            style={[styles.textInputPrice, {color: colorScheme === 'dark' ? colors.dark.text : colors.light.text}]}
            placeholder="Price"
            placeholderTextColor={colorScheme === 'dark' ? colors.dark.textSecondary : colors.light.textSecondary}
            caretHidden={true}
            inputMode='numeric'
          /> 
        </View> 
        
        <View style={[styles.cardContainer, styles.imagesContainer, styles.marginVertical10, { backgroundColor: colorScheme == 'dark' ? colors.dark.card : colors.light.card }]}>
          <Text style={styles.cardTitle}>Images</Text>
          <ImageUploadCarousel></ImageUploadCarousel>
        </View>
        
        
        <View style={[styles.cardContainer, styles.descriptionContainer, styles.marginVertical10, { backgroundColor: colorScheme === 'dark' ? colors.dark.card : colors.light.card }]}>
          <Text style={styles.cardTitle}>Description</Text>
          <TextInput
            style={[styles.textInputDescription, {color: colorScheme === 'dark' ? colors.dark.text : colors.light.text},]}
            placeholder="Description"
            placeholderTextColor={colorScheme === 'dark' ? colors.dark.textSecondary : colors.light.textSecondary}
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
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  priceInputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  textInputPrice: {
    height: 50,
    minWidth: 50,
    fontSize: 40,
  },
  dollarSign: {
    height: 50,
    fontSize: 40,
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