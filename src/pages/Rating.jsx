import { useState, useEffect } from "react";
import { getTopRatedMovies, getTopRatedTVShows } from "../services/api";
import { Image } from "@heroui/react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

export default function Rating() {

   const [movies, setMovies] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTopRatedMovies();
        setMovies(data.slice(0, 300)); 
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError(error); 
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, []);
  
    return(
        <>
        <h1 className="font-semibold mb-2 drop-shadow-lg text-center">Top rated movies</h1>
        {loading ? 
        <Loading message="Loading your movies..." /> : error ? (
            <p>Error: {error.message}</p>
        ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 px-4">
                {movies.map((movie) => (
                  <div 
                    key={movie.id} 
                    className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={movie.backdrop_path 
                          ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                          : '/placeholder-movie.jpg'}
                        alt={movie.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 !visible !opacity-100"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 z-10">
                        <div className="bg-yellow-400 text-gray-800 text-sm font-bold px-3 py-1 rounded-full absolute top-3 right-3">
                          {movie.vote_average.toFixed(1)} 
                        </div>
                        <h2 className="text-white text-xl font-bold drop-shadow-lg line-clamp-2">
                          {movie.title}
                        </h2>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-3">
                        {movie.overview || 'No overview available.'}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span> {new Date(movie.release_date).toLocaleDateString()}</span>
                                            
                      <Link
                        to={`/movie/${movie.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                      >
                        View Details
                      </Link>
                                            </div>
                    </div>
                  </div>
                ))}
            </div>
        )}
        </>
    )
}