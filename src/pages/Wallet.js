import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
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
