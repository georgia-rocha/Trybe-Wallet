import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Categories extends Component {
  render() {
    const { tag, handleChange } = this.props;
    return (
      <label htmlFor="tag" className="flex w-1/2 items-center">
        Categoria da Despesa:
        <select
          data-testid="tag-input"
          id="tag"
          name="tag"
          className="container-select"
          value={ tag }
          onChange={ handleChange }
        >
          <option key="alimentação">Alimentação</option>
          <option key="lazer">Lazer</option>
          <option key="trabalho">Trabalho</option>
          <option key="transporte">Transporte</option>
          <option key="saúde">Saúde</option>
        </select>
      </label>
    );
  }
}

Categories.propTypes = {
  tag: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Categories;
