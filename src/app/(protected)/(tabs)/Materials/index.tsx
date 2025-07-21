import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Switch,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import { supabase } from '@/lib/supabase';
import * as DocumentPicker from 'expo-document-picker';
import { WebView } from 'react-native-webview';
import { FontAwesome } from "@expo/vector-icons";

const spacing = 20;
const calculateItemWidth = (numColumns: number) => {
  const screenWidth = Dimensions.get('window').width;
  const totalSpacing = spacing * (numColumns + 1);
  const availableWidth = screenWidth - totalSpacing;
  return availableWidth / numColumns;
};

const calculateNumColumns = (itemWidth = 120, spacing = 20) => {
  const screenWidth = Dimensions.get('window').width;
  const num = Math.floor(screenWidth / (itemWidth + spacing));
  return Math.max(num, 1);
};
const Materials = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchUsername = async () => {
    setLoading(true);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Error fetching user:', userError?.message);
      setLoading(false);
      return;
    }

    setUserId(user.id);

    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching username:', error.message);
    } else {
      setUsername(data.username);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  return (
    <View style={{ flex:1}}>
      <View style={{ padding: 20}}>
        {loading ? (
          <Text>One Second Please...</Text>
        ) : (
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Hi, {username}</Text>
        )}
      </View>

      {userId && <FileUploader userId={userId} />}
    </View>
  );
};

type PickedFile = {
  uri: string;
  name: string;
};

