import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const Family = () => {
  const genreId = getGenreId('family');
  return <Genre genreName="Family" genreId={genreId} />;
};

export default Family;
