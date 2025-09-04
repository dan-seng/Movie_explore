import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const Western = () => {
  const genreId = getGenreId('western');
  return <Genre genreName="Western" genreId={genreId} />;
};

export default Western;
