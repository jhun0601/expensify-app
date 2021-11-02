import React from "react";
import { connect } from "react-redux";
import ExpenseItemList from "./ExpenseItemList";
import selectExpenses from "../selectors/expenses";
export const ExpenseList = (props) => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.length === 0 ? (
      <p>No Expenses</p>
    ) : (
      props.expenses.map((expense) => {
        return <ExpenseItemList key={expense.id} {...expense} />;
      })
    )}
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters),
  };
};
export default connect(mapStateToProps)(ExpenseList);
