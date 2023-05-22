import React from 'react';
import thunk from 'redux-thunk';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
// import fetchMock from 'jest-fetch-mock';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import rootReducer from '../redux/reducers';
import Wallet from '../pages/Wallet';
import WalletForm from '../components/WalletForm';
// import storeRedux from '../redux/store';
// import { fetchAPI } from '../redux/actions';

const description = 'description-input';

const initialState = {
  user: { email: 'teste@teste.com' },
  wallet: {
    currencies: [],
    expenses: [
      {
        value: '',
        description: '',
        method: 'Dinheiro',
        currency: 'USD',
        tag: 'Alimentação',
        exchangeRates: mockData,
      },
    ],
    edit: false,
    idEdit: 0,
  },
};

describe('Testa a page Wallet', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue(
      { json: () => mockData },
    );
  });
  it('Testa se é possível preencher os campos', async () => {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    await act(() => renderWithRouterAndRedux(<Wallet />, { store }));
    const valueInput = screen.getByTestId('value-input');
    userEvent.type(valueInput, '25');
    expect(valueInput).toHaveValue(25);

    const descriptionInput = screen.getByTestId(description);
    userEvent.type(descriptionInput, 'compras');
    expect(descriptionInput).toHaveValue('compras');

    const moedaInput = screen.getByTestId('currency-input');
    const arrayCoins = [];
    moedaInput.childNodes.forEach((coin) => arrayCoins.push(coin.innerHTML));
    expect(arrayCoins).toEqual(Object.keys(mockData).filter((coin) => coin !== 'USDT'));
    userEvent.selectOptions(moedaInput, 'USD');
    expect(moedaInput).toHaveValue('USD');

    const method = screen.getByTestId('method-input');
    userEvent.selectOptions(method, 'Dinheiro');
    expect(method).toHaveValue('Dinheiro');

    const tag = screen.getByTestId('tag-input');
    userEvent.selectOptions(tag, 'Lazer');
    expect(tag).toHaveValue('Lazer');

    expect(store.getState().wallet.expenses).toHaveLength(1);
    const btnDespesas = screen.getByRole('button', { name: /adicionar despesa/i });
    await act(() => userEvent.click(btnDespesas));
    expect(store.getState().wallet.expenses).toHaveLength(2);
  });

  it('Testa se é possível editar os campos', async () => {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    await act(() => renderWithRouterAndRedux(<Wallet />, { store }));

    const descriptionInput = screen.getByTestId(description);
    userEvent.type(descriptionInput, 'compras');
    expect(descriptionInput).toHaveValue('compras');
    await act(() => userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i })));

    const saveBtn = screen.getAllByRole('button', { name: /editar/i });
    await act(() => userEvent.click(saveBtn[0]));
    userEvent.type(descriptionInput, 'viagem');
    expect(descriptionInput).toHaveValue('viagem');

    const editBtn = screen.getByRole('button', { name: /editar despesa/i });
    await act(() => userEvent.click(editBtn));
    expect(editBtn).toBeInTheDocument();
  });

  describe('Teste page Wallet', () => {
    afterEach(() => { jest.restoreAllMocks(); });
    it('testa se a página wallet renderiza', () => {
      renderWithRouterAndRedux(<Wallet />);
      const adcDespesas = screen.getByRole('button', { name: /adicionar despesa/i });
      expect(adcDespesas).toBeInTheDocument();
    });

    it('Testa se os campos são renderizam', () => {
      renderWithRouterAndRedux(<Wallet />);
      const value = screen.getByTestId('value-input');
      const desc = screen.getByTestId(description);
      const curr = screen.getByTestId('currency-input');
      const method = screen.getByTestId('method-input');
      const tag = screen.getByTestId('tag-input');

      expect(value).toBeInTheDocument();
      expect(desc).toBeInTheDocument();
      expect(curr).toBeInTheDocument();
      expect(method).toBeInTheDocument();
      expect(tag).toBeInTheDocument();
    });

    it('Testa o button da API', async () => {
      jest.spyOn(global, 'fetch');
      renderWithRouterAndRedux(<Wallet />);
      userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
    });

    /*   it('Testa caso de erro da API', async () => {
      fetchMock.mockReject(new Error('error'));
      const expectedActions = { type: 'API_ERROR', error: 'error' };
      storeRedux.dispatch(fetchAPI()).then(() => {
        expect(storeRedux.getActions()).toEqual(expectedActions);
      });
    }); */

    const state = {
      wallet: {
        currencies: Object.keys(mockData).filter((curr) => curr !== 'USDT'),
        expenses: [],
        edit: false,
        idEdit: 0,
      },
    };

    it('Testa o estado global de um array com as moedas da API', async () => {
      const { store } = renderWithRouterAndRedux(<WalletForm />, {
        state,
      });
      const { currencies } = store.getState().wallet;
      expect(Array.isArray(currencies)).toBeTruthy();
      expect(currencies.includes('USDT')).toBeFalsy();
    });
  });
});
