import { Route, Routes } from "react-router-dom";
import Trending from "./pages/Trending";
import Rating from "./pages/Rating";
import Genre from "./pages/Genre";
import Trailors from "./pages/Trailors";
import MovieDetail from "./pages/MovieDetails";

// Import genre pages
import Action from "./pages/genres/Action";
import Comedy from "./pages/genres/Comedy";
import Crime from "./pages/genres/Crime";
import Documentary from "./pages/genres/Documentary";
import Drama from "./pages/genres/Drama";
import Family from "./pages/genres/Family";
import Fantasy from "./pages/genres/Fantasy";
import History from "./pages/genres/History";
import Music from "./pages/genres/Music";
import Mystery from "./pages/genres/Mystery";
import Animation from "./pages/genres/Animation";
import Horror from "./pages/genres/Horror";
import Romance from "./pages/genres/Romance";
import ScienceFiction from "./pages/genres/ScienceFiction";
import TvMovie from "./pages/genres/TvMovie";
import Thriller from "./pages/genres/Thriller";
import War from "./pages/genres/War";
import Western from "./pages/genres/Western";
import Adventure from "./pages/genres/Adventure";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Trending />} />
      <Route path="/rating" element={<Rating />} />
      <Route path="/genre" element={<Genre />} />
      <Route path="/genre/action" element={<Action />} />
      <Route path="/genre/comedy" element={<Comedy />} />
      <Route path="/genre/crime" element={<Crime />} />
      <Route path="/genre/documentary" element={<Documentary />} />
      <Route path="/genre/family" element={<Family />} />
      <Route path="/genre/fantasy" element={<Fantasy />} />
      <Route path="/genre/history" element={<History />} />
      <Route path="/genre/music" element={<Music />} />
      <Route path="/genre/mystery" element={<Mystery />} />
      <Route path="/genre/drama" element={<Drama />} />
      <Route path="/genre/animation" element={<Animation />} />
      <Route path="/genre/horror" element={<Horror />} />  
      <Route path="/genre/romance" element={<Romance />} />  
      <Route path="/genre/science-fiction" element={<ScienceFiction />} />  
      <Route path="/genre/tv-movie" element={<TvMovie />} />  
      <Route path="/genre/thriller" element={<Thriller />} />  
      <Route path="/genre/war" element={<War />} />  
      <Route path="/genre/western" element={<Western />} />  
      <Route path="/genre/adventure" element={<Adventure />} />  
      <Route path="/trailor" element={<Trailors />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
}