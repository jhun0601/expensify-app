import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";
export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__container">
            <img
                src="/images/favicon.png"
                alt="expensify app"
                className="box-layout__logo"
            />
            <h1 className="box-layout__title">Expensify</h1>
            <p>It's time to get your expenses under control.</p>
            <button onClick={startLogin} className="button">
                Log in with Google
            </button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin()),
});
export default connect(undefined, mapDispatchToProps)(LoginPage);
