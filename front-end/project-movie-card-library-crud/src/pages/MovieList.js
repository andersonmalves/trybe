import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.newState = this.newState.bind(this);
    this.state = {
      movies: [],
      displayLoadingMessage: true,
    }
  }

  async componentDidMount() {
    const response = await movieAPI.getMovies();
    this.newState(response);
  }

  newState(response) {
    this.setState({
      movies: response,
      displayLoadingMessage: false,
    })
  }

  render() {
    const { movies } = this.state;

    // Render Loading here if the request is still happening

    return (
      <div>
        { this.state.displayLoadingMessage ? <Loading /> :
        <div data-testid="movie-list">
          <Link to="/movies/new">ADICIONAR CARTÃO</Link>
          {movies.map((movie) => <MovieCard key={movie.title} movie={movie} />)}
        </div>
        }
      </div>
    );
  }
}

export default MovieList;
