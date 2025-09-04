// src/components/MovieDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getMovieDetails, getMovieVideos } from '../services/api';
import { Image, Button } from '@heroui/react';
import { Play, Youtube, ArrowLeft } from 'lucide-react';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieData, videosData] = await Promise.all([
          getMovieDetails(id),
          getMovieVideos(id)
        ]);
        
        setMovie(movieData);
        
        // Filter for YouTube trailers
        const trailers = videosData.results?.filter(video => 
          video.type === "Trailer" && video.site === "YouTube"
        ) || [];
        
        setVideos(trailers);
      } catch (err) {
        setError('Failed to load movie details');
        console.error('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (loading) return <div className="p-4">Loading movie details...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!movie) return <div className="p-4">Movie not found</div>;

  return (
    <div className="container mx-auto p-4">
    
      <button 
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={400}
            height={600}
            className="rounded-lg shadow-lg !visible !opacity-100"
          />
        </div>
        
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          
          {/* Trailer Section */}
          {videos.length > 0 && (
            <div className="mb-6">
              {!showTrailer ? (
                <Button
                  color="danger"
                  className="bg-red-600 hover:bg-red-700"
                  startContent={<Play size={20} />}
                  onClick={() => setShowTrailer(true)}
                >
                  Watch Trailer
                </Button>
              ) : (
                <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-xl mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${videos[0].key}`}
                    title={`${movie.title} Trailer`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              )}
            </div>
          )}

          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">{movie.overview}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Release Date</h3>
              <p className="text-gray-700 dark:text-gray-300">{new Date(movie.release_date).toLocaleDateString()}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Rating</h3>
              <p className="text-gray-700 dark:text-gray-300">
                {movie.vote_average.toFixed(1)} ⭐ ({movie.vote_count.toLocaleString()} votes)
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Runtime</h3>
              <p className="text-gray-700 dark:text-gray-300">{movie.runtime} minutes</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Status</h3>
              <p className="text-gray-700 dark:text-gray-300">{movie.status}</p>
            </div>
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span 
                    key={genre.id} 
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {videos.length > 1 && (
            <div className="mt-6">
              <Link 
                to={`/movie/${id}/trailers`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <Youtube size={20} className="mr-2" />
                View all {videos.length} trailers and videos
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}