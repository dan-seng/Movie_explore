import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const Music = () => {
  const genreId = getGenreId('music');
  return <Genre genreName="Music" genreId={genreId} />;
};

export default Music;
