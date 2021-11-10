import React from "react";
import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";

const addExpense = ({
    description = "",
    note = "",
    amount = 0,
    createdAt = 0,
} = {}) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt,
    },
});

const removeExpense = ({ id } = {}) => ({
    type: "REMOVE_EXPENSE",
    id,
});

const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates,
});

//filter

const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text,
});

//sort

const sortByDate = () => ({
    type: "SORT_BY_DATE",
});

const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT",
});

const setStartDate = (start_date = undefined) => ({
    type: "SET_START_DATE",
    start_date,
});

const setEndDate = (end_date = undefined) => ({
    type: "SET_END_DATE",
    end_date,
});

const expensesReducerDefaultState = [];
const filtersReducerDefaultState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined,
};
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            return [...state, action.expense];
        case "REMOVE_EXPENSE":
            return state.filter(({ id }) => id !== action.id);
        case "EDIT_EXPENSE":
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return { ...expense, ...action.updates };
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text: action.text,
            };
        case "SORT_BY_AMOUNT":
            return {
                ...state,
                sortBy: "amount",
            };
        case "SORT_BY_DATE":
            return {
                ...state,
                sortBy: "date",
            };
        case "SET_START_DATE":
            return {
                ...state,
                startDate: action.start_date,
            };
        case "SET_END_DATE":
            return {
                ...state,
                endDate: action.end_date,
            };
        default:
            return state;
    }
};

// get visible expenses

const getVisibleExpense = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses
        .filter((expense) => {
            // const startDateMatch  = typeof startDate !== 'number' || expense.createdAt >= startDate;
            // const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
            // const textMatch;
            const startDateMatch =
                typeof startDate !== "number" || expense.createdAt >= startDate;
            const endDateMatch =
                typeof endDate !== "number" || expense.createdAt <= endDate;
            const textMatch = expense.description
                .toLowerCase()
                .includes(text.toLowerCase());
            return startDateMatch && endDateMatch && textMatch;
        })
        .sort((a, b) => {
            if (sortBy === "date") {
                return a.createdAt < b.createdAt ? 1 : -1;
            }
            if (sortBy === "amount") {
                return a.amount < b.amount ? 1 : -1;
            }
        });
};

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
    })
);

store.subscribe(() => {
    const state = store.getState();
    const VisibleExpense = getVisibleExpense(state.expenses, state.filters);
    console.log(VisibleExpense);
});

const expenseOne = store.dispatch(
    addExpense({ description: "Rent", amount: 100, createdAt: -21000 })
);
const expenseTwo = store.dispatch(
    addExpense({ description: "Coffee", amount: 300, createdAt: -1000 })
);
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 600 }));

// store.dispatch(setTextFilter("Rent"));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(-2000));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));
const demoState = {
    expense: [
        {
            id: 1,
            description: "january Rent",
            note: "this is a january payment",
            amount: "5000",
            createdAt: 0,
        },
    ],
    filters: {
        text: "rent",
        sortBy: "amount",
        startDate: undefined,
        endDate: undefined,
    },
};
