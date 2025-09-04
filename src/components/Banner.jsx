import { useState, useEffect } from 'react';
import { Image, Button } from '@heroui/react';
import { getTrendingMovies } from '../services/api';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
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
      <div className="w-full h-[80vh] flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <div className="animate-pulse w-full h-full relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        effect={'fade'}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
          el: '.banner-pagination',
          bulletClass: 'w-2 h-2 inline-block rounded-full bg-white/30 mx-1 cursor-pointer transition-all duration-300',
          bulletActiveClass: '!w-6 !bg-white',
        }}
        navigation={{
          nextEl: '.banner-next',
          prevEl: '.banner-prev',
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="w-full h-[85vh] md:h-[90vh] relative group"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
            
            <Image
              src={movie.backdrop_path 
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : 'https://via.placeholder.com/1920x1080?text=No+Backdrop'}
              alt={movie.title}
              className="w-full h-full object-cover transition-all duration-700 opacity-100"
              isZoomed
            />

            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12 text-white z-10">
              <div className="max-w-7xl mx-auto">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-yellow-500 text-yellow-900 text-sm font-bold rounded-full flex items-center">
                      {movie.vote_average.toFixed(1)} ⭐
                    </span>
                    <span className="text-sm text-white/80">
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight drop-shadow-xl">
                    {movie.title}
                  </h2>
                  
                  <p className="text-lg md:text-xl text-white/90 mb-6 line-clamp-2 drop-shadow-lg">
                    {movie.overview}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mt-8">
                    <Link 
                      to={`/movie/${movie.id}`}
                      className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Play size={20} className="fill-current" />
                      Watch Now
                    </Link>
                    <Link 
                      to={`/movie/${movie.id}`}
                      className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
                    >
                      <Info size={20} />
                      More Info
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Custom Navigation */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center banner-pagination" />
        
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 banner-prev cursor-pointer bg-black/50 hover:bg-black/70 p-3 rounded-full">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 banner-next cursor-pointer bg-black/50 hover:bg-black/70 p-3 rounded-full">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Swiper>
      
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          width: 24px;
          background: white;
          border-radius: 4px;
        }
        .swiper-button-disabled {
          opacity: 0.3 !important;
          cursor: not-allowed;
        }
      `}</style>
     </div>
  );
}