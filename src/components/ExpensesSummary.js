import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";
import expensesTotal from "../selectors/expenses-total";
export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
    const expenseWord = expenseCount === 1 ? "expense" : "expenses";
    const formatExpenses = numeral(expensesTotal / 100).format("$0,0.00");
    return (
        <div>
            <h1>
                Viewing {expenseCount} {expenseWord} totalling {formatExpenses}
            </h1>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses),
    };
};

export default connect(mapStateToProps)(ExpensesSummary);
