import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Define a TypeScript type for the review items
interface Review {
  id: string;
  title: string;
  body: string;
  reviewer: string;
  date: string;
  rating: number;
}

// Sample reviews data
const reviews: Review[] = [
  { id: '1', title: 'Amazing Game!', body: 'I loved the gameplay and graphics.', reviewer: 'Alice', date: '2024-10-15', rating: 5 },
  { id: '2', title: 'Not bad', body: 'It was good, but could be better.', reviewer: 'Bob', date: '2024-10-14', rating: 3 },
  // Add more reviews as needed
];

const ReviewScreen = () => {
  // Use the Review type for the item parameter
  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.reviewCard}>
      <Text style={styles.stars}>{'★'.repeat(item.rating) + '☆'.repeat(5 - item.rating)}</Text>
      <Text style={styles.reviewTitle}>{item.title}</Text>
      <Text style={styles.reviewBody}>{item.body}</Text>
      <Text style={styles.reviewerInfo}>{item.reviewer} - {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reviews</Text>
      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.id}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  reviewCard: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  stars: {
    fontSize: 18,
    color: '#FFD700',
    marginBottom: 5,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewBody: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  reviewerInfo: {
    fontSize: 12,
    color: '#999',
  },
});

export default ReviewScreen;

