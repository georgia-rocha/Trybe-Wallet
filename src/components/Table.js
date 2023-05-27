import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, START_EDIT } from '../redux/actions';
import editar from '../adc.svg';
import remove from '../remove.svg';

class Table extends Component {
  handleStartEdit = (id) => {
    const { dispatch } = this.props;
    dispatch({ type: START_EDIT, payload: id });
  };

  render() {
    const { expenses, dispatch } = this.props;
    return (
      <div className="container-table">
        <table className="text-white">
          <thead className="mt-60 text-sm">
            <tr>
              <th className="th">Descrição</th>
              <th className="th">Tag</th>
              <th className="th">Método de pagamento</th>
              <th className="th">Valor</th>
              <th className="th">Moeda</th>
              <th className="th">Câmbio utilizado</th>
              <th className="th">Valor convertido</th>
              <th className="th">Moeda de conversão</th>
              <th className="th">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {expenses.map((expense) => (
              <tr key={ expense.id } className="border-b-2 border-white">
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
                  <div className="flex justify-center h-20">
                    <button
                      data-testid="edit-btn"
                      onClick={ () => this.handleStartEdit(expense.id) }
                    >
                      <img src={ editar } alt="editar" className="h-6 w-20" />
                    </button>
                    <button
                      data-testid="delete-btn"
                      onClick={ () => dispatch(deleteExpense(expense.id)) }
                    >
                      <img src={ remove } alt="remover" className="h-6 w-20" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
