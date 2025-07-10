import { StyleSheet, useColorScheme, Image, Dimensions } from 'react-native'
import { Text, View } from '@/components/Themed'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import listings from '@assets/data/marketplaceTestData'
import { supabase } from '@/lib/supabase'
import { MARKETPLACE_IMAGE_FALLBACK } from '@/constants/fallbacks'

import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from 'react-native-reanimated'
import { ScrollView } from 'react-native'
import colors from '@/constants/colors'

const data = listings.map(listing => listing.thumbnail);
const defaultDataWith6Colors = [
	"#B0604D",
	"#899F9C",
	"#B3C680",
	"#5C6265",
	"#F5D399",
	"#F1F1F1",
];


const width = Dimensions.get("window").width;
 
const LocalMarketplaceListingPage = () => {
  const { id } = useLocalSearchParams();
  const listing = listings.find((p) => p.id.toString() === id);
  const colorScheme = useColorScheme();
  const progress = useSharedValue<number>(0);

  return (
    
    
    <ScrollView>
      <Stack.Screen
      options={{
        title: listing?.title || "Listing Details"
      }}/>
      
      <View // Please do not apply the container styling to this view, the carousel should reach the ends of the screen
      > 
        <Carousel
          autoPlay={false}
          data={defaultDataWith6Colors}
          height={258}
          loop={true}
          pagingEnabled={true}
          snapEnabled={true}
          width={width}
          style={{
            width: width,
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          onProgressChange={progress}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: "center",
              }}
            >
              <Image source={{uri: listing?.thumbnail || MARKETPLACE_IMAGE_FALLBACK}} style={[styles.listingImage,{width: width}]}/>
            </View>
          )}
        />
		  </View>

      <View style={styles.container}>
        <Text style={styles.listingTitle}>{listing?.title}</Text>
        <Text style={styles.listingPrice}>${listing?.price}</Text>
        <View style={[styles.cardContainer, styles.marginTop, {backgroundColor: colorScheme === 'dark' ? colors.dark.card : colors.light.card}]}>
          <Text style={styles.cardTitle}>Description</Text>
          <Text>Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.</Text>
        </View>
        <View style={[styles.cardContainer, styles.marginTop, {backgroundColor: colorScheme === 'dark' ? colors.dark.card : colors.light.card}]}>
          <Text style={styles.cardTitle}>Seller Info</Text>

        </View>
      </View>
    </ScrollView>
  )
}

export default LocalMarketplaceListingPage

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  cardContainer: {
    borderRadius: 20,
    padding: 15,
    flex: 1,
  },
  cardTitle: {
    fontSize: 25,
    marginBottom: 5,
  },
  listingTitle: {
    fontSize: 50,
  },
  listingPrice: {
    fontSize: 25,
  },
  listingImage: {
    width: 258,
    height: 258,
    resizeMode: 'cover'
  },
  sellerContainer: {

  },
  marginTop: {
    marginTop: 5
  },
})