import { useState, useEffect } from 'react';
import Banner from "../components/Banner";
import MovieGrid from "../components/MovieGrid";
import { getTrendingMovies } from '../services/api/movieService';
import Loading from '../components/Loading';

export default function Trending(){
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                setLoading(true);
                const data = await getTrendingMovies();
                setMovies(data);
            } catch (err) {
                console.error('Error fetching trending movies:', err);
                setError('Failed to load trending movies');
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingMovies();
    }, []);

    if (error) {
        return (
            <div className="text-center py-10 text-red-500 dark:text-red-400">
                {error}
            </div>
        );
    }

    if (loading) {
        return <Loading message="Loading trending movies..." />;
    }

    return (
        <>
            <Banner />
            <MovieGrid movies={movies} loading={loading} />
        </>
    );
}