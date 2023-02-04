import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    field: 0,
    currencies: 'BRL',
  };

  render() {
    const { email } = this.props;
    const { field, currencies } = this.state;
    return (
      <div>
        <p data-testid="email-field">
          Email:
          { email }
        </p>
        <p data-testid="total-field">{ field }</p>
        <p data-testid="header-currency-field">{ currencies }</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
