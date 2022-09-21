import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const {
    fetchPlanets,
    result,
    error,
    inputFilter,
    setInputFilter,
    isLoading,
  } = useContext(PlanetsContext);

  const filteredPlanetsInput = result.filter((planet) => planet.name.toLowerCase()
    .includes(inputFilter.filterByName.name.toLowerCase()));

  useEffect(() => {
    async function getPlanets() {
      const fetch = await fetchPlanets();
      return fetch;
    }
    getPlanets();
  }, []);

  function handleChange({ target }) {
    setInputFilter({ filterByName: { name: target.value } });
  }

  return (
    <>
      <section>
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
      </section>
      <br />
      <hr />
      <br />
      { isLoading ? (
        '⌛️'
      ) : (
        <section>
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
        </section>
      )}

      {error && (
        <p>
          Erro:
          {error}
        </p>
      )}
    </>
  );
}

export default Table;
