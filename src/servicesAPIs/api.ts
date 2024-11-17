// src/services/apiService.ts
// src/services/apiService.ts

// src/services/newsApiService.ts

// src/services/newsApiService.ts

const RAWG_API_KEY = '666801eaae9f4abcb48d5a8b1d4bb6a8';
const BASE_URL = 'https://api.rawg.io/api';

export interface Game {
  id: number;
  name: string;
  released: string;
  rating: number;
}

export interface Review {
  id: number;
  name: string;
  text: string;
  username: string;
  date: string;
}

export const fetchGames = async (query = ''): Promise<Game[]> => {
  const url = `${BASE_URL}/games?key=${RAWG_API_KEY}&search=${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Error fetching games:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

//new
export const fetchGameReviews = async (gameId: number): Promise<Review[]> => {
  const url = `${BASE_URL}/games/${gameId}/reviews?key=${RAWG_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Error fetching reviews:', response.status, response.statusText);
      return [];
    }
    const data = await response.json();
    return data.results as Review[];
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

export const fetchGameDetails = async (gameId: number): Promise<any> => {
  const url = `${BASE_URL}/games/${gameId}?key=${RAWG_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Error fetching game details:', response.status, response.statusText);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};