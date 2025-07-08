import { Button, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, useColorScheme } from 'react-native'
import { Text, View } from '@/components/Themed'
import { View as DefaultView } from 'react-native'
import colors from '@/constants/colors'
import { Dimensions } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import ImageUploadCarousel from '@/components/ImageUploadCarousel'
import { Stack } from 'expo-router'



const newMarketplacePost = () => {
  const [postTitle, setTitle] = useState<string>('');
  const [postPrice, setPrice] = useState<number>();
  const [postDescription, setDescription] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  

  const screenWidth = Dimensions.get('window').width;
  const colorScheme = useColorScheme();
  return (
    <DefaultView style={{flex: 1}}>
      <Stack.Screen
    options={{
      title: "New Listing",
      headerShown: true,
      headerRight: () => (
        <Button title="Publish" onPress={() => alert('Post (not really) Published!')} />
      ),
      headerBackButtonDisplayMode: "minimal",
    }}
    />

    <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()}>
      <ScrollView alwaysBounceHorizontal={false} style={[styles.container, {backgroundColor: colorScheme === 'dark' ? colors.dark.background : colors.light.background}, {padding: 10}]}>

        <TextInput
          style={[styles.textInputTitle, {color: colorScheme === 'dark' ? colors.dark.text : colors.light.text}]}
          placeholder="Title"
          placeholderTextColor={colorScheme === 'dark' ? colors.dark.textSecondary : colors.light.textSecondary}
          onChangeText={(text) => setTitle(text)}
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
          <ImageUploadCarousel images={images} setImages={setImages}></ImageUploadCarousel>
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
    </DefaultView>
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
  scrollContent: { flexDirection: 'row', alignItems: 'center' },
  marginVertical10: {
    marginVertical: 10,
  },
  marginHorizontal10: {
    marginHorizontal: 10,
  }
})