// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  field: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'API_BEGIN':
    return {
      ...state,
    };
  case 'API_SUCCESS':
    return {
      ...state,
      currencies: action.state,
    };
  case 'API_ERROR':
    return {
      ...state,
      error: action.error,
    };
  case 'SAVE_EXPENSES':
    console.log(action.payload);
    return {
      ...state,
      expenses: [...state.expenses,
        { ...action.payload,
          id: state.expenses.length }],
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.payload)],
    };
  case 'SUM_EXPENSES':
    return {
      ...state,
      field: state.field + action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
