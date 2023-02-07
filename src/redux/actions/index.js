// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const saveInfos = (email) => ({
  type: LOGIN,
  payload: email,
});

export const API_BEGIN = 'API_BEGIN';
export const apiBegin = () => ({
  type: API_BEGIN,
});

export const API_SUCCESS = 'API_SUCCESS';
export const apiSuccess = (state) => ({
  type: API_SUCCESS, state,
});

export const API_ERROR = 'API_ERROR';
export const apiError = (error) => ({
  type: API_ERROR, error,
});

export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const saveExpenses = (expense) => ({
  type: SAVE_EXPENSES,
  payload: expense,
});

export const SUM_EXPENSES = 'SUM_EXPENSES';
export const sumExpenses = (value) => ({
  type: SUM_EXPENSES,
  payload: value,
});

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export function fetchAPI() {
  return async (dispatch) => {
    try {
      const api = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(api);
      const data = Object.values(await response.json())
        .filter((moeda) => moeda.codein !== 'BRLT')
        .map((filterData) => filterData.code);
      dispatch(apiSuccess(data));
      console.log(data);
    } catch (error) {
      dispatch(apiError(error));
      console.log(error);
      return error;
    }
  };
}

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      return data;
    } catch (error) {
      dispatch(apiError(error));
      return error;
    }
  };
}
