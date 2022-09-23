import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [result, setResult] = useState([]);
  const [inputFilter, setInputFilter] = useState({ filterByName: { name: '' } });
  const [buttonFilters, setButtonFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filterByNumerics, setFilterByNumerics] = useState({
    filterByNumericValues: [],
  });

  useEffect(() => {
    async function fetchPlanets() {
      const ENDPOINT = 'https://swapi.dev/api/planets';
      const response = await fetch(ENDPOINT);
      const data = await response.json();
      const { results } = data;
      const filteredResults = results.filter((item) => delete item.residents);
      return setResult(filteredResults);
    }
    fetchPlanets();
  }, []);

  const contextType = {
    result,
    inputFilter,
    buttonFilters,
    filterByNumerics,
    setResult,
    setFilterByNumerics,
    setButtonFilters,
    setInputFilter,
  };

  return (
    <PlanetsContext.Provider value={ contextType }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
