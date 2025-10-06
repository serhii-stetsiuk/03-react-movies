import css from '../MovieModal/MovieModal.module.css';
import { type Movie } from '../../types/movie';
import { type MouseEvent, useEffect } from 'react';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose, movie]);
  const handleBackDropClose = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };
  if (movie !== null)
    return (
      <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={handleBackDropClose}
      >
        <div className={css.modal}>
          <button
            className={css.closeButton}
            aria-label="Close modal"
            onClick={onClose}
          >
            &times;
          </button>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt={movie.title}
            className={css.image}
          />
          <div className={css.content}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average}
            </p>
          </div>
        </div>
      </div>
    );
}
