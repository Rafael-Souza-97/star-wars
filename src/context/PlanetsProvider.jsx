import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');
  const [inputFilter, setInputFilter] = useState({ filterByName: { name: '' } });
  const [buttonFilters, setButtonFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filterByNumerics, setFilterByNumerics] = useState({
    filterByNumericValues: [],
  });

  async function fetchPlanets() {
    const ENDPOINT = 'https://swapi.dev/api/planets';
    setIsLoading(true);

    try {
      const response = await fetch(ENDPOINT);
      const data = await response.json();
      const { results } = data;
      const filteredResults = results.filter((item) => delete item.residents);
      setResult(filteredResults);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }

  const contextType = {
    isLoading,
    result,
    error,
    inputFilter,
    buttonFilters,
    filterByNumerics,
    setResult,
    setFilterByNumerics,
    setButtonFilters,
    setInputFilter,
    fetchPlanets,
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
