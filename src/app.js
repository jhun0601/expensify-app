import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpense from "./selectors/expenses";

// css
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<p>LOADING ...</p>, document.getElementById("app"));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById("app"));
});

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // ...
        console.log(user.uid);
    } else {
        // User is signed out
        // ...
        console.log("logout");
    }
});
