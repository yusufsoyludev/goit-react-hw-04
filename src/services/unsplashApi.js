import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';

export async function searchImages(query, page = 1) {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  if (!accessKey || accessKey === 'your_access_key_here') {
    throw new Error('Unsplash access key is missing. Set VITE_UNSPLASH_ACCESS_KEY in .env');
  }

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
    params: {
      query,
      page,
      per_page: 12,
      orientation: 'landscape',
    },
  });

  return response.data;
}
