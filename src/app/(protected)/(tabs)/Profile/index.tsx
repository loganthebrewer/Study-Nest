import { View, Text } from '@/components/Themed'
import { supabase } from '@/lib/supabase';
import { useLocalSearchParams } from 'expo-router';
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'


const ProfilePage = () => {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      <Text>Your Profile</Text>
      
      <Pressable onPress={() => {supabase.auth.signOut()}}>
        <Text>
          Sign Out
        </Text>
      </Pressable>
    </View>
  )
}

export default ProfilePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
