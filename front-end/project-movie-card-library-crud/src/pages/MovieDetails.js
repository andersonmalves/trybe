import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.newStateFromMovie = this.newStateFromMovie.bind(this);
    this.deleteMovieFromList = this.deleteMovieFromList.bind(this);

    this.state = {
      id: 0,
      title: '',
      subtitle: '',
      storyline: '',
      rating: 0,
      imagePath: '',
      bookmarked: false,
      genre: '',
      displayLoadingMessage: true,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await movieAPI.getMovie(id);
    this.newStateFromMovie(response);
  }

  newStateFromMovie(response) {
    this.setState({
      id: response.id,
      title: response.title,
      subtitle: response.subtitle,
      storyline: response.storyline,
      rating: response.rating,
      imagePath: response.imagePath,
      bookmarked: response.bookmarked,
      genre: response.genre,
      displayLoadingMessage: false,
    });
  }

  async deleteMovieFromList() {
    const { match: { params: { id } } } = this.props;
    await movieAPI.deleteMovie(id);
  }

  render() {
    // Change the condition to check the state
    // if (true) return <Loading />;

    const { id, title, storyline, imagePath, genre, rating, subtitle } = this.state;

    return (
      <div>
        { this.state.displayLoadingMessage ? <Loading /> :
        <div data-testid="movie-details">
          <img alt="Movie Cover" src={`../${imagePath}`} />
          <p>{`Title: ${title}`}</p>
          <p>{`Subtitle: ${subtitle}`}</p>
          <p>{`Storyline: ${storyline}`}</p>
          <p>{`Genre: ${genre}`}</p>
          <p>{`Rating: ${rating}`}</p>
          <Link to="/"> VOLTAR </Link>
          <Link to={`/movies/${id}/edit`}> EDITAR </Link>
          <Link to="/" onClick={this.deleteMovieFromList}> DELETAR </Link>
        </div>
        }
      </div>
    );
  }
}

MovieDetails.protTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MovieDetails;
