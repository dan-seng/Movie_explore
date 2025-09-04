# 🎬 Movie Explorer

A modern, responsive movie discovery application built with React and powered by the TMDB API. Explore trending movies, search by genre, view movie details, and more.

![Movie Explorer Screenshot](./public/screenshot.png)

## ✨ Features

- 🎥 Browse trending movies
- 🔍 Search and filter movies by genre
- ⭐ View movie details including ratings and cast
- 🎬 Watch movie trailers
- 🌓 Dark/Light mode support
- 📱 Fully responsive design
- 🎭 Intuitive genre navigation with default Action genre loading
- 🎞️ Comprehensive movie genre coverage (Action, Comedy, Drama, Documentary, etc.)

## 🛠️ Technologies Used

- ⚡ [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- ⚛️ [React 18](https://reactjs.org/) - JavaScript library for building user interfaces
- 🎨 [HeroUI](https://heroui.com/) - Beautiful, responsive UI components
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- 🎞️ [Framer Motion](https://www.framer.com/motion/) - Animation library
- 🔄 [React Router v6](https://reactrouter.com/) - Client-side routing with nested routes
- 📡 [Axios](https://axios-http.com/) - HTTP client
- 🎬 [TMDB API](https://www.themoviedb.org/documentation/api) - Movie and TV show data
- 🎞️ [Swiper](https://swiperjs.com/) - Touch slider component
- 🌗 [next-themes](https://github.com/pacocoursey/next-themes) - Theme management
- 🚀 [React Icons](https://react-icons.github.io/react-icons/) - Popular icons for React apps

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- TMDB API key (get it from [TMDB](https://www.themoviedb.org/settings/api))

### Environment Setup

1. Create a `.env` file in the root directory
2. Add your TMDB API key:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movie-explorer.git
   cd movie-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory and add your TMDB API key:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API services and utilities
├── styles/        # Global styles
└── App.jsx        # Main application component
```

## 🛠 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themovied.com) for the movie data
- [HeroUI](https://heroui.com) for the beautiful UI components
- All the amazing open-source libraries used in this project
