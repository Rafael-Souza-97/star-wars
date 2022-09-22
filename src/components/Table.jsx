import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const {
    result,
    inputFilter,
    buttonFilters,
    filterByNumerics,
    setInputFilter,
    setButtonFilters,
    setFilterByNumerics,
  } = useContext(PlanetsContext);

  const columnFilterOriginal = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  let columnFilter = columnFilterOriginal;

  columnFilter = columnFilter
    .filter((element) => !filterByNumerics.filterByNumericValues
      .find(({ column }) => element === column));

  let filteredPlanetsInput = result.filter((planet) => planet.name.toLowerCase()
    .includes(inputFilter.filterByName.name.toLowerCase()));

  filterByNumerics.filterByNumericValues.forEach(({ column, comparison, value }) => {
    filteredPlanetsInput = filteredPlanetsInput.filter((item) => {
      if (comparison === 'maior que') {
        return Number(item[column]) > Number(value);
      }
      if (comparison === 'menor que') {
        return Number(item[column]) < Number(value);
      }
      if (comparison === 'igual a') {
        return Number(item[column]) === Number(value);
      }
    });
  });

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

  const handleClick = () => {
    setFilterByNumerics((prevstate) => ({
      filterByNumericValues: [...prevstate.filterByNumericValues, buttonFilters],
    }));
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
            onChange={ handleFilters }
            data-testid="column-filter"
          >
            { columnFilter
              .map((item, index) => (
                <option key={ index } value={ item }>{ item }</option>
              ))}
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
// Refatorado com ajuda do Wayne
