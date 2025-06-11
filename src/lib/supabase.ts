import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cqbsmwaamttjewmnnviq.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxYnNtd2FhbXR0amV3bW5udmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNDk5ODAsImV4cCI6MjA2NDcyNTk4MH0.Z_aRbRRQ_nY9L_AHIjUsjHaxBq3TK2X7Nrhve00zpLI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})