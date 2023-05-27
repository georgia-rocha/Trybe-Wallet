import React from 'react';
import { connect } from 'react-redux';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div className="h-full w-screen">
        <WalletForm />
        <Table />
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
