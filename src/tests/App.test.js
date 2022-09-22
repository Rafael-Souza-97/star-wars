import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import testData from '../../cypress/mocks/testData';

const CENTO_E_TRINTA = 130;

describe('Teste a aplicação StarWars"', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(testData),
    });
  });

  test('Testa o mock da API', async () => {
    render(<App />);
    const url = 'https://swapi.dev/api/planets';

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(url);
  });

  test('Testa se exite o Título StarWars esta presente na aplicação', () => {
    render(<App />);
    const title = screen.getByRole('heading', { level: 1, name: /starwars/i });
    expect(title).toBeInTheDocument();
  });

  test('Testa se exite o campo de input na aplicação', () => {
    render(<App />);

    const inputText = screen.getByTestId(/name-filter/i);
    expect(inputText).toBeInTheDocument();
    expect(inputText).toHaveProperty('value', '');

    userEvent.type(inputText, 'Coruscant');
    expect(inputText).toHaveProperty('value', 'Coruscant');
  });

  test('Testa se exite o campo de colunas na aplicação', () => {
    render(<App />);
    const columnSelect = screen.getByTestId(/column-filter/i);
    expect(columnSelect).toBeInTheDocument();
  });

  test('Testa se exite o campo de comparação na aplicação', () => {
    render(<App />);
    const comparisonSelect = screen.getByTestId(/comparison-filter/i);
    expect(comparisonSelect).toBeInTheDocument();
  });

  test('Testa se exite o campo de input (number) na aplicação', () => {
    render(<App />);
    const numberInput = screen.getByTestId(/value-filter/i);
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveProperty('value', '0');

    userEvent.clear(numberInput);
    userEvent.type(numberInput, '1000');
    expect(numberInput).toHaveProperty('value', '1000');
  });

  test('Testa se exite o botão "Filtrar" ao iniciar a aplicação', () => {
    render(<App />);
    const filterButton = screen.getByRole('button', { name: /Filtrar/i });
    expect(filterButton).toBeInTheDocument();
  });

  test('Testa se exite uma tabela na aplicação', async () => {
    render(<App />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const cell = await screen.findAllByRole('cell');
    expect(cell).toHaveLength(CENTO_E_TRINTA);
  });

  test('Testa se exite o header da tabela na aplicação', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Name/i)).toBeInTheDocument();
      expect(screen.getByText(/Terrain/i)).toBeInTheDocument();
      expect(screen.getByText(/URL/i)).toBeInTheDocument();
    });
  });

  test('Testa se exite o body da tabela na aplicação', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
      expect(screen.getByText(/Dagobah/i)).toBeInTheDocument();
      expect(screen.getByText(/Kamino/i)).toBeInTheDocument();
    });
  });

  test('Testa o filtro input na aplicação', async () => {
    render(<App />);

    const inputText = screen.getByTestId(/name-filter/i);
    expect(inputText).toBeInTheDocument();
    userEvent.type(inputText, 'oo');

    await waitFor(() => {
      expect(screen.getByText(/Naboo/i)).toBeInTheDocument();
    });
  });

  test('Testa todos os filtros', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
      expect(screen.getByText(/Kamino/i)).toBeInTheDocument();
    });

    // teste 1:
    const columnSelect = screen.getByTestId(/column-filter/i);
    expect(columnSelect).toBeInTheDocument();
    userEvent.selectOptions(columnSelect, 'rotation_period');
    const comparisonSelect = screen.getByTestId(/comparison-filter/i);
    expect(comparisonSelect).toBeInTheDocument();
    userEvent.selectOptions(comparisonSelect, 'maior que');
    const numberInput = screen.getByTestId(/value-filter/i);
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveProperty('value', '0');
    userEvent.clear(numberInput);
    userEvent.type(numberInput, '15');
    const filterButton = screen.getByRole('button', { name: /Filtrar/i });
    expect(filterButton).toBeInTheDocument();
    userEvent.click(filterButton);
    await waitFor(() => {
      expect(screen.getByText(/Alderaan/i)).toBeInTheDocument();
    });

    // teste 2:
    userEvent.selectOptions(columnSelect, 'diameter');
    userEvent.selectOptions(comparisonSelect, 'menor que');
    userEvent.clear(numberInput);
    userEvent.type(numberInput, '1000');
    userEvent.click(filterButton);

    // teste 3:
    userEvent.selectOptions(columnSelect, 'surface_water');
    userEvent.selectOptions(comparisonSelect, 'igual a');
    userEvent.clear(numberInput);
    userEvent.type(numberInput, '40');
    userEvent.click(filterButton);
  });

  test('Testa filtro "Igual a" (pela segunda vez)', async () => {
    render(<App />);

    const columnSelect = screen.getByTestId(/column-filter/i);
    expect(columnSelect).toBeInTheDocument();
    userEvent.selectOptions(columnSelect, 'population');
    const comparisonSelect = screen.getByTestId(/comparison-filter/i);
    expect(comparisonSelect).toBeInTheDocument();
    userEvent.selectOptions(comparisonSelect, 'igual a');
    const numberInput = screen.getByTestId(/value-filter/i);
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveProperty('value', '0');
    userEvent.clear(numberInput);
    userEvent.type(numberInput, '6000000');
    const filterButton = screen.getByRole('button', { name: /Filtrar/i });
    expect(filterButton).toBeInTheDocument();
    userEvent.click(filterButton);
    await waitFor(() => {
      expect(screen.getByText(/Bespin/i)).toBeInTheDocument();
    });
  });
});
