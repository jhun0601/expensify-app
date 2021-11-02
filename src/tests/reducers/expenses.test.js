import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("Should set default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("Should set remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("Should not remove expense if id not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "10",
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("Should add an expense", () => {
  const expense = {
    id: "101",
    description: "Loan",
    note: "payment for house",
    createdAt: 1500,
    amount: 29500,
  };

  const action = {
    type: "ADD_EXPENSE",
    expense,
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test("Should edit an expense", () => {
  const amount = 12500;
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[1].id,
    updates: { amount },
  };

  const state = expensesReducer(expenses, action);
  expect(state[1].amount).toBe(amount);
});

test("Should not edit an expense if id not found", () => {
  const amount = 12500;
  const action = {
    type: "EDIT_EXPENSE",
    id: "-10",
    updates: { amount },
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
