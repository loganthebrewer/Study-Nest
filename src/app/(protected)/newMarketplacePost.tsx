import { Alert, Button, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, useColorScheme } from 'react-native'
import { Text, View } from '@/components/Themed'
import { View as DefaultView } from 'react-native'
import colors from '@/constants/colors'
import { Dimensions } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import ImageUploadCarousel from '@/components/ImageUploadCarousel'
import { router, Stack } from 'expo-router'
import { supabase } from '@/lib/supabase'
import 'react-native-get-random-values'; // Necessary for UUID generation. See https://github.com/uuidjs/uuid?tab=readme-ov-file#getrandomvalues-not-supported
import { v4 as uuidv4 } from 'uuid';


const newMarketplacePost = () => {
  const [postTitle, setTitle] = useState<string>('');
  const [postPrice, setPrice] = useState<number>();
  const [postDescription, setDescription] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  
  const publishPost = async () => {
    const isDebug : boolean = false;
    if(isDebug) {
      Alert.alert("Debug Mode Active", "No changes have been made.")
    }
    else {
      
      try {
          const listingUUID = uuidv4();
          console.log("Post ID: " + listingUUID);
          const author_id = ((await supabase.auth.getUser()).data.user?.id)
          if(!author_id) {
            throw new Error("User is not logged in.")
          }
          if(!postTitle) {
            throw new Error("Listing is missing a title.")
          }
          if(images.length===0) {
            throw new Error("Listing is missing images")
          }
          if(postPrice == null) {
            throw new Error("No price specified.")
          }


          console.log(postPrice)
          const { data, error } = 
          await supabase
          .from('marketplace_posts')
          .insert({
            mp_post_id: listingUUID, 
            title: postTitle,
            price: postPrice,
            description: postDescription,
            author_id: author_id,
          })
       
          if(error) { //Supabase errors
            throw new Error(error.message);
          }
        } 
        catch (err) {
          const errorTitle = err instanceof Error ? err.name : 'Unknown Error';
          const errorMessage = err instanceof Error ? err.message : 'An unknown error has occurred.';
          Alert.alert(errorTitle, errorMessage);
          console.error(errorTitle + ":", errorMessage)
          return;
        }
      }
    router.back();
    return;
  } 



  const screenWidth = Dimensions.get('window').width;
  const colorScheme = useColorScheme();
  return (
    <DefaultView style={{flex: 1}}>
      <Stack.Screen
      options={{
        title: "New Listing",
        headerShown: true,
        headerRight: () => (
          <Button title="Publish" onPress={() => publishPost()} />
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
            onChangeText={(value) => {
              const numVal = isNaN(parseInt(value)) ? 0 : parseInt(value);
              setPrice(numVal);
            }}
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
            onChangeText={(text) => setDescription(text)}
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