import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, SAVE_EXPENSES, fetchCurrencies, EDIT_EXPENSE } from '../redux/actions';

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
      <div>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            id="value"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((coin, index) => (
              <option key={ index } value={ coin }>{coin}</option>
            )) }
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento:
          <select
            data-testid="method-input"
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option key="dinheiro">Dinheiro</option>
            <option key="cart_cred">Cartão de crédito</option>
            <option key="cart_deb">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Despesas:
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option key="alimentação">Alimentação</option>
            <option key="lazer">Lazer</option>
            <option key="trabalho">Trabalho</option>
            <option key="transporte">Transporte</option>
            <option key="saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
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
