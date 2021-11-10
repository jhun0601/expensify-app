import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { onValue, ref, set } from "@firebase/database";
import db from "../../firebase/firebase";
import {
    startAddExpense,
    startRemoveExpense,
    addExpense,
    editExpense,
    removeExpense,
    setExpenses,
    startSetExpenses,
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    set(ref(db, "expenses"), expensesData).then(() => done());
    done();
});

test("Should setup remove expense action object", () => {
    const action = removeExpense({ id: "123abc" });
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "123abc",
    });
});

test("Should remove expense in firebase", (done) => {
    const store = mockStore({});
    const id = expenses[2].id;
    store
        .dispatch(startRemoveExpense({ id }))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: "REMOVE_EXPENSE",
                id,
            });
            return onValue(ref(db, `expenses/${id}`), { onlyOnce: true });
        })
        .then((snapshot) => {
            expect(snapshot.val()).toBeFalsy();
            done();
        });
    done();
});

test("Should setup edit expense action", () => {
    const action = editExpense("12356", { note: "Shie" });
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "12356",
        updates: {
            note: "Shie",
        },
    });
});

test("Should setup add expense action object with provided values", () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: expenses[2],
    });
});

test("Should add expense to database and store", (done) => {
    const store = mockStore({});
    const expenseData = {
        description: "Mouse",
        amount: 3000,
        note: "this is better",
        createdAt: 1000,
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...expenseData,
            },
        });
        onValue(ref(db, `expenses/${action[0].expense.id}`), {
            onlyOnce: true,
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
    });
    done();
});

test("Should add expense defaults to database and store", (done) => {
    const store = mockStore({});
    const expenseDefaults = {
        description: "",
        amount: 0,
        note: "",
        createdAt: 0,
    };
    store.dispatch(startAddExpense({})).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...expenseDefaults,
            },
        });
        onValue(ref(db, `expenses/${action[0].expense.id}`), {
            onlyOnce: true,
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseDefaults);
            done();
        });
    });
    done();
});

test("Should setup set expense action object with data", () => {
    const action = setExpenses(expenses);

    expect(action).toEqual({
        type: "SET_EXPENSES",
        expenses,
    });
});

test("Should fetch the expenses data from firebase", (done) => {
    const store = mockStore({});

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "SET_EXPENSES",
            expenses,
        });
    });
    done();
});
