import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const Adventure = () => {
  const genreId = getGenreId('adventure');
  return <Genre genreName="Adventure" genreId={genreId} />;
};

export default Adventure;
