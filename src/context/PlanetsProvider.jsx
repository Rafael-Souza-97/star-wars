import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
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

  useEffect(() => {
    let mount = true;
    async function fetchPlanets() {
      const ENDPOINT = 'https://swapi.dev/api/planets';
      if (mount) {
        try {
          const response = await fetch(ENDPOINT);
          const data = await response.json();
          const { results } = data;
          const filteredResults = results.filter((item) => delete item.residents);
          mount = false;
          return setResult(filteredResults);
        } catch (err) {
          setError(err);
        }
      }
    }
    fetchPlanets();
    return () => {
      if (!mount) return console.log('entrou');
    };
  }, []);

  const contextType = {
    result,
    error,
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
