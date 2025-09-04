import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const Romance = () => {
  const genreId = getGenreId('romance');
  return <Genre genreName="Romance" genreId={genreId} />;
};

export default Romance;
