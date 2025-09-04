import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const scienceFiction = () => {
  const genreId = getGenreId('science fiction');
  return <Genre genreName="Sci-Fi" genreId={genreId} />;
};

export default scienceFiction;
