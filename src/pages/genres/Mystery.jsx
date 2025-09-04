import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const Mystery = () => {
  const genreId = getGenreId('mystery');
  return <Genre genreName="Mystery" genreId={genreId} />;
};

export default Mystery;
