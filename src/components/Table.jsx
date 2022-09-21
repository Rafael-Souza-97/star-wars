import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const {
    fetchPlanets,
    result,
    inputFilter,
    buttonFilters,
    setResult,
    setInputFilter,
    setButtonFilters,
    setFilterByNumerics,
  } = useContext(PlanetsContext);

  useEffect(() => {
    async function getPlanets() {
      const fetch = await fetchPlanets();
      return fetch;
    }
    getPlanets();
  }, []);

  const handleChange = ({ target }) => {
    setInputFilter({ filterByName: { name: target.value } });
  };

  const handleFilters = ({ target }) => {
    const { name, value } = target;

    setButtonFilters({
      ...buttonFilters,
      [name]: value,
    });
  };

  useEffect(() => {
    setFilterByNumerics({
      filterByNumericValues: [buttonFilters],
    });
  }, [buttonFilters]);

  let filteredPlanetsInput = result.filter((planet) => planet.name.toLowerCase()
    .includes(inputFilter.filterByName.name.toLowerCase()));

  const handleClick = () => {
    const { column, comparison, value } = buttonFilters;
    if (comparison === 'maior que') {
      filteredPlanetsInput = result
        .filter((item) => Number(item[column]) > Number(value));
    }
    if (comparison === 'menor que') {
      filteredPlanetsInput = result
        .filter((item) => Number(item[column]) < Number(value));
    }
    if (comparison === 'igual a') {
      filteredPlanetsInput = result
        .filter((item) => Number(item[column]) === Number(value));
    }
    setResult(filteredPlanetsInput);
  };

  return (
    <>
      <div>
        <label htmlFor="inputFilter">
          <input
            type="text"
            id="inputFilter"
            name="inputFilter"
            value={ inputFilter.name }
            onChange={ handleChange }
            data-testid="name-filter"
          />
        </label>
      </div>

      <div>
        <label htmlFor="column">
          <select
            id="column"
            name="column"
            value={ buttonFilters.column }
            onChange={ handleFilters }
            data-testid="column-filter"
          >
            <option defaultValue value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
      </div>

      <div>
        <label htmlFor="comparisonFilter">
          <select
            id="comparisonFilter"
            name="comparison"
            value={ buttonFilters.comparison }
            onChange={ handleFilters }
            data-testid="comparison-filter"
          >
            <option defaultValue value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
      </div>

      <div>
        <label htmlFor="numberInput">
          <input
            type="number"
            id="numberInput"
            name="value"
            value={ buttonFilters.value }
            onChange={ handleFilters }
            data-testid="value-filter"
          />
        </label>
      </div>

      <div>
        <button
          type="submit"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { filteredPlanetsInput.map((planet, index) => (
            <tr key={ index }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          )) }
        </tbody>
      </table>
    </>
  );
}

export default Table;
