import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    currencies: 'BRL',
  };

  render() {
    const { field, email } = this.props;
    const { currencies } = this.state;
    return (
      <div>
        <p data-testid="email-field">
          Email:
          { email }
        </p>
        <p data-testid="total-field">
          Total:
          { field.toFixed(2) }
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
  field: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expense: state.wallet.expenses,
  field: state.wallet.field,
});

export default connect(mapStateToProps)(Header);
