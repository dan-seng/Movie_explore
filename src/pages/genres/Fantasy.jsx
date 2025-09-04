import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const Fantasy = () => {
  const genreId = getGenreId('fantasy');
  return <Genre genreName="Fantasy" genreId={genreId} />;
};

export default Fantasy;
