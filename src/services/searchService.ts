import axios from 'axios';
import { SERPAPI_API_KEY } from '../utils/env';

export const searchWeb = async (query: string): Promise<string | null> => {
  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        q: query,
        api_key: SERPAPI_API_KEY,
        engine: 'google',
      },
    });

    const results = response.data?.organic_results;
    if (results && results.length > 0) {
      return results[0].link;
    }
    return null;
  } catch (err) {
    console.error('Search error:', err);
    return null;
  }
};
