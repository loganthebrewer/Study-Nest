import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Redirect, router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';


export default function IndexPage() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if(session) {
        console.log("User is authenticated2");
      }
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      if(session) {
        router.replace("/(protected)/(tabs)");
        console.log("User is authenticated");
      } else {
        router.replace("/(auth)/LoginPage");
        console.log("User is not authenticated");
      }
    })
    }, [])
  
 
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});