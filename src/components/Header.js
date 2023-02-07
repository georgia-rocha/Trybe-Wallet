import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      <div>
        <p data-testid="email-field">
          Email:
          { email }
        </p>
        <p data-testid="total-field">
          { this.sumExpense().toFixed(2) }
        </p>
        <p data-testid="header-currency-field">
          Moeda:
          { currencies }
        </p>
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
