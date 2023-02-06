import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import Wallet from '../../pages/Wallet';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testando o componente WalletForm', () => {
  it('Testa se o componente renderiza os inputs e o botão', () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();

    const inputDescription = screen.getByLabelText('Descrição:');
    expect(inputDescription).toBeInTheDocument();

    const select = screen.getByTestId('currency-input');
    expect(select).toBeInTheDocument();

    const method = screen.getByTestId('method-input');
    expect(method).toBeInTheDocument();

    const tag = screen.getByTestId('tag-input');
    expect(tag).toBeInTheDocument();

    const buttonADD = screen.getByRole('button', { name: 'Adicionar despesa' });
    expect(buttonADD).toBeInTheDocument();
    userEvent.click(buttonADD);
  });
});
