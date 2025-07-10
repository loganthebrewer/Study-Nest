import { ImageBackground, Pressable, StyleSheet, useColorScheme } from 'react-native'
import { Text, View } from '@/components/Themed'
import { View as DefaultView } from 'react-native'
import colors from '@/constants/colors'
import React from 'react'
import { ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface ImageUploadCarouselProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageUploadCarousel = ({images, setImages}: ImageUploadCarouselProps) => {
    const colorScheme = useColorScheme();

    
    
    const addImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0,
      });

      console.log(result);

      if (!result.canceled) {
        setImages([...images, result.assets[0].uri]);
      }
    };

    const removeImage = (index: number) => {
      const newImages: string[] = images.slice();
      newImages.splice(index, 1);
      console.log(images);
      setImages(newImages);
      console.log(images);
    }

    return (
    <DefaultView>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >
        {images.map((item, index) => (
            <View key={index} style={[styles.box, {backgroundColor: colorScheme === 'dark' ? colors.dark.cardSecondary : colors.light.cardSecondary}]}>
                <ImageBackground style={styles.carouselImage}source={{uri: item}}>
                    <Pressable onPress={() => removeImage(index)}>
                        <AntDesign style={styles.deleteIcon} name="closecircle" size={24} color="white" />
                  </Pressable>
                </ImageBackground>
            </View>
        ))}
        <Pressable onPress={addImage} style={[styles.box, styles.plusBox, {backgroundColor: colorScheme === 'dark' ? colors.dark.cardSecondary : colors.light.cardSecondary}]}>
            <FontAwesome6 name="circle-plus" size={24} color="dimgrey" />
        </Pressable>
        </ScrollView>
    </DefaultView>
    )
}


export default ImageUploadCarousel

const styles = StyleSheet.create({
  scrollContent: { flexDirection: 'row', alignItems: 'center' },
  carouselImage: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    borderRadius: 20,
    overflow: 'hidden',
  },
  box: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  plusBox: {
    
  },

  deleteImageButton: {
    margin: 8,

    height: 20,
    aspectRatio: 1, 
    opacity: .8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    margin: 8,
    opacity: .9
  },
});