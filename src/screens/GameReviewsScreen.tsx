// src/screens/GameReviewsScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchGameReviews, Review } from '../servicesAPIs/api';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type GameReviewsScreenRouteProp = RouteProp<RootStackParamList, 'GameReviews'>;

type GameReviewsScreenProps = {
  route: GameReviewsScreenRouteProp;
};

const GameReviewsScreen: React.FC<GameReviewsScreenProps> = ({ route }) => {
  const { gameId, gameName } = route.params;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    const fetchedReviews = await fetchGameReviews(gameId);
    setReviews(fetchedReviews);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Reviews...</Text>
      </View>
    );
  }

  if (reviews.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noReviewsText}>No reviews available for {gameName}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews for {gameName}</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text style={styles.reviewText}>{item.text}</Text>
            <Text style={styles.reviewer}>{item.username} - {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  reviewItem: { marginBottom: 16, padding: 8, backgroundColor: '#f4f4f8', borderRadius: 8 },
  reviewText: { fontSize: 16, marginBottom: 4 },
  reviewer: { fontSize: 12, color: '#666' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noReviewsText: { fontSize: 16, textAlign: 'center', color: '#666' },
});

export default GameReviewsScreen;
