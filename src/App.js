import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import * as api from './api';

function MovieDetails(props) {
  const [movie, setMovie] = React.useState(null);
  React.useEffect(() => {
    api.getMovie(props.match.params.id).then(details => setMovie(details));
  });

  if (!movie) {
    return <Spinner />;
  }
  return (
    <div>
      <div
        className="movie-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
        }}
      >
        <h2>{movie.title}</h2>
      </div>
      <div className="movie-details">
        <p className="lead-paragraph">{movie.overview}</p>
        <dl>
          <dt>⏱ Released</dt>
          <dd>
            {formatDistanceToNow(new Date(movie.release_date), {
              addSuffix: true,
            })}
          </dd>
          <dt>⏱ Runtime</dt>
          <dd>{movie.runtime} minutes</dd>
          <dt>💸 Budget</dt>
          <dd>${movie.budget}</dd>
          <dt>💰 Revenue</dt>
          <dd>${movie.revenue}</dd>
        </dl>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div className="spinner" aria-label="Please wait">
      🎬
    </div>
  );
}

function MovieList() {
  const [movies, setMovies] = React.useState(null);
  React.useEffect(() => {
    api.getMovies().then(movieList => setMovies(movieList));
  }, []);

  if (!movies) {
    return <Spinner />;
  }
  return (
    <ul className="movie-list">
      {movies.map(movie => (
        <li className="movie-list-item" key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
            <figure>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <figcaption>{movie.title}</figcaption>
            </figure>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="site-header">
          <h1>
            <Link to="/">movie.ninja</Link>
          </h1>
        </header>
        <main className="site-content">
          <Route path="/" exact component={MovieList} />
          <Route path="/movie/:id" exact component={MovieDetails} />
        </main>
        <footer className="site-footer">
          Live coded at UiO in {new Date().getFullYear()}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
