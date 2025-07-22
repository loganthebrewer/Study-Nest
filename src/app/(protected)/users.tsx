import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import { useAuth } from "src/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import UserListItem from "@/components/UserListItem";


export default function UsersScreen(){
    const { user } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() =>{
        const fetchUsers = async () =>{
            let { data: profiles, error } = await supabase
            .from('profiles')
            .select('*')
            .neq('id', user.id)
        
            //if (error){
              //  console.error("Error fetching users:", error.message);
            //}
            //else{
                setUsers(profiles)
            //}
        };
        fetchUsers();
    },[])

    return( 
        <SafeAreaView style={{flex: 1 }}>
    <FlatList
            data={users}
            // Later render avatar picture with user
            contentContainerStyle={{gap: 5}}
            renderItem={({ item }) => <UserListItem user={item} />}
            />
            </SafeAreaView>
    );
}