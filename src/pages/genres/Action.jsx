import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const Action = () => {
  const genreId = getGenreId('action');
  return <Genre genreName="Action" genreId={genreId} />;
};

export default Action;
