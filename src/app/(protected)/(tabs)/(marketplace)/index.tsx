import { View, Text } from '@components/Themed'
import Colors from '@constants/Colors'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const MarketplaceView = () => {
  return (
    <View>
      <Link href="/newMarketplacePost">
        <View style={styles.container}>
          <Text style={styles.newPostPlus}>+</Text>
        </View>
      </Link>
    </View>
  )
}

export default MarketplaceView

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "green",
  },
  newPostPlus: {
    fontWeight: 'black',
    fontSize: 30,
  }
})