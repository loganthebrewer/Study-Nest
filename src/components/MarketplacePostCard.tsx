import { Pressable, StyleSheet, useColorScheme, } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Text, View } from './Themed'
import Colors from '@/constants/Colors'
import { Image } from 'react-native'

const MarketplacePostCard = () => {
    const colorScheme = useColorScheme();

    return (
        <Link href="/[post]">
            <Pressable style={[styles.container, { backgroundColor: colorScheme === 'dark' ? Colors.dark.card : Colors.light.card }]}>
                <Image
                    source={{ uri: "https://www.wondercide.com/cdn/shop/articles/Upside_down_gray_cat.png?v=1685551065" }}
                    style={styles.image}
                    resizeMode="cover" // or "contain"
                />
                <Text style={styles.title}>Cat</Text>
            </Pressable>
        </Link>
    )
}

export default MarketplacePostCard

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 15,
        flex: 1,
        maxWidth: '10%',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'cover',
        borderRadius: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 10,
    },
    price: {

    }
})