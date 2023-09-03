import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Search() {
  const {
    data,
    searchInput,
    setSearchInput,
    setFilterData } = useContext(StarWarsContext);

  const handleChange = ({ target: { value } }) => {
    setSearchInput(value);
    const planets = data.filter((item) => item.name.toLowerCase()
      .includes(value.toLowerCase()));
    setFilterData(planets);
  };

  return (
    <input
      type="text"
      id="searchInput"
      placeholder="Digite o termo"
      value={ searchInput }
      onChange={ handleChange }
      data-testid="name-filter"
    />
  );
}

export default Search;
