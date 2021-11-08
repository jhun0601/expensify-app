import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { onValue } from "firebase/database";
import db from "../../firebase/firebase";
import {
    startAddExpense,
    addExpense,
    editExpense,
    removeExpense,
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import { ref } from "@firebase/database";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

test("Should setup remove expense action object", () => {
    const action = removeExpense({ id: "123abc" });
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "123abc",
    });
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

// test("Should setup add expense action object with default values", () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       id: expect.any(String),
//       description: "",
//       amount: 0,
//       createdAt: 0,
//       note: "",
//     },
//   });
// });

test("Should add exepense to database and store", () => {
    const store = mockStore({});
    const expenseData = {
        description: "Mouse",
        amount: 3000,
        note: "this is better",
        createdAt: 1000,
    };
    store
        .dispatch(startAddExpense(expenseData))
        .then(() => {
            const action = store.getActions();
            expect(action[0]).toEqual({
                type: "ADD_EXPENSE",
                expense: {
                    id: expect.any(String),
                    ...expenseData,
                },
            });
            return onValue(ref(db, `expenses/${action[0].expense.id}`));
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
});

test("Should add expense defaults to database and store", () => {
    const store = mockStore({});
    const expenseDefaults = {
        description: "",
        amount: 0,
        note: "",
        createdAt: 0,
    };
    store
        .dispatch(startAddExpense({}))
        .then(() => {
            const action = store.getActions();
            expect(action[0]).toEqual({
                type: "ADD_EXPENSE",
                expense: {
                    id: expect.any(String),
                    ...expenseDefaults,
                },
            });
            return onValue(ref(db, `expenses/${action[0].expense.id}`));
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseDefaults);
            done();
        });
});
