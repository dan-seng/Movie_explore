import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieVideos, getMovieDetails, searchMovies, getPopularMovies } from "../services/api";
// Removed @heroui/react Image import as we'll use standard img tag
import Loading from "../components/Loading";
import { Play, ArrowLeft, Youtube, Search, Shuffle, Film } from "lucide-react";

function Trailors() {
  const { id: initialMovieId } = useParams();
  const navigate = useNavigate();
  const [trailers, setTrailers] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);


  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      try {
        setLoading(true);
        setError(null);
        const results = await searchMovies(query);
        setSearchResults(results || []);
        setShowSearchResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
        setError('Failed to search for movies. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResultClick = async (movieId) => {
    try {
      setLoading(true);
      setShowSearchResults(false);
      setSearchQuery('');
      setPlayingVideo(null); // Reset any playing video
      
      // Load the selected movie's trailers
      const [movieData, videosData] = await Promise.all([
        getMovieDetails(movieId).catch(e => {
          console.error('Error fetching movie details:', e);
          return null;
        }),
        getMovieVideos(movieId).catch(e => {
          console.error('Error fetching movie videos:', e);
          return { results: [] };
        })
      ]);
      
      if (!movieData) {
        throw new Error('Could not load movie details');
      }
      
      setMovie(movieData);
      
      // Filter for YouTube videos
      const youtubeVideos = (videosData?.results || []).filter(
        video => video.site === 'YouTube' && video.type === 'Trailer'
      );
      
      setTrailers(youtubeVideos);
      
      // Update URL without page reload
      window.history.pushState({}, '', `/trailers/${movieId}`);
    } catch (err) {
      console.error('Error loading movie:', err);
      setError('Failed to load movie trailers. Please try another one.');
    } finally {
      setLoading(false);
    }
  };


  // Fetch random popular movie trailers
  const fetchRandomMovieTrailers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching popular movies...');
      const popularMovies = await getPopularMovies();
      console.log('Popular movies:', popularMovies);
      
      if (!popularMovies || !Array.isArray(popularMovies) || popularMovies.length === 0) {
        throw new Error('No popular movies found or invalid response format');
      }
      
      // Pick a random movie
      const randomMovie = popularMovies[
        Math.floor(Math.random() * popularMovies.length)
      ];
      console.log('Selected random movie:', randomMovie);
      
      if (!randomMovie || !randomMovie.id) {
        throw new Error('Invalid movie data received');
      }
      
      // Get movie details and videos
      console.log('Fetching movie details and videos for ID:', randomMovie.id);
      const [movieData, videosData] = await Promise.all([
        getMovieDetails(randomMovie.id).catch(e => {
          console.error('Error fetching movie details:', e);
          return null;
        }),
        getMovieVideos(randomMovie.id).catch(e => {
          console.error('Error fetching movie videos:', e);
          return { results: [] };
        })
      ]);
      
      if (!movieData) {
        throw new Error('Could not load movie details');
      }
      
      setMovie(movieData);
      
      // Filter for YouTube videos
      const videos = videosData?.results || [];
      console.log('All videos:', videos);
      
      const youtubeVideos = videos.filter(
        video => video.site === 'YouTube' && video.type === 'Trailer'
      );
      
      console.log('Filtered YouTube trailers:', youtubeVideos);
      setTrailers(youtubeVideos);
      
      // Update URL without page reload
      window.history.pushState({}, '', `/trailers/${randomMovie.id}`);
    } catch (err) {
      console.error('Error in fetchRandomMovieTrailers:', err);
      setError(`Failed to load trailers: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Search for movies
 

  // Load movie by ID
  const loadMovieById = async (movieId) => {
    try {
      setLoading(true);
      setError(null);
      
      const [movieData, videosData] = await Promise.all([
        getMovieDetails(movieId),
        getMovieVideos(movieId)
      ]);
      
      setMovie(movieData);
      
      // Filter for YouTube videos
      const youtubeVideos = (videosData.results || []).filter(
        video => video.site === 'YouTube' && video.type === 'Trailer'
      );
      
      setTrailers(youtubeVideos);
      setShowSearchResults(false);
      
      // Update URL without page reload
      window.history.pushState({}, '', `/trailers/${movieId}`);
    } catch (err) {
      console.error('Error loading movie:', err);
      setError('Failed to load movie. Please try another one.');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (initialMovieId) {
      loadMovieById(initialMovieId);
    } else {
      fetchRandomMovieTrailers();
    }
  }, [initialMovieId]);

  const filteredVideos = trailers.filter(video => {
    if (activeTab === 'trailers') return video.type === 'Trailer';
    if (activeTab === 'teasers') return video.type === 'Teaser';
    if (activeTab === 'featurettes') return video.type === 'Featurette';
    return true; // 'all' tab
  });

  // Get a new random movie
  const handleRandomMovie = () => {
    fetchRandomMovieTrailers();
  };

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="debug-info hidden">
        <p>Movie ID: {initialMovieId}</p>
        <p>Loading: {loading.toString()}</p>
        <p>Error: {error || 'None'}</p>
        <p>Trailers count: {trailers.length}</p>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Search bar */}
        <div className="hidden lg:flex relative search-container">
          <form onSubmit={handleSearch} className="relative w-80">
            <div className="relative">
              <input
                type="search"
                placeholder="Search trailers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 px-6 py-3 font-sans pr-12 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                         placeholder-gray-500 dark:placeholder-gray-400
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         shadow-sm hover:shadow-md transition-all duration-200"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 
                         text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400
                         transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl 
                           border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto
                           backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
                {searchResults.map((movie) => (
                  <div 
                    key={movie.id}
                    onClick={() => handleResultClick(movie.id)}
                    className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex items-center 
                             border-b border-gray-100 dark:border-gray-600 last:border-b-0
                             transition-colors duration-150"
                  >
                    <img
                      src={movie.poster_path 
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` 
                        : '/placeholder-poster.jpg'}
                      alt={movie.title}
                      width={45}
                      height={67}
                      className="rounded-lg mr-3 shadow-sm object-cover w-[45px] h-[67px]"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-poster.jpg';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">
                        {movie.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
        
        {/* Movie info and videos */}
        {movie ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {movie.title} - Videos
              </h1>
              <button
                onClick={handleRandomMovie}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Shuffle size={16} className="mr-1" />
                Show Another Movie
              </button>
            </div>

            {/* Movie info */}
            <div className="flex flex-col md:flex-row items-start mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="w-full md:w-48 lg:w-64 flex-shrink-0 h-72 md:h-auto">
                <img
                  src={movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : '/no-poster.png'}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-l-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/no-poster.png';
                  }}
                />
              </div>
              <div className="p-6 flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{movie.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{movie.overview}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
                  </span>
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                  <span>{movie.runtime} min</span>
                </div>
              </div>
            </div>
          </>
        ): (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow">
            <Film size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No movie selected</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Search for a movie or click 'Random' to see trailers
            </p>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-red-600 text-red-600 dark:border-red-500 dark:text-red-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              All Videos ({trailers.length})
            </button>
            <button
              onClick={() => setActiveTab('trailers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'trailers'
                  ? 'border-red-600 text-red-600 dark:border-red-500 dark:text-red-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Trailers ({trailers.filter(v => v.type === 'Trailer').length})
            </button>
            <button
              onClick={() => setActiveTab('teasers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'teasers'
                  ? 'border-red-600 text-red-600 dark:border-red-500 dark:text-red-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Teasers ({trailers.filter(v => v.type === 'Teaser').length})
            </button>
            <button
              onClick={() => setActiveTab('featurettes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'featurettes'
                  ? 'border-red-600 text-red-600 dark:border-red-500 dark:text-red-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Featurettes ({trailers.filter(v => v.type === 'Featurette').length})
            </button>
          </nav>
        </div>

        {/* Main Video Player */}
        
        {/* Videos grid */}
        {filteredVideos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <div key={video.key} className="group bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <div className="relative aspect-video bg-black">
                    {playingVideo === video.key ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
                        title={video.name}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    ) : (
                      <div 
                        className="w-full h-full cursor-pointer"
                        onClick={() => setPlayingVideo(video.key)}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                          alt={video.name}
                          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                            <Play size={24} className="text-white ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {Math.floor(video.size / 60)}:{String(video.size % 60).padStart(2, '0')}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-xs rounded-full text-gray-600 dark:text-gray-300">
                        {video.type}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {video.published_at.split('T')[0]}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                      {video.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : movie ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow">
            <Youtube size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No videos found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              {activeTab === 'all' 
                ? "This movie doesn't have any videos yet." 
                : `No ${activeTab} available. Try another category.`}
            </p>
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow">
            <Film size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No movie selected</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Search for a movie or click 'Random' to see trailers
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Trailors;