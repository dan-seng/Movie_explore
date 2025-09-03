// src/components/MovieDetail.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { Image } from '@heroui/react';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
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
          <p className="text-gray-600 dark:text-gray-300 mb-4">{movie.overview}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold">Release Date</h3>
              <p>{movie.release_date}</p>
            </div>
            <div>
              <h3 className="font-semibold">Rating</h3>
              <p>{movie.vote_average.toFixed(1)} ⭐ ({movie.vote_count} votes)</p>
            </div>
            <div>
              <h3 className="font-semibold">Runtime</h3>
              <p>{movie.runtime} minutes</p>
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <p>{movie.status}</p>
            </div>
          </div>

          {movie.genres && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}