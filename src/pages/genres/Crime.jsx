import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const Crime = () => {
  const genreId = getGenreId('crime');
  return <Genre genreName="Crime" genreId={genreId} />;
};

export default Crime;
