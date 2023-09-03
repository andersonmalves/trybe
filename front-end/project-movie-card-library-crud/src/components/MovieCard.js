import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class MovieCard extends React.Component {
  render() {
    const {
      id,
      imagePath,
      storyline,
      title,
    } = this.props.movie;
    return (
      <div data-testid="movie-card">
        <img alt="Movie Cover" src={`../${imagePath}`} />
        <p>{title}</p>
        <p>{storyline}</p>
        <Link to={`movies/${id}`}>VER DETALHES</Link>
      </div>
    );
  }
}

MovieCard.propTypes = {
  id: PropTypes.number,
  imagePath: PropTypes.string,
  storyline: PropTypes.string,
  title: PropTypes.string,
}.isRequired;


export default MovieCard;
