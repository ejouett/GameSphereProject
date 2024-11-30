// src/screens/ForumScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Forum {
  id: string;
  title: string;
}

const ForumScreen = ({ navigation }: any) => {
  const [forums, setForums] = useState<Forum[]>([]);
  const [newForumTitle, setNewForumTitle] = useState<string>('');

  useEffect(() => {
    loadForums();
  }, []);

  const loadForums = async () => {
    try {
      const storedForums = await AsyncStorage.getItem('forums');
      if (storedForums) {
        setForums(JSON.parse(storedForums));
      }
    } catch (error) {
      console.error('Error loading forums:', error);
    }
  };

  const saveForums = async (updatedForums: Forum[]) => {
    try {
      await AsyncStorage.setItem('forums', JSON.stringify(updatedForums));
      setForums(updatedForums);
    } catch (error) {
      console.error('Error saving forums:', error);
    }
  };

  const addForum = () => {
    if (newForumTitle.trim() === '') return;

    const newForum: Forum = {
      id: Date.now().toString(),
      title: newForumTitle,
    };

    const updatedForums = [...forums, newForum];
    saveForums(updatedForums);
    setNewForumTitle('');
  };

  const handleForumPress = (forum: Forum) => {
    navigation.navigate('ForumTopic', { forum });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forums</Text>
      <FlatList
        data={forums}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleForumPress(item)}>
            <Text style={styles.forumItem}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Add new forum..."
        value={newForumTitle}
        onChangeText={setNewForumTitle}
      />
      <Button title="Add Forum" onPress={addForum} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  forumItem: {
    fontSize: 18,
    padding: 8,
    backgroundColor: '#f4f4f8',
    borderRadius: 8,
    marginBottom: 10,
  },
  input: { padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, marginBottom: 12 },
});

export default ForumScreen;