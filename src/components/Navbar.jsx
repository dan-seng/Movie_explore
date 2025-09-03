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
import { Sun, Moon, Search } from "lucide-react"; // Added Search icon
import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";
import { useNavigate } from 'react-router-dom'; // Changed to useNavigate
import { Image } from '@heroui/react';

export default function App() {
  const menuItems = [
    "Trending",  
    "Rating",
    "Genre",
    "Trailor",
  ];
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate(); // Changed to useNavigate

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
    navigate(`/movie/${movieId}`); // Changed to navigate
    setShowResults(false);
    setSearchQuery(''); // Clear search input
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
    <Navbar disableAnimation isBordered className="p-3 dark:bg-blue-900 bg-blue-50 font-sans">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center" >
        <NavbarBrand>
          <img src={logo} alt="logo" width={40} height={40} className="rounded" />
          <p className="font-bold text-inherit text-3xl ml-5"><span className="text-yellow-500">Explore</span> Movie</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <img src={logo} alt="logo" width={40} height={40} className="rounded"/>
          <p className="font-bold text-inherit text-3xl ml-5"><span className="text-yellow-500">Explore</span> Movie</p>
        </NavbarBrand>
        <NavbarContent justify="center" className="flex gap-8 ml-50 mr-10 font-sans">
          <NavbarItem>
            <Link color="foreground" href="/" className="hover:text-yellow-500 font-semibold text-xl transition-all duration-150">
              Trending
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link aria-current="page" color="warning" href="/rating" className="hover:text-yellow-500 font-semibold text-xl transition-all duration-150">
              Rating
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/genre" className="hover:text-yellow-500 font-semibold text-xl transition-all duration-150">
              Genre
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/trailor" className="hover:text-yellow-500 font-semibold text-xl transition-all duration-150">
              Trailor
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="flex items-center gap-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex relative search-container">
          <form onSubmit={handleSearch} className="relative w-full flex items-center">
            <input
              type="search"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-300 px-4 py-2 font-sans pr-10" // Added padding for button
            />
            <button 
              type="submit" 
              className="absolute right-2 p-1 text-gray-500 hover:text-yellow-500"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {searchResults.map((movie) => (
                  <div 
                    key={movie.id}
                    onClick={() => handleResultClick(movie.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                  >
                    <Image
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : '/placeholder-poster.jpg'}
                      alt={movie.title}
                      width={40}
                      height={60}
                      className="rounded mr-2 !visible !opacity-100"
                    />
                    <div>
                      <p className="font-medium">{movie.title}</p>
                      <p className="text-sm text-gray-500">
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

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full font-sans"
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