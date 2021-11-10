import { v4 as uuidv4 } from "uuid";
import db from "../firebase/firebase";
import {
    push,
    ref,
    remove,
    onValue,
    get,
    child,
    update,
} from "firebase/database";

export const addExpense = (expense) => ({
    type: "ADD_EXPENSE",
    expense,
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = "",
            note = "",
            amount = 0,
            createdAt = 0,
        } = expenseData;
        const expense = { description, note, amount, createdAt };
        const postPush = push(ref(db));
        return push(ref(db, `users/${uid}/expenses`), expense)
            .then((ref) => {
                dispatch(
                    addExpense({
                        id: ref.key,
                        ...expense,
                    })
                );
            })
            .catch((e) => {
                throw new Error(e);
            });
    };
};

export const removeExpense = ({ id } = {}) => ({
    type: "REMOVE_EXPENSE",
    id,
});

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return remove(ref(db, `users/${uid}/expenses/${id}`)).then(() => {
            dispatch(removeExpense({ id }));
        });
    };
};
export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates,
});

export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return update(ref(db, `users/${uid}/expenses/${id}`), updates).then(
            () => {
                dispatch(editExpense(id, updates));
            }
        );
    };
};

// SET EXPENSE
export const setExpenses = (expenses) => ({
    type: "SET_EXPENSES",
    expenses,
});
const dbRef = ref(db);

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return get(child(dbRef, `users/${uid}/expenses`))
            .then(
                (snapshot) => {
                    const expenses = [];
                    snapshot.forEach((childSnapshot) => {
                        expenses.push({
                            id: childSnapshot.key,
                            ...childSnapshot.val(),
                        });
                    });
                    dispatch(setExpenses(expenses));
                },
                { onlyOnce: true }
            )
            .catch((error) => {
                console.error(error);
            });
    };
};
