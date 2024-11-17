// src/screens/GameDetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { fetchGameDetails } from '../servicesAPIs/api';

type GameDetailsScreenRouteProp = RouteProp<RootStackParamList, 'GameDetails'>;

type Props = {
  route: GameDetailsScreenRouteProp;
};

const GameDetailsScreen: React.FC<Props> = ({ route }) => {
  const { gameId, gameName } = route.params;
  const [gameDetails, setGameDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadGameDetails = async () => {
      const details = await fetchGameDetails(gameId);
      setGameDetails(details);
      setLoading(false);
    };

    loadGameDetails();
  }, [gameId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Game Details...</Text>
      </View>
    );
  }

  if (!gameDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load game details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{gameName}</Text>
      <Text style={styles.detailText}>Released: {gameDetails.released}</Text>
      <Text style={styles.detailText}>Rating: {gameDetails.rating}</Text>
      <Text style={styles.detailText}>Description:</Text>
      <Text style={styles.description}>{gameDetails.description_raw}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  detailText: { fontSize: 16, marginBottom: 8 },
  description: { fontSize: 14, lineHeight: 20, color: '#555' },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center' },
});

export default GameDetailsScreen;
