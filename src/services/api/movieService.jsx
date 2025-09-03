import apiClient from './apiClient';

export const getTrendingMovies = async (timeWindow = 'day') => {
  const response = await apiClient.get(`/trending/movie/${timeWindow}`, {
    params: {
      page: 1
    }
  });
  return response.data.results || [];
};


export const getMovieDetails = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};


export const searchMovies = async (query) => {
  if (!query) return [];
  const response = await apiClient.get('/search/movie', {
    params: { 
      query,
      page: 1,
      include_adult: false
    }
  });
  return response.data.results || [];
};

export const getTopRatedMovies = async (pageCount = 15) => {
  try {
    const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
    
    const requests = pageNumbers.map(page => 
      apiClient.get('/movie/top_rated', { params: { page } })
    );
    
    const responses = await Promise.all(requests);
    
    return responses.flatMap(response => response.data.results || []);
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
};

export const getTopRatedTVShows = async () => {
  const response = await apiClient.get('/tv/top_rated', {
    params: {
      page: 1
    }
  });
  return response.data.results || [];
};