import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testando a page de Login', () => {
  it('Testa se a página renderiza os inputs de email, senha e botão na tela', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toBeInTheDocument();
  });
  it('Testa de o botão começa desabilitado e depois de iserido os dados ele se habilita e a page é direcionada para rota /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toBeDisabled();

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputEmail, 'exemplo@exemplo.com');
    userEvent.type(inputPassword, '123456');
    expect(button).not.toBeDisabled();
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
