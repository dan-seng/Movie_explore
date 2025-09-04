import { getTrendingMovies } from "../services/api";
import { useState, useEffect } from "react";
import { Image } from "@heroui/react";
import { motion } from "framer-motion";

export default function MovieGrid(){
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
          try {
            const data = await getTrendingMovies();
            setMovies(data.slice(0, 60)); 
          } catch (error) {
            console.error('Error fetching movies:', error);
          } finally {
            setLoading(false);
          }
        };
        
        fetchMovies();
      }, []);
    return(
        <div className="container mx-auto px-4 py-8">
           {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl overflow-hidden h-80 animate-pulse">
                  <div className="w-full h-full bg-gray-700"></div>
                </div>
              ))}
            </div>
           ) : (
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
                {movies.map((movie) => (
                  <motion.div 
                    key={movie.id} 
                    className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-900 h-80"
                    whileHover={{ y: -5 }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 }
                    }}
                  >
                    <div className="relative h-full">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 !visible !opacity-100"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent flex flex-col justify-between p-4 z-10">
                        <div className="flex justify-end">
                          <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                            {movie.vote_average.toFixed(1)} 
                          </span>
                        </div>
                        
                        <div className="mt-auto">
                          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>
                          <p className="text-gray-300 text-sm line-clamp-2 mb-2">{movie.overview}</p>
                          <div className="flex justify-between items-center text-xs text-gray-400">
                            <span>{new Date(movie.release_date).getFullYear()}</span>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors">
                              Watch Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
           )}
        </div>
    )
}