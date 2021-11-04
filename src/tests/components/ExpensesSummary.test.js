import React from "react";
import { shallow } from "enzyme";

import { ExpensesSummary } from "../../components/ExpensesSummary";

test("Should correctly render ExpenseSummary with 1 expense", () => {
    const wrapper = shallow(
        <ExpensesSummary expenseCount={1} expensesTotal={1316546} />
    );
    expect(wrapper).toMatchSnapshot();
});

test("Should correctly render ExpenseSummary with multiple expenses", () => {
    const wrapper = shallow(
        <ExpensesSummary expenseCount={1} expensesTotal={1316546} />
    );
    expect(wrapper).toMatchSnapshot();
});
