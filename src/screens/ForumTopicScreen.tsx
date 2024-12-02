import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Comment {
  id: string;
  text: string;
  replies?: Reply[]; // Allow replies for a comment
}

interface Reply {
  id: string;
  text: string;
}

const ForumTopicScreen = ({ route }: any) => {
  const { forum } = route.params;
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null); // Track selected comment for replies
  const [newReply, setNewReply] = useState<string>('');

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
      replies: [],
    };

    const updatedComments = [...comments, newCommentObj];
    saveComments(updatedComments);
    setNewComment('');
  };

  const addReply = () => {
    if (!selectedComment || newReply.trim() === '') return;

    const updatedComments = comments.map((comment) => {
      if (comment.id === selectedComment.id) {
        return {
          ...comment,
          replies: [...(comment.replies || []), { id: Date.now().toString(), text: newReply }],
        };
      }
      return comment;
    });

    saveComments(updatedComments);
    setSelectedComment(null); // Deselect after replying
    setNewReply('');
  };

  const renderReplies = (replies: Reply[]) => {
    return (
      <FlatList
        data={replies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.reply}>{`↳ ${item.text}`}</Text>
        )}
      />
    );
  };

  if (!forum) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Forum not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{forum.title}</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <TouchableOpacity onPress={() => setSelectedComment(item)}>
              <Text style={styles.comment}>{item.text}</Text>
            </TouchableOpacity>
            {item.replies && renderReplies(item.replies)}
          </View>
        )}
      />
      {!selectedComment ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <Button title="Add Comment" onPress={addComment} />
        </>
      ) : (
        <>
          <Text style={styles.replyPrompt}>
            Replying to: {selectedComment.text}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Add a reply..."
            value={newReply}
            onChangeText={setNewReply}
          />
          <Button title="Add Reply" onPress={addReply} />
          <Button
            title="Cancel Reply"
            onPress={() => setSelectedComment(null)}
            color="red"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  errorText: { fontSize: 18, color: 'red', textAlign: 'center', marginTop: 20 },
  commentContainer: { marginBottom: 16 },
  comment: {
    fontSize: 16,
    padding: 8,
    backgroundColor: '#f4f4f8',
    borderRadius: 8,
    marginBottom: 4,
  },
  reply: {
    fontSize: 14,
    padding: 6,
    backgroundColor: '#e6e6fa',
    borderRadius: 6,
    marginLeft: 20,
    marginBottom: 4,
  },
  input: { padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, marginBottom: 12 },
  replyPrompt: { fontSize: 16, fontStyle: 'italic', marginBottom: 8 },
});

export default ForumTopicScreen;
