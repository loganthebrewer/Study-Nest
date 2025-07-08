import { Image, Keyboard, KeyboardAvoidingView, Pressable, StyleSheet, TextInput, TouchableWithoutFeedback, useColorScheme } from 'react-native'
import { Text, View } from '@/components/Themed'
import { View as DefaultView } from 'react-native'
import colors from '@/constants/colors'
import { Dimensions } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'

const ImageUploadCarousel = () => {
    const colorScheme = useColorScheme();

    const [images, setImages] = useState<string[]>([]);
    
    const addItem = () => {
        setImages((prevItems) => [...prevItems, `${prevItems.length + 1}`]);
    }

    return (
    <DefaultView>
        <ScrollView
            horizontal
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
        >
        {images.map((item, index) => (
            <View key={index} style={[styles.box, styles.plusBox, {backgroundColor: colorScheme === 'dark' ? colors.dark.cardSecondary : colors.light.cardSecondary}]}>
                
                <Text>{item}</Text>
            </View>
        ))}
        <Pressable onPress={addItem} style={[styles.box, styles.plusBox, {backgroundColor: colorScheme === 'dark' ? colors.dark.cardSecondary : colors.light.cardSecondary}]}>
            <Text>+</Text>
        </Pressable>
        </ScrollView>
    </DefaultView>
    )
}


const newMarketplacePost = () => {
  const [postTitle, setTitle] = useState<string>('');
  const [postPrice, setPrice] = useState<number>();
  const [postDescription, setDescription] = useState<string>('');
  const [postImages, setImages] = useState<Image[]>();

  const [items, setItems] = useState<string[]>([]);
  const addItem = () => {
    setItems((prevItems) => [...prevItems, `${prevItems.length + 1}`]);
  }

  const screenWidth = Dimensions.get('window').width;
  const colorScheme = useColorScheme();
  return (
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
  scrollView: { },
  scrollContent: { flexDirection: 'row', alignItems: 'center' },
  box: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  carouselImage: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    borderRadius: 15,
    marginHorizontal: 5
  },
  plusBox: {
    
  },
  marginVertical10: {
    marginVertical: 10,
  },
  marginHorizontal10: {
    marginHorizontal: 10,
  }
})