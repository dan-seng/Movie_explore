import { getTrendingMovies } from "../services/api";
import { useState, useEffect } from "react";
import { Image } from "@heroui/react";

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
        <div className="">
           {loading ? (
            <p>Loading...</p>
           ) : (
            <div className="w-full grid grid-cols-3 gap-5 mt-5">
                {movies.map((movie) => (
                   <div key={movie.id} className="group border border-cyan-900 rounded-lg p-2 m-2 overflow-hidden">
  <div className="relative rounded-lg overflow-hidden"> 
    <Image
      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
      alt={movie.title}
      width={400}
      height={400}
      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 !visible !opacity-100"
    />

    {/* Add z-10 here to bring the overlay forward */}
    <div className="absolute inset-0 bg-black/10 flex items-end p-3 transition-opacity duration-300 z-10">
      <h2 className="font-semibold text-2xl text-white drop-shadow-md font-sans" >{movie.title} ({movie.vote_average.toFixed(1)} ⭐)</h2>
    </div>
  </div>

  <p className="line-clamp-2 text-xs font-light text-gray-200 mt-2">{movie.overview}</p>
  <p className="text-xs font-medium text-gray-200 font-sans" >Release Date: {movie.release_date}</p>
</div>
                    
                ))}
            </div>
           )}
        </div>
    )
}