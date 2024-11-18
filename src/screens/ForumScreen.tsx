// src/screens/ForumScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Forum'>;

const ForumScreen: React.FC<Props> = ({ navigation }) => {
  const [topics, setTopics] = useState<{ id: string; title: string }[]>([
    { id: '1', title: 'Favorite Game of 2024?' },
    { id: '2', title: 'Best RPG Recommendations' },
    { id: '3', title: 'Tips for Beginners in Gaming' },
  ]);
  const [newTopic, setNewTopic] = useState<string>('');

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      const newId = (topics.length + 1).toString();
      setTopics((prevTopics) => [...prevTopics, { id: newId, title: newTopic }]);
      setNewTopic('');
    }
  };

  const handleTopicPress = (topic: string) => {
    navigation.navigate('ForumTopic', { topic });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forum Topics</Text>
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.topicItem} onPress={() => handleTopicPress(item.title)}>
            <Text style={styles.topicText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a new topic..."
        value={newTopic}
        onChangeText={setNewTopic}
      />
      <Button title="Add Topic" onPress={handleAddTopic} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  topicItem: {
    padding: 12,
    backgroundColor: '#f4f4f8',
    borderRadius: 8,
    marginBottom: 10,
  },
  topicText: { fontSize: 18 },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 12,
  },
});

export default ForumScreen;


