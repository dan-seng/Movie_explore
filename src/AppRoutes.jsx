import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Trending from "./pages/Trending";
import Rating from "./pages/Rating";
import Genre from "./pages/Genre";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/rating" element={<Rating />} />
      <Route path="/genre" element={<Genre />} />
    </Routes>
  );
}
    