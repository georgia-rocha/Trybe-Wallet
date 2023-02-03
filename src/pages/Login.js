import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LOGIN } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  validation = () => {
    const { email, password } = this.state;
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const validateEmail = regexEmail.test(email);
    const numberSmallest = 6;
    const validatePassword = password.length >= numberSmallest;
    const valid = validateEmail && validatePassword;
    this.setState({
      isDisabled: !valid,
    });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, this.validation);
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch({ type: LOGIN, payload: { email } });
    history.push('/carteira');
  };

  render() {
    const { isDisabled, email, password } = this.state;
    return (
      <form>
        <input
          type="email"
          name="email"
          placeholder="digite seu email"
          data-testid="email-input"
          onChange={ this.handleChange }
          value={ email }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          placeholder="Digite sua senha"
          onChange={ this.handleChange }
          value={ password }
        />
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect()(Login);
