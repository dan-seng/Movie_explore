import { Link } from "@heroui/react";
import { Facebook, Instagram, Github, Heart, Linkedin } from "lucide-react";
import { FaWhatsapp, FaTelegram } from "react-icons/fa";
import DanIcon from "./DanIcon";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-14">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src="/dan-softwares.png"
                alt="Explore Movie Logo"
                width={48}
                height={48}
                className="rounded-lg shadow-md"
              />
              <p className="font-bold text-2xl ml-3">
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Explore
                </span>
                <span className="text-gray-800 dark:text-white"> Movie</span>
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
              Discover and enjoy the world of cinema. Find your next favorite
              movie with our comprehensive database.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook size={20} />, href: "https://www.facebook.com/dan16son", label: 'Facebook' },
                { icon: <FaTelegram size={20} />, href: "t.me/living_guy", label: 'Telegram' },
                { icon: <Instagram size={20} />, href: "https://www.instagram.com/_dan_el/", label: 'Instagram' },
                { icon: <FaWhatsapp size={20} />, href: "https://wa.me/251945012123", label: 'WhatsApp' },
                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/daniel-gidey-40497337a/", label: 'LinkedIn' }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-gradient-to-r from-blue-600 to-purple-600">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Trending', href: '/' },
                { name: 'Rating', href: '/rating' },
                { name: 'Genre', href: '/genre' },
                { name: 'Trailer', href: '/trailer' }
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Genres */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-gradient-to-r from-blue-600 to-purple-600">
              Genres
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Action', 'Comedy', 'Drama', 'Thriller', 'Sci-Fi', 'Horror', 'Romance', 'Adventure'].map((genre, index) => (
                <Link
                  key={index}
                  href={`/genre/${genre.toLowerCase()}`}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-200"
                >
                  {genre}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-12 after:bg-gradient-to-r from-blue-600 to-purple-600">
              Contact
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <a
              href="mailto:da16gi@gmail.com"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors mt-2"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              da16gi@gmail.com
            </a>
            <div className="mt-4">
              <DanIcon />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-700 dark:text-gray-200">ExploreMovie</span>. All rights reserved.
          </p>

          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              About Us
            </Link>
          </div>

          <div className="mt-4 md:mt-0 flex items-center">
            <p className="flex items-center text-sm">
              Made with <Heart size={14} className="text-red-500 mx-1 animate-pulse" /> by
              <span className="ml-1 font-medium text-gray-700 dark:text-gray-200">Dan Softwares</span>
            </p>
            <a
              href="https://github.com/dan-seng"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
