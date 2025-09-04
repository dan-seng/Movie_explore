import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";
import logo from "../../public/dan-softwares.png"
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";
import { useNavigate, useLocation } from 'react-router-dom';
import { Image } from '@heroui/react';

export default function App() {
  const menuItems = [
    { name: "Trending", path: "/" },
    { name: "Rating", path: "/rating" },
    { name: "Genre", path: "/genre" },
    { name: "Trailer", path: "/trailor" },
  ];
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        const results = await searchMovies(searchQuery);
        setSearchResults(results);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      }
    }
  };

  const handleResultClick = (movieId) => {
    navigate(`/movie/${movieId}`);
    setShowResults(false);
    setSearchQuery('');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest('.search-container') === null) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Navbar 
      disableAnimation 
      isBordered 
      className="p-3 dark:bg-gray-900 bg-white shadow-lg border-gray-200 dark:border-gray-700 font-sans"
      maxWidth="full"
    >
      {/* Brand - Always visible */}
      <NavbarContent justify="start">
        <NavbarBrand>
          <img 
            src={logo} 
            alt="logo" 
            width={40} 
            height={40} 
            className="rounded-lg"
          />
          <p className="font-bold text-inherit text-xl ml-2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Explore
            </span> 
            <span className="text-gray-800 dark:text-white"> Movie</span>
          </p>
        </NavbarBrand>
      </NavbarContent>

      {/* Navigation Links - Visible on all screens */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <NavbarItem key={item.name}>
              <Link 
                href={item.path}
                className={`font-semibold text-base transition-all duration-200 hover:scale-105 relative group
                  ${isActive 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-200 
                  ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* Mobile Navigation - Stacked vertically */}
      <NavbarContent className="sm:hidden flex-col items-start gap-2 mt-4" justify="center">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <NavbarItem key={item.name} className="w-full">
              <Link 
                href={item.path}
                className={`font-semibold text-base block py-2 px-3 rounded-lg transition-all duration-200 w-full
                  ${isActive 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                {item.name}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* Search Bar - Right side */}
      <NavbarContent justify="end">
        <NavbarItem className="relative search-container">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="search"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 sm:w-64 rounded-2xl border border-gray-300 dark:border-gray-600 px-4 py-2 font-sans pr-10 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                         placeholder-gray-500 dark:placeholder-gray-400
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         shadow-sm hover:shadow-md transition-all duration-200 text-sm sm:text-base"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 
                         text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400
                         transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl 
                           border border-gray-200 dark:border-gray-700 z-50 max-h-64 sm:max-h-96 overflow-y-auto
                           backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
                {searchResults.map((movie) => (
                  <div 
                    key={movie.id}
                    onClick={() => handleResultClick(movie.id)}
                    className="p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex items-center 
                             border-b border-gray-100 dark:border-gray-600 last:border-b-0
                             transition-colors duration-150"
                  >
                    <Image
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : '/placeholder-poster.jpg'}
                      alt={movie.title}
                      width={35}
                      height={52}
                      className="rounded-lg mr-2 !visible !opacity-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                        {movie.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}