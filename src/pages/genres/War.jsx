import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const War = () => {
  const genreId = getGenreId('war');
  return <Genre genreName="War" genreId={genreId} />;
};

export default War;
