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



