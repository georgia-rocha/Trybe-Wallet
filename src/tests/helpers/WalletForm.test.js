import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testando o componente WalletForm', () => {
  it('Testa se header é renderizado na page wallet', () => {
    const mockState = {
      user: {
        email: 'exemplo@exemplo.com',
      },
    };
    const { getByTestId } = renderWithRouterAndRedux(<App />, {
      mockState,
      initialEntries: ['/carteira'],
    });

    const emailHeader = getByTestId('email-field');
    expect(emailHeader).toBeInTheDocument();

    const value = getByTestId('total-field');
    expect(value).toBeInTheDocument();

    const currency = getByTestId('header-currency-field');
    expect(currency).toBeInTheDocument();
  });

  it('Testa se o input de valor é renderizado na tela e se é possivel usa-lo', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });
    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();
    userEvent.type(inputValue, '25');
  });

  it('Testa se o input de descrição é renderizado na tela e se é possivel usa-lo', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });
    const inputDescription = screen.getByLabelText('Descrição:');
    expect(inputDescription).toBeInTheDocument();
    userEvent.type(inputDescription, 'comida');
  });

  it('Testa se o input selected é renderizado na tela e se é possivel escolher suas options', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });
    const select = screen.getByTestId('currency-input');
    expect(select).toBeInTheDocument();
  });

  it('Testa se o input method é renderizado na tela e se é possivel escolher suas options', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });
    const method = screen.getByTestId('method-input');
    expect(method).toBeInTheDocument();
    userEvent.click(method);
  });

  it('Testa se o input tag é renderizado na tela e se é possivel escolher suas options', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });
    const tag = screen.getByTestId('tag-input');
    expect(tag).toBeInTheDocument();
    userEvent.click(tag);
  });

  it('Testa se o botão é renderizado na tela e se é possivel click', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });
    const buttonADD = screen.getByRole('button', { name: /Adicionar despesa/i });
    expect(buttonADD).toBeInTheDocument();
    expect(buttonADD).not.toBeDisabled();
    userEvent.click(buttonADD);
  });

  it('Testa se a API é chamada no click do botão', () => {
    jest.spyOn(global, 'fetch');
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    const buttonADD = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.click(buttonADD);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('Testa se é renderizado todos o header da tabela', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });
    const headerTable = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    headerTable.forEach((header) => expect(screen.getByText(header)).toBeInTheDocument());
  });
});
