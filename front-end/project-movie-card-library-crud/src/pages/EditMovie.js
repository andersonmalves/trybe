import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import * as movieAPI from '../services/movieAPI';
import { MovieForm } from '../components';
import { Loading } from '../components';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      status: 'loading',
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.movieToSetState = this.movieToSetState.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await movieAPI.getMovie(id);
    this.movieToSetState(response);
  }

  movieToSetState(response) {
    this.setState({
      movie: response,
      status: '',
    });
  }

  handleSubmit(updatedMovie) {
    movieAPI.updateMovie(updatedMovie);
    this.setState({
      shouldRedirect: true,
    });
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    if (status === 'loading') {
      return <Loading />;
    }

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={movie} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default EditMovie;
