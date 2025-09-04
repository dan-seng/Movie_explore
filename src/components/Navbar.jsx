import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";
import logo from "../../public/dan-softwares.png"
import { Sun, Moon, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";
import { useNavigate } from 'react-router-dom';
import { Image } from '@heroui/react';

export default function App() {
  const menuItems = [
    "Trending",  
    "Rating",
    "Genre",
    "Trailer",
  ];
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

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

  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Navbar 
      disableAnimation 
      isBordered 
      className="p-4 dark:bg-gray-900 bg-white shadow-lg border-gray-200 dark:border-gray-700 font-sans"
      maxWidth="full"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle className="text-gray-600 dark:text-gray-300" />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <img 
            src={logo} 
            alt="logo" 
            width={45} 
            height={45} 
            className="rounded-lg shadow-md"
          />
          <p className="font-bold text-inherit text-2xl ml-3">
            <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Explore
            </span> 
            <span className="text-gray-800 dark:text-white"> Movie</span>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarBrand>
          <img 
            src={logo} 
            alt="logo" 
            width={48} 
            height={48} 
            className="rounded-lg shadow-md"
          />
          <p className="font-bold text-inherit text-2xl ml-4">
            <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Explore
            </span> 
            <span className="text-gray-800 dark:text-white"> Movie</span>
          </p>
        </NavbarBrand>
        
        <NavbarContent justify="center" className="flex gap-8 ml-22">
          <NavbarItem>
            <Link 
              color="foreground" 
              href="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-lg transition-all duration-200 hover:scale-105 relative group"
            >
              Trending
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
           
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              color="foreground"
              href="/rating" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-lg transition-all duration-200 hover:scale-105 relative group"
            >
              Rating
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              color="foreground" 
              href="/genre" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-lg transition-all duration-200 hover:scale-105 relative group"
            >
              Genre
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
           
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              color="foreground" 
              href="/trailer" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-lg transition-all duration-200 hover:scale-105 relative group"
            >
              Trailer
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
           
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent justify="end" className="flex-1 ml-45">
        <NavbarItem className="hidden lg:flex relative search-container">
          <form onSubmit={handleSearch} className="relative w-80">
            <div className="relative">
              <input
                type="search"
                placeholder="Search movies..."
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
            
            {showResults && searchResults.length > 0 && (
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
                    <Image
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : '/placeholder-poster.jpg'}
                      alt={movie.title}
                      width={45}
                      height={67}
                      className="rounded-lg mr-3 !visible !opacity-100 shadow-sm"
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
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-white dark:bg-gray-900 px-6 py-8">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-lg py-4 px-6 rounded-xl transition-all duration-200 
                       hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}