import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <p>
          TrybeWallet
        </p>
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
