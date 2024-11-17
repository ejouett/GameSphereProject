import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {

//const HomeScreen = ({ navigation })  => {
  return (
    <View style={styles.container}>
       <Text style={styles.missionText}>
        Welcome to GameSphere, your go-to app for discovering the latest in gaming! Stay updated with new game releases, read honest reviews, and connect with a passionate community of gamers. Join us in exploring the world of gaming together!
      </Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Reviews')}>
        <Text style={styles.cardTitle}>Game Reviews</Text>
        <Text style={styles.cardDescription}>See reviews about video games.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Forum')}>
        <Text style={styles.cardTitle}>Community Forum</Text>
        <Text style={styles.cardDescription}>Join discussions with other gamers.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('NewGames')}>
        <Text style={styles.cardTitle}>New Games</Text>
        <Text style={styles.cardDescription}>Best New & Upcoming Releases.</Text>
      </TouchableOpacity>
      {/* Add more cards for other sections as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  missionText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  card: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;

