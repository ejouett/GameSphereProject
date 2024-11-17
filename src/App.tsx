/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ReviewScreen from './screens/ReviewScreen';
import ForumScreen from './screens/ForumScreen';
import NewGamesScreen from './screens/NewGamesScreen';
import GameDetailsScreen from './screens/GameDetailsScreen';
import GameReviewsScreen from './screens/GameReviewsScreen';

//const Stack = createNativeStackNavigator();
export type RootStackParamList = {
  Home: undefined;
  Reviews: undefined;  //{ gameId: number; gameName: string }
  Login: undefined;
  Forum: undefined;
  NewGames: undefined
  GameDetails: { gameId: number; gameName: string };
  GameReviews: { gameId: number; gameName: string };
  // Add any other screens as needed
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'GameSphere Features' }} />
        <Stack.Screen name="Reviews" component={ReviewScreen} options={{ title: 'Reviews' }} />
        <Stack.Screen name="GameReviews" component={GameReviewsScreen} options={{ title: 'Reviews' }} />
        <Stack.Screen name="Forum" component={ForumScreen} options={{ title: 'Community Forum' }} />
        <Stack.Screen name="NewGames" component={NewGamesScreen} options={{ title: 'Best New & Upcoming Releases' }} />
        <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

