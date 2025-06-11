import { StyleSheet, Pressable, Button } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Redirect, router } from 'expo-router';
import Colors from '@/constants/Colors';
import { supabase } from '@/lib/supabase';


export function signOut() {

}

export default function IndexPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title} lightColor={ Colors.light.text } darkColor={ Colors.dark.text }>Welcome to Study Nest!</Text>
      <Pressable onPress={() => {router.push("/(protected)/(tabs)/Profile")}}>
        <Text>
          View Profile
        </Text>
      </Pressable>
      
    </View>
    
  );
}

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