const FileUploader = ({ userId }: { userId: string }) => {
  const [file, setFile] = useState<{ uri: string; name: string } | null>(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [editingFile, setEditingFile] = useState<any>(null);
  const [numColumns, setNumColumns] = useState(calculateNumColumns());


    useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setNumColumns(calculateNumColumns());
    });

    return () => subscription?.remove?.();
  }, []);

  const fetchFiles = async () => {
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .or(`user_id.eq.${userId},is_public.eq.true`)
      .order('created_at', { ascending: false });

    if (error) Alert.alert('Error', error.message);
    else {setFiles(data);}
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });

      if (result.canceled) {
        setFile(null);
        return;
      }

      const picked = result.assets?.[0];
      if (picked) {
        setFile({ uri: picked.uri, name: picked.name });
        console.log('Picked file:', picked);
        setModalVisible(true); 
      } else {
        setFile(null);
      }
    } catch (err) {
      console.error('Error picking file:', err);
      setFile(null);
    }
  };

  const uploadFile = async () => {
    if (!file || !title) {
      Alert.alert('Please select a file and enter a name');
      return;
    }

    setUploading(true);

 
    try {
      const filePath = `${userId}/${Date.now()}_${file.name}`;


       const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || 'application/octet-stream',
    });

       const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) throw new Error('Not authenticated'); 

       const res = await fetch(
      `https://cqbsmwaamttjewmnnviq.supabase.co/storage/v1/object/user-files/${filePath}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      }
    );

      if (!res.ok) {
      const errJson = await res.json();
      throw new Error(errJson.message || 'Upload failed');
    }

      const publicUrlData = supabase.storage
        .from('user-files')
        .getPublicUrl(filePath);

      if (!publicUrlData?.data?.publicUrl) {
        throw new Error('Failed to retrieve public URL');
      }

      const fileUrl = publicUrlData.data.publicUrl;

     const { data: { user }, error: userError } = await supabase.auth.getUser();
     if (userError || !user) throw new Error('Not authenticated');
   
    
    const { data: insertData, error: dbError } = await supabase.from('files').insert([
      {
        user_id: user.id, 
        title,
        file_url: fileUrl,
        is_public: isPublic,
      },
    ]);
     
    if (dbError) {
      console.error('DB insert error:', dbError);
      throw dbError;
    }

      Alert.alert('Success!', 'Your file is uploaded!');
      setFile(null);
      setTitle('');
      setIsPublic(false);
      await fetchFiles();

    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'object'
          ? JSON.stringify(err)
          : String(err);
      Alert.alert('Upload failed', message);
    } finally {
      setUploading(false);
    }
  };
  const deleteFile = async (item) => {
    try {
    const publicURL = item.file_url;
    const parts = publicURL.split('/user-files/'); // adjust if your bucket name changes
    if (parts.length < 2) throw new Error('Invalid file URL');
    const pathInBucket = parts[1];

      const { error: storageError } = await supabase.storage
        .from('user-files')
        .remove([pathInBucket]);
      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('files')
        .delete()
        .eq('id', item.id);
      if (dbError) throw dbError;

      Alert.alert('Deleted', 'File deleted successfully');
      fetchFiles();
    } catch (err) {
      Alert.alert('Delete failed', err.message || 'Unknown error');
    }
  };

  const openEditModal = (item) => {
    setEditingFile(item);
    setNewTitle(item.title);
    setEditModalVisible(true);
  };

  const saveTitle = async () => {
    if (!editingFile) return;

    try {
      const { error } = await supabase
        .from('files')
        .update({ title: newTitle })
        .eq('id', editingFile.id)
        .select();

      if (error) throw error;

      Alert.alert('Updated', 'Title updated successfully');
      setEditModalVisible(false);
      await fetchFiles();
    } catch (err) {
      Alert.alert('Update failed', err.message || 'Unknown error');
    }

    const openDoc = () => {
      Linking.openURL(item.file_url);
    };

  };
    
  return (
  <View style={{ padding: 20, flex: 1 }}>
    <Button title="Upload New Material"  onPress={pickFile} />

    <Text
      style={{
        marginVertical: 20,
        fontWeight: 'bold',
        fontSize: 20,
      }}
    >
      Your Files:
    </Text>

    {files.length === 0 ? (
      <Text>No materials yet. Upload one to get started!</Text>
    ) : (
      <FlatList
        data={files}
        extraData={files}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        numColumns={numColumns}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: spacing }}
        renderItem={({ item }) => {
          const itemWidth = calculateItemWidth(numColumns);
          const isImage =
            item.file_url.endsWith('.png') ||
            item.file_url.endsWith('.jpg') ||
            item.file_url.endsWith('.jpeg') ||
            item.file_url.endsWith('.gif');
          const isPDF = item.file_url.endsWith('.pdf');

          const openDoc = () => {
            Linking.openURL(item.file_url);
          };

          return (
            <Pressable onPress={openDoc} style={{ marginBottom: 20, flex: 1, alignItems: 'center' }}>
              <View
                style={{
                  alignItems: 'center',
                  overflow: 'hidden',
                  justifyContent: 'center',
                  width: itemWidth,
                  height: itemWidth,
                }}
              >
                {isImage ? (
                  <Image
                    source={{ uri: item.file_url }}
                    style={{
                      width: itemWidth,
                      height: itemWidth,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      marginBottom: 5,
                    }}
                    resizeMode="cover"
                  />
                ) : isPDF ? (
                  <WebView
                    source={{
                      uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
                        item.file_url
                      )}`,
                    }}
                    style={{
                      width: itemWidth,
                      height: itemWidth,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: itemWidth,
                      height: itemWidth,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      marginBottom: 5,
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    <FontAwesome name="file-o" size={40} color="gray" />
                  </View>
                )}
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <Text style={{ fontWeight: 'bold' }}>{item.title || 'Untitled'}</Text>
                <FontAwesome
                  name={item.is_public ? 'unlock' : 'lock'}
                  size={16}
                  color="gray"
                  style={{ marginLeft: 5 }}
                />
              </View>

              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Pressable onPress={() => openEditModal(item)} style={{ marginHorizontal: 5 }}>
                  <Text style={{ color: 'blue' }}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => deleteFile(item)} style={{ marginHorizontal: 5 }}>
                  <Text style={{ color: 'red' }}>Delete</Text>
                </Pressable>
              </View>
            </Pressable>
          );
        }}
      />
    )}

    <Modal
      visible={modalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'whitesmoke',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '80%',
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Enter file details</Text>

          <TextInput
            placeholder="Enter a name"
            value={title}
            onChangeText={setTitle}
            style={{
              borderWidth: 1,
              padding: 8,
              marginVertical: 10,
            }}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10 }}>Make Public</Text>
            <Switch value={isPublic} onValueChange={setIsPublic} />
          </View>

          {uploading ? (
            <ActivityIndicator />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}
            >
              <Pressable onPress={() => setModalVisible(false)} style={{ padding: 10 }}>
                <Text>Cancel</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  uploadFile();
                  setModalVisible(false);
                }}
                style={{ padding: 10,backgroundColor: 'blue',borderRadius: 5}}
              >
                <Text style={{ color: 'white' }}>Upload</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>

    <Modal
      visible={editModalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setEditModalVisible(false)}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 8,
            width: '80%',
          }}
        >
          <Text>Edit Title</Text>
          <TextInput
            value={newTitle}
            onChangeText={setNewTitle}
            style={{
              borderWidth: 1,
              padding: 8,
              marginVertical: 10,
            }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
            <Button title="Save" onPress={saveTitle} />
          </View>
        </View>
      </View>
    </Modal>
  </View>
);

};
export default Materials;
