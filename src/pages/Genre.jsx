import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesByGenre } from '../services/api/movieService';
import MovieGrid from '../components/MovieGrid';
import Loading from '../components/Loading';
import GenreNav from '../components/GenreNav';

const Genre = ({ genreName, genreId: propGenreId }) => {
  const { genreId: paramGenreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  
  // Use the prop genreId if available, otherwise use the one from URL params
  const activeGenreId = propGenreId || paramGenreId;

  useEffect(() => {
    // Reset movies and page when genre changes
    setMovies([]);
    setPage(1);
  }, [activeGenreId, genreName]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!activeGenreId) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await getMoviesByGenre(activeGenreId, page);
        
        setMovies(prevMovies => 
          page === 1 ? data : [...prevMovies, ...data]
        );
      } catch (err) {
        console.error(`Error fetching ${genreName} movies:`, err);
        setError(`Failed to load ${genreName} movies`);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [activeGenreId, page, genreName]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (loading && movies.length === 0) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <GenreNav />
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {genreName} Movies
      </h1>
      
      <MovieGrid movies={movies} />
      
      <div className="flex justify-center mt-8">
        <button
          onClick={loadMore}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 
                     transition-colors duration-200 disabled:opacity-50 flex items-center"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export default Genre;
