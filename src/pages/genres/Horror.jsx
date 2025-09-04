import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const Horror = () => {
  const genreId = getGenreId('horror');
  return <Genre genreName="Horror" genreId={genreId} />;
};

export default Horror;
