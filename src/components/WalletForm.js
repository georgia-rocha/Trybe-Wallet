import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, SAVE_EXPENSES, fetchCurrencies, EDIT_EXPENSE } from '../redux/actions';
import Header from './Header';
import Categories from './Categories';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Cartão de crédito',
    tag: 'Saúde',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchAPI());
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const exchangeRates = await dispatch(fetchCurrencies());
    dispatch({ type: SAVE_EXPENSES, payload: { ...this.state, exchangeRates } });
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Cartão de crédito',
      tag: 'Saúde',
    });
  };

  handleExpense = async () => {
    const { dispatch } = this.props;
    const { edit } = this.props;
    if (edit) {
      console.log(this.state);
      return dispatch({ type: EDIT_EXPENSE, payload: { ...this.state } });
    }
    this.handleClick();
  };

  render() {
    const { currencies, edit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div className="container-wallet">
        <Header />
        <div className=" div-wallet">
          <label htmlFor="description" className="w-1/2 ml-12">
            Descrição da Despesa:
            <input
              type="text"
              id="description"
              name="description"
              className="input-wallet"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <Categories handleChange={ this.handleChange } tag={ tag } />
        </div>
        <div className="div-wallet-2">
          <label htmlFor="value" className="">
            Valor:
            <input
              type="number"
              id="value"
              name="value"
              value={ value }
              className="input-value"
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="method" className="labelSelect w-1/3">
            Método de Pagamento:
            <select
              data-testid="method-input"
              id="method"
              name="method"
              value={ method }
              className="select-wallet"
              onChange={ this.handleChange }
            >
              <option key="dinheiro">Dinheiro</option>
              <option key="cart_cred">Cartão de crédito</option>
              <option key="cart_deb">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="currency" className="labelSelect w-1/3">
            Moeda:
            {'  '}
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
              className="select-wallet ml-2"
              value={ currency }
              onChange={ this.handleChange }
            >
              { currencies.map((coin, index) => (
                <option key={ index } value={ coin }>{coin}</option>
              )) }
            </select>
          </label>
        </div>
        <button
          type="button"
          className="buttonDespesa my-5"
          onClick={ () => this.handleExpense() }
        >
          {
            edit ? 'Editar despesa' : 'Adicionar Despesa'
          }
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
