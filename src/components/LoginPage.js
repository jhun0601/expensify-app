import React from "react";
import { connect } from "react-redux";
import { startLogin, startLoginFacebook } from "../actions/auth";
export const LoginPage = ({ startLogin, startLoginFacebook }) => (
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
            {/* <button onClick={startLoginFacebook} className="button">
                Log in with Facebook
            </button> */}
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin()),
    startLoginFacebook: () => dispatch(startLoginFacebook()),
});
export default connect(undefined, mapDispatchToProps)(LoginPage);
