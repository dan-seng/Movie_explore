import Genre from '../../pages/Genre';
import { getGenreId } from '../../constants/genres';

const History = () => {
  const genreId = getGenreId('history');
  return <Genre genreName="History" genreId={genreId} />;
};

export default History;
