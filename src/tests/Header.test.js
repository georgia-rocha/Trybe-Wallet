import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa componente Header', () => {
  it('testa se o email, tipo de moeda e valor total são renderizados na tela', () => {
    const initialState = {
      user: {
        email: 'teste@teste.com',
      },
    };
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState,
    });
    const email = screen.getByTestId('email-field');
    const moeda = screen.getByTestId('header-currency-field');
    const totalField = screen.getByTestId('total-field');
    expect(email).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
    expect(totalField).toHaveTextContent(/0.00/);
  });
});
