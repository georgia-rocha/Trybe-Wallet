import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import imgLogo from '../Wallet.svg';
import moeda from '../Moedas.svg';
import emailImg from '../Vector.svg';

class Header extends Component {
  state = {
    currencies: 'BRL',
  };

  sumExpense = () => {
    const { expenses } = this.props;
    return expenses.reduce((acc, curr) => (
      acc + (Number(curr.value) * Number(curr.exchangeRates[curr.currency].ask))
    ), 0);
  };

  render() {
    const { email } = this.props;
    const { currencies } = this.state;
    return (
      <div className="container-header">
        <img src={ imgLogo } alt="logoTrybe" className="w-1/3 h-12 pr-8" />
        <div className="flex w-1/3 justify-center items-center text-alura-100">
          <img src={ moeda } alt="vectorMoeda" />
          <p data-testid="total-field" className="pl-2 text-sm font-bold">
            Total de despesas:
            {' '}
            { this.sumExpense().toFixed(2) }
          </p>
          <p data-testid="header-currency-field" className="pl-2 text-sm font-bold">
            { currencies }
          </p>
        </div>
        <div className="text-emerald-500 flex w-1/3 justify-center pl-10">
          <img src={ emailImg } alt="vectorEmail" />
          <p data-testid="email-field" className="pl-2 text-sm font-bold">
            Email:
            {' '}
            { email }
          </p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
