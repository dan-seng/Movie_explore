import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const Drama = () => {
  const genreId = getGenreId('drama');
  return <Genre genreName="Drama" genreId={genreId} />;
};

export default Drama;
