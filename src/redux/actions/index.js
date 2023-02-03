// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const saveInfos = (email) => ({
  type: LOGIN,
  payload: email,
});

export const WALLET = 'WALLET';

export const saveWallet = () => ({
  type: WALLET,
});
