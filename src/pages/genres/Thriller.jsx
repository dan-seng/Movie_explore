import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const Thriller = () => {
  const genreId = getGenreId('thriller');
  return <Genre genreName="Thriller" genreId={genreId} />;
};

export default Thriller;
