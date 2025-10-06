import css from './MovieGrid.module.css';
import { type Movie } from '../../types/movie';
// import fetchMovies from '../../services/movieService';

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}
export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies
        .filter(movie => movie.backdrop_path !== null)
        .map(movie => (
          <li key={movie.id}>
            <div className={css.card} onClick={() => onSelect(movie)}>
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                alt="movie title"
                loading="lazy"
              />
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        ))}
    </ul>
  );
}
