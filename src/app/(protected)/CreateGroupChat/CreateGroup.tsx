import { useEffect, useState } from 'react';
import { FlatList, TextInput, Button, Text, Pressable, View } from 'react-native';
import { useAuth } from 'src/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import { useChatContext } from 'stream-chat-expo';
import { router } from 'expo-router';

export default function CreateGroup() {
  const { user } = useAuth();
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user?.id);

      if (!error && data) setUsers(data);
    };
    fetchUsers();
  }, []);

  const toggleUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const createGroup = async () => {
    const memberIds = [user?.id, ...selectedUsers];

    const channel = client.channel('messaging', {
      name: groupName,
      members: memberIds,
    });

    await channel.watch();
    router.replace(`/(protected)/channel/${channel.cid}`);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold' }}>Group Name</Text>
      <TextInput
        value={groupName}
        onChangeText={setGroupName}
        placeholder="Enter a group name"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />

      <Text style={{ fontWeight: 'bold' }}>Select Members</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => toggleUser(item.id)}
            style={{
              padding: 10,
              backgroundColor: selectedUsers.includes(item.id) ? '#aaf' : '#eee',
              marginVertical: 4,
            }}
          >
            <Text>{item.full_name}</Text>
          </Pressable>
        )}
      />
      <Button title="Create Group Chat" onPress={createGroup} disabled={!groupName || selectedUsers.length === 0} />
    </View>
  );
}
