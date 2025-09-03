import { Link } from "@heroui/react";
import { Facebook, Instagram, Github, Heart   } from "lucide-react";
import { FaWhatsapp, FaTelegram, FaFacebook,  FaInstagram, FaGithub } from "react-icons/fa";
import DanIcon from "./DanIcon";




export default function Footer() {
  return (
    <footer className="bg-blue-50 dark:bg-blue-900 border-t border-blue-200 dark:border-blue-700 mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src="/dan-softwares.png" 
                alt="Explore Movie Logo" 
                width={40} 
                height={40} 
                className="rounded mr-3"
              />
              <h3 className="text-2xl font-bold">
                <span className="text-yellow-500">Explore</span> Movie
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
              Discover, explore, and enjoy the world of cinema. Find your next favorite movie with our comprehensive database.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/dan16son" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="t.me/living_guy" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors">
               <FaTelegram size={20} />
              </a>
              <a href="https://www.instagram.com/_dan_el/" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/251945012123" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors">
                <FaWhatsapp size={20} />
              </a>
              
             
            </div>
          </div>

          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors text-sm">
                  Trending Movies
                </Link>
              </li>
              <li>
                <Link href="/rating" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors text-sm">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link href="/genre" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors text-sm">
                  Browse by Genre
                </Link>
              </li>
              <li>
                <Link href="/trailor" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors text-sm">
                  Movie Trailers
                </Link>
              </li>
            </ul>
          </div>

          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Popular Genres</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/genre/action" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors text-sm">
                  Action
                </Link>
              </li>
              <li>
                <Link href="/genre/comedy" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors text-sm">
                  Comedy
                </Link>
              </li>
              <li>
                <Link href="/genre/drama" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors text-sm">
                  Drama
                </Link>
              </li>
              <li>
                <Link href="/genre/thriller" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors text-sm">
                  Thriller
                </Link>
              </li>
              <li>
                <Link href="/genre/science-fiction" className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors text-sm">
                  Sci-Fi
                </Link>
              </li>
            </ul>
          </div>

          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Get in Touch</h4>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <p>Have questions or suggestions?</p>
              <p>We'd love to hear from you!</p>
              <div className="mt-4">
                <a 
                  href="mailto:da16gi@gmail.com" 
                  className="text-yellow-500 hover:text-yellow-600 transition-colors"
                >
                  da16gi@gmail.com
                </a>
              </div>
            </div>
            <DanIcon/>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-200 dark:border-blue-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                © {new Date().getFullYear()} Explore Movie. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
              <Link href="/privacy" className="hover:text-yellow-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-yellow-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/about" className="hover:text-yellow-500 transition-colors">
                About Us
              </Link>
            </div>

            <div className="flex items-center mt-4 md:mt-0">
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                Made with <Heart size={16} className="text-red-500 mx-1" /> by Dan Softwares
              </p>
              <a 
                href="https://github.com/dan-seng" 
                className="ml-3 text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}