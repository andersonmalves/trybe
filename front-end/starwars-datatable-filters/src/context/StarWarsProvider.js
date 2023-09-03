import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchAPI from '../services/StarWarsPlanetsAPI';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [columnFilter, setColumnFilter] = useState('');
  const [comparisonFilter, setComparisonFilter] = useState('');
  const [valueFilter, setValueFilter] = useState();
  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  const dataUpdate = async () => {
    setData(await fetchAPI());
  };

  useEffect(() => {
    dataUpdate();
  }, []);

  const context = {
    data,
    setData,
    filterData,
    setFilterData,
    searchInput,
    setSearchInput,
    filteredPlanets,
    setFilteredPlanets,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    columns,
    setColumns,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default StarWarsProvider;
