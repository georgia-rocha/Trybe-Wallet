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
        <table className="bg-blue-700 text-white rounded-lg mx-auto w-full ">
          <thead className="mt-60">
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
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id } className="border-b-2 border-white">
                <td className="py-4">{expense.description}</td>
                <td className="py-4">{expense.tag}</td>
                <td className="py-4">{expense.method}</td>
                <td className="py-4">{parseFloat(expense.value).toFixed(2)}</td>
                <td className="py-4">{expense.exchangeRates[expense.currency].name}</td>
                <td className="py-4">
                  {parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td className="py-4">
                  {parseFloat(expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}
                </td>
                <td className="py-4">Real</td>
                <td className="py-4">
                  <div className="flex justify-center h-20">
                    <button
                      data-testid="edit-btn"
                      onClick={ () => this.handleStartEdit(expense.id) }
                    >
                      <img src={ editar } alt="editar" className="h-8 w-20" />
                    </button>
                    <button
                      data-testid="delete-btn"
                      onClick={ () => dispatch(deleteExpense(expense.id)) }
                    >
                      <img src={ remove } alt="remover" className="h-8 w-20" />
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
