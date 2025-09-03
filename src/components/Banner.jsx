import { useState, useEffect } from "react";
import { Image } from "@heroui/react";
import { getTrendingMovies } from "../services/api";
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Banner() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data.slice(0, 20)); 
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 w-full h-full rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="w-full relative mt-5">
        <p className="font-semibold mb-2 drop-shadow-lg text-center">Trending Movies</p>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        effect={'fade'}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="w-full h-[90vh]"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-black/30 z-10" />
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 !visible !opacity-100"
              />
              

              <div className="absolute bottom-0 left-0 right-0 z-20 p-8 text-white">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">
                    {movie.title}
                  </h2>
                  <p className="text-xl md:text-xl max-w-2xl line-clamp-2 drop-shadow-lg">
                    {movie.overview}
                  </p>
                  <p className="text-xl md:text-xl max-w-2xl line-clamp-2 drop-shadow-lg">
                    {movie.vote_average.toFixed(1)} ⭐
                  </p>
                </div>
              </div>
              </div>
          
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}