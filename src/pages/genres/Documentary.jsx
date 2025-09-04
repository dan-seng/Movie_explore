import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const Documentary = () => {
  const genreId = getGenreId('documentary');
  return <Genre genreName="Documentary" genreId={genreId} />;
};

export default Documentary;
