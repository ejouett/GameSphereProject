// src/screens/ForumScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const threads = [
  { id: '1', title: 'Latest Game Releases', description: 'Discuss the latest games here.' },
  { id: '2', title: 'Favorite Game Moments', description: 'Share your favorite gaming moments.' },
  { id: '3', title: 'Upcoming Game Features', description: 'Talk about upcoming features.' },
  // Add more threads as needed
];

const ForumScreen = () => {
  const renderThread = ({ item }) => (
    <TouchableOpacity style={styles.threadCard}>
      <Text style={styles.threadTitle}>{item.title}</Text>
      <Text style={styles.threadDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        renderItem={renderThread}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  threadCard: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  threadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  threadDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default ForumScreen;
