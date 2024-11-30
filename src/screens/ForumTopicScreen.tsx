import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Comment {
  id: string;
  text: string;
}

const ForumTopicScreen = ({ route }: any) => {
  const { forum } = route.params;
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const storedComments = await AsyncStorage.getItem(`comments_${forum.id}`);
      if (storedComments) {
        setComments(JSON.parse(storedComments));
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const saveComments = async (updatedComments: Comment[]) => {
    try {
      await AsyncStorage.setItem(
        `comments_${forum.id}`,
        JSON.stringify(updatedComments)
      );
      setComments(updatedComments);
    } catch (error) {
      console.error('Error saving comments:', error);
    }
  };

  const addComment = () => {
    if (newComment.trim() === '') return;

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      text: newComment,
    };

    const updatedComments = [...comments, newCommentObj];
    saveComments(updatedComments);
    setNewComment('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{forum.title}</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.comment}>{item.text}</Text>}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        value={newComment}
        onChangeText={setNewComment}
      />
      <Button title="Add Comment" onPress={addComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  comment: {
    fontSize: 16,
    padding: 8,
    backgroundColor: '#f4f4f8',
    borderRadius: 8,
    marginBottom: 10,
  },
  input: { padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, marginBottom: 12 },
});

export default ForumTopicScreen;
