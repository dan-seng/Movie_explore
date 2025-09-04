import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMovieGenres } from '../services/api/movieService';
import { motion } from 'framer-motion';
import Loading from '../components/Loading';

const GenreNav = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getMovieGenres();
        setGenres(data);
        
        // If we're at the base genre route, navigate to action
        if (location.pathname === '/genre' || location.pathname === '/genre/') {
          const actionGenre = data.find(genre => genre.id === 28); // 28 is the ID for Action
          if (actionGenre) {
            navigate(`/genre/action`, { replace: true });
          }
        }
      } catch (err) {
        console.error('Error fetching genres:', err);
        setError('Failed to load genres');
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [location.pathname, navigate]);

  const genreRoutes = {
    28: 'action',
    35: 'comedy',
    18: 'drama',
    // Add more genre routes as needed
  };

  const handleGenreClick = (genreId, genreName) => {
    const routeName = genreRoutes[genreId] || genreName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/genre/${routeName}`);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };


  if (error) {
    return (
      <div className="text-center py-4 text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="relative">
          <div className="flex space-x-3 py-3 overflow-x-auto scrollbar-hide px-1">
            {genres.map((genre) => {
              const routeName = genreRoutes[genre.id] || genre.name.toLowerCase().replace(/\s+/g, '-');
              const isGenreActive = isActive(`/genre/${routeName}`);
              return (
                <motion.button
                  key={genre.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleGenreClick(genre.id, genre.name)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    isGenreActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {genre.name}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreNav;