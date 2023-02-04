import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchAPI());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="valor">
          Valor:
          <input type="number" id="valor" data-testid="value-input" />
        </label>
        <label htmlFor="descrição">
          Descrição:
          <input type="text" id="descrição" data-testid="description-input" />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select data-testid="currency-input" id="moeda" name="select">
            { currencies.map((currency, index) => (
              <option key={ index }>{currency}</option>
            )) }
          </select>
        </label>
        <label htmlFor="pagamento">
          Método de Pagamento:
          <select data-testid="method-input" id="pagamento">
            <option key="dinheiro">Dinheiro</option>
            <option key="cart_cred">Cartão de crédito</option>
            <option key="cart_deb">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="despesa">
          Despesas:
          <select data-testid="tag-input" id="despesa">
            <option key="alimentação">Alimentação</option>
            <option key="lazer">Lazer</option>
            <option key="trabalho">Trabalho</option>
            <option key="transporte">Transporte</option>
            <option key="saúde">Saúde</option>
          </select>
        </label>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
