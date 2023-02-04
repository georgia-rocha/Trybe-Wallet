import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForm />
      </div>
    );
  }
}

Wallet.propTypes = {

};

const mapStateToProps = (state) => ({
  ...state.user.email,
});

export default connect(mapStateToProps)(Wallet);
