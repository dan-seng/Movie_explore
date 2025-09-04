import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const Comedy = () => {
  const genreId = getGenreId('comedy');
  return <Genre genreName="Comedy" genreId={genreId} />;
};

export default Comedy;
