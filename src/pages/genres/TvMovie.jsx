import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const TvMovie = () => {
  const genreId = getGenreId('tv movie');
  return <Genre genreName="TV Movie" genreId={genreId} />;
};

export default TvMovie;
