import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, START_EDIT } from '../redux/actions';

class Table extends Component {
  handleStartEdit = (id) => {
    const { dispatch } = this.props;
    dispatch({ type: START_EDIT, payload: id });
  };

  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{parseFloat(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td>
                {parseFloat(expense.value * expense.exchangeRates[expense.currency].ask)
                  .toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  onClick={ () => this.handleStartEdit(expense.id) }
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  onClick={ () => dispatch(deleteExpense(expense.id)) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
