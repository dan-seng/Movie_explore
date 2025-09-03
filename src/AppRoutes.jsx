import { Route, Routes } from "react-router-dom";
import Trending from "./pages/Trending";
import Rating from "./pages/Rating";
import Genre from "./pages/Genre";
import Trailors from "./pages/Trailors";
import MovieDetail from "./pages/MovieDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Trending />} />
      <Route path="/rating" element={<Rating />} />
      <Route path="/genre" element={<Genre />} />
      <Route path="/trailor" element={<Trailors />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
}
    