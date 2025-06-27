import { StyleSheet } from 'react-native';
import { Redirect, router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useState, useEffect, useContext } from 'react';

import {Session, User} from '@supabase/supabase-js'
import { PropsWithChildren, createContext } from "react";
//Added 

type AuthContext ={
  session: Session | null;
  user: User | null;
  profile: any | null;
}
const AuthContext = createContext<AuthContext>({
  session: null,
  user: null,
  profile: null,
});

export default function IndexPage({children}: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if(session) {
        console.log("User is authenticated2");
        setSession(session);
      }
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      if(session) {
        router.replace("/(protected)/(tabs)");
        console.log("User is authenticated");
        setSession(session)
      } else {
        router.replace("/(auth)/LoginPage");
        console.log("User is not authenticated");
      }
    })
    }, [])

  // fetch the profile for streamchat
  useEffect(() => {
    if(!session?.user){
      //setProfile(null);
      return;
    }
    const fetchProfile = async () => {
      let { data, error} = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
      setProfile(data)
    };
    fetchProfile();

  }, [session?.user])
  // debug
  console.log(profile);

return <AuthContext.Provider value={{session, user: session?.user ?? null, profile}}>
  {children}
  </AuthContext.Provider>;  
 
}
// export a custom hook that will give access to context
export const useAuth = () => useContext(AuthContext);

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