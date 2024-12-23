// src/screens/NewGamesScreen.tsx
// src/screens/NewGamesScreen.tsx
//import React, { useState } from 'react';
//import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { fetchGames, Game } from '../servicesAPIs/api';

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
//import { fetchGames, Game } from '../api/rawgApi';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type NewGameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NewGames'>;

type Props = {
  navigation: NewGameScreenNavigationProp;
};
//const NewGamesScreen: React.FC = () => {
const NewGamesScreen: React.FC<Props> = ({ navigation }) => {    //new
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);
  

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async (query = '') => {
    const fetchedGames = await fetchGames(query);
    setGames(fetchedGames);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    loadGames(text);
  };
// new
  const handleGamePress = (game: Game) => {
    navigation.navigate('GameDetails', { gameId: game.id, gameName: game.name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Games</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search games..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleGamePress(item)}>  
            <View style={styles.gameItem}>
              <Text style={styles.gameTitle}>{item.name}</Text>
              <Text>Release Date: {item.released}</Text>
              <Text>Rating: {item.rating}</Text>
            </View>
          </TouchableOpacity>    //new
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  searchInput: { padding: 8, borderColor: '#ccc', borderWidth: 1, borderRadius: 4, marginBottom: 16 },
  gameItem: { marginBottom: 16, padding: 8, backgroundColor: '#f4f4f8', borderRadius: 8 },
  gameTitle: { fontSize: 18, fontWeight: '600' },
});

export default NewGamesScreen;




