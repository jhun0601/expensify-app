// My Work
const getMyExpensesTotal = (expenses) => {
    let total = 0;

    for (let key in expenses) {
        total += expenses[key].amount;
    }
    return total;
};
//Trainee Work
export default (expenses) => {
    if (expenses.length === 0) {
        return 0;
    }

    return expenses
        .map((expense) => expense.amount)
        .reduce((sum, value) => sum + value, 0);
};

export { getMyExpensesTotal };
