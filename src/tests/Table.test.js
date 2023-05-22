import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Table from '../components/Table';
import mockData from './helpers/mockData';
import * as actions from '../redux/actions/index';

describe('Testa o componente Table', () => {
  const initialState = {
    wallet: {
      currencies: Object.keys(mockData),
      expenses: [
        {
          id: 0,
          value: '25',
          description: 'descrição',
          currency: 'USD',
          method: 'Cartão de crédito',
          tag: 'Saúde',
          exchangeRates: mockData,
        },
      ],
    },
  };
  it('Testa se as colunas da Table são renderiza', () => {
    renderWithRouterAndRedux(<Table />, { initialState });

    const description = screen.queryByRole('columnheader', { name: /descrição/i });
    const tag = screen.queryByRole('columnheader', { name: /tag/i });
    const method = screen.queryByRole('columnheader', { name: /método de pagamento/i });
    const value = screen.queryByRole('columnheader', { name: /^valor$/i });
    const currency = screen.queryByRole('columnheader', { name: /^moeda$/i });
    const exchangeRates = screen.queryByRole('columnheader', { name: /câmbio utilizado/i });
    const valueConvertido = screen.queryByRole('columnheader', { name: /valor convertido/i });
    const moeda = screen.queryByRole('columnheader', { name: /moeda de conversão/i });
    const editRemove = screen.queryByRole('columnheader', { name: /editar\/excluir/i });

    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(exchangeRates).toBeInTheDocument();
    expect(valueConvertido).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
    expect(editRemove).toBeInTheDocument();
  });

  it('testa o butão deletar', async () => {
    const spyOnBtn = jest.spyOn(actions, 'deleteExpense');
    renderWithRouterAndRedux(<Table />, { initialState });
    const removeBtn = screen.getAllByRole('button', { name: /remover/i })[0];
    expect(removeBtn).toBeInTheDocument();
    userEvent.click(removeBtn);
    expect(removeBtn).not.toBeInTheDocument();
    expect(spyOnBtn).toHaveBeenCalled();
  });

  it('testa se o butão de editar está funcionando', async () => {
    // const spyOnBtn = jest.spyOn(actions, 'startEdit');
    renderWithRouterAndRedux(<Table />, { initialState });
    const editBtn = screen.getAllByRole('button', { name: /editar/i })[0];
    userEvent.click(editBtn);
    expect(editBtn).toBeInTheDocument();
  });
});
