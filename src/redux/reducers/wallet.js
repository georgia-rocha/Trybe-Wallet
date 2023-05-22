// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: false,
  idEdit: 0,
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
  case 'START_EDIT':
    return {
      ...state,
      idEdit: action.payload,
      edit: true,
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.idEdit) {
          console.log(state.idEdit);
          return { ...expense, ...action.payload };
        }
        return expense;
      }),
      edit: false,
    };
  default:
    return state;
  }
}

export default wallet;
