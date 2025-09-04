import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const Animation = () => {
  const genreId = getGenreId('animation');
  return <Genre genreName="Animation" genreId={genreId} />;
};

export default Animation;
