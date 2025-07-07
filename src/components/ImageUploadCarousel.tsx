import { Button, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import colors from '@/constants/colors';

const ImageUploadCarousel = () => {
    const colorScheme = useColorScheme();

    const [items, setItems] = useState<string[]>([]);
    
    const addItem = () => {
        setItems((prevItems) => [...prevItems, `${prevItems.length + 1}`]);
    }

    return (
    <View style={styles.container}>
        <ScrollView
            horizontal
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
        >
        {items.map((item, index) => (
            <View key={index} style={[styles.box, styles.plusBox, {backgroundColor: colorScheme === 'dark' ? colors.dark.cardSecondary : colors.light.cardSecondary}]}>
                
                <Text>{item}</Text>
            </View>
        ))}
        <Pressable onPress={addItem} style={[styles.box, styles.plusBox, {backgroundColor: colorScheme === 'dark' ? colors.dark.cardSecondary : colors.light.cardSecondary}]}>
            <Text>+</Text>
        </Pressable>
        </ScrollView>
    </View>
    )
}

export default ImageUploadCarousel

const styles = StyleSheet.create({
  container: { },
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
  plusBox: {
    
  }
});