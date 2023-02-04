// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
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
  default:
    return state;
  }
}

export default wallet;
