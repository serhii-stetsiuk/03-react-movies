import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import fetchMovies from '../../services/movieService';
import { type Movie } from '../../types/movie';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [clickMovie, setClickMovie] = useState<Movie | null>(null);

  const onSelect = (movie: Movie | null) => {
    setClickMovie(movie);
  };
  const handleSubmit = async (newInput: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);
      const fetchedMovie = await fetchMovies(newInput);

      if (!fetchedMovie.length) {
        toast.error('No movies found for your request.');
        return;
      }
      setMovies(fetchedMovie);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={onSelect} />}
      {clickMovie && (
        <MovieModal
          movie={clickMovie}
          onClose={() => {
            setClickMovie(null);
          }}
        />
      )}

      <Toaster />
    </div>
  );
}
