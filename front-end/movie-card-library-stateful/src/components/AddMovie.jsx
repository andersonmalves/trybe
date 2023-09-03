// implement AddMovie component here
import React from 'react';
import PropTypes from 'prop-types';

class AddMovie extends React.Component {
  constructor() {
    super();

    this.handleAddMovie = this.handleAddMovie.bind(this);
    this.addState = this.addState.bind(this);

    this.state = {
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    };
  }

  handleAddMovie(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  addState(e) {
    e.preventDefault(); // https://developer.mozilla.org/pt-BR/docs/Web/API/Event/preventDefault
    const { onClick } = this.props;
    onClick(this.state);
    this.setState({
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    });
  }

  render() {
    const {
      subtitle,
      title,
      imagePath,
      storyline,
      rating,
      genre,
    } = this.state;

    return (
      <form data-testid="add-movie-form">
        <label htmlFor="inputMovieTitle" data-testid="title-input-label">
          Título
          <input
            type="text"
            id="inputMovieTitle"
            name="title"
            value={title}
            onChange={this.handleAddMovie}
            data-testid="title-input"
          />
        </label>
        <label htmlFor="inputMovieSubtitle" data-testid="subtitle-input-label">
          Subtítulo
          <input
            type="text"
            id="inputMovieSubtitle"
            name="subtitle"
            value={subtitle}
            onChange={this.handleAddMovie}
            data-testid="subtitle-input"
          />
        </label>
        <label htmlFor="imageMovie" data-testid="image-input-label">
          Imagem
          <input
            type="text"
            id="imageMovie"
            name="imagePath"
            value={imagePath}
            onChange={this.handleAddMovie}
            data-testid="image-input"
          />
        </label>
        <label htmlFor="storylineMovie" data-testid="storyline-input-label">
          Sinopse
          <textarea
            id="storylineMovie"
            name="storyline"
            value={storyline}
            onChange={this.handleAddMovie}
            data-testid="storyline-input"
          />
        </label>
        <label htmlFor="ratingMovie" data-testid="rating-input-label">
          Avaliação
          <input
            type="number"
            id="ratingMovie"
            name="rating"
            step=".1"
            min="0"
            max="5"
            value={rating}
            onChange={this.handleAddMovie}
            data-testid="rating-input"
          />
        </label>
        <label htmlFor="genreMovie" data-testid="genre-input-label">
          Gênero
          <select
            id="genreMovie"
            name="genre"
            value={genre}
            onChange={this.handleAddMovie}
            data-testid="genre-input"
          >
            <option value="action" data-testid="genre-option">Ação</option>
            <option value="comedy" data-testid="genre-option">Comédia</option>
            <option value="thriller" data-testid="genre-option">Suspense</option>
          </select>
        </label>
        <button
          type="submit"
          onClick={this.addState}
          data-testid="send-button"
        >
          Adicionar filme
        </button>
      </form>
    );
  }
}

AddMovie.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  imagePath: PropTypes.string,
  storyline: PropTypes.string,
  genre: PropTypes.string,
  onClick: PropTypes.func,
}.isRequired;

export default AddMovie;
