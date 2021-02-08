import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpensesToStore } from '../actions';
import FetchAPI from '../services';

class Expenses extends React.Component {
  constructor() {
    super();

    this.state = {
      id: '',
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    // const resultado = await FetchAPI();

    const { addExpenses } = this.props;

    const { id } = this.state;
    const zero = 0;
    if (id === '') {
      this.setState({
        id: zero,
        exchangeRates: await FetchAPI(),
      });
    } else {
      this.setState({
        id: id + 1,
        exchangeRates: await FetchAPI(),
      });
    }

    addExpenses(this.state);

    this.setState({
      id: '',
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editMode } = this.props; // , expenses, expenseIdToEdit
    // expenses[expenseIdToEdit]);

    return (
      <div className="bg-dark">
        <form>
          <label className="text-white form-label" htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleChange }
              className="form-control"
              data-testid="value-input"
            />
          </label>
          <label className="text-white form-label" htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChange }
              className="form-control"
              data-testid="description-input"
            />
          </label>
          <label className="text-white form-label" htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
              className="form-control"
              data-testid="currency-input"
            >
              { currencies.map((item) => (
                <option value={ item } key={ item } data-testid={ item }>{ item }</option>
              )) }
            </select>
          </label>
          <label className="text-white form-label" htmlFor="method">
            Método de Pagamento:
            <select
              name="method"
              id="method"
              value={ method }
              onChange={ this.handleChange }
              className="form-control"
              data-testid="method-input"
            >
              <option value="Dinheiro" key="Dinheiro">Dinheiro</option>
              <option
                value="Cartão de crédito"
                key="Cartão de crédito"
              >
                Cartão de crédito
              </option>
              <option
                value="Cartão de débito"
                key="Cartão de débito"
              >
                Cartão de débito
              </option>
            </select>
          </label>
          <label className="text-white form-label" htmlFor="tag">
            Tag:
            <select
              name="tag"
              id="tag"
              value={ tag }
              onChange={ this.handleChange }
              className="form-control"
              data-testid="tag-input"
            >
              <option value="Alimentação" key="Alimentação">Alimentação</option>
              <option value="Lazer" key="Lazer">Lazer</option>
              <option value="Trabalho" key="Trabalho">Trabalho</option>
              <option value="Transporte" key="Transporte">Transporte</option>
              <option value="Saúde" key="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
            className={ editMode ? 'btn btn-danger' : 'btn btn-primary' }
          >
            { editMode ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editMode: state.wallet.editMode,
  expenseIdToEdit: state.wallet.expenseIdToEdit,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (expense) => dispatch(addExpensesToStore(expense)),
});

Expenses.propTypes = {
  addExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf.isRequired,
  editMode: PropTypes.bool.isRequired,
  expenses: PropTypes.objectOf.isRequired,
  expenseIdToEdit: PropTypes.string.isRequired,
};

// export default Expenses;
export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
