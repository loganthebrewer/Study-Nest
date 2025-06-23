import MarketplacePostCard from '@/components/MarketplacePostCard'
import { View, Text } from '@components/Themed'
import Colors from '@constants/Colors'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const MarketplaceView = () => {
  return (
    <View style={styles.ItemsView}>
      <MarketplacePostCard/>
      <MarketplacePostCard/>
      <Link href="/newMarketplacePost">
      </Link>
    </View>
  )
}

export default MarketplaceView

const styles = StyleSheet.create({
  ItemsView: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    flexWrap: 'wrap',
  },
  buttonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "green",
  },
  postButton: {
    width: 5
  }
})