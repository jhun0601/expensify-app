// High order component
//Reuse code
// Render Hijacking
// Prop Manilpulation
// Abstract State
import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
  <div>
    <h1>Hello</h1>
    <p>The info is : {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is Private info. Please Don't Share</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? <p>Authenticate</p> : <p>Please Login.</p>}
      <WrappedComponent />
    </div>
  );
};

const AuthInfo = requireAuthentication(Info);
// ReactDOM.render(
//   <AdminInfo isAdmin={false} info="this is the details" />,
//   document.getElementById("app")
// );

ReactDOM.render(
  <AuthInfo isAuthenticated={true} info="this is the details" />,
  document.getElementById("app")
);
