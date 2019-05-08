import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../providers/user.provider";
// import { AuthConsumer } from './AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authenticatedUser = useContext(UserContext).isLoggedIn;
  return (
    <Route
      render={props =>
        authenticatedUser ? <Component {...props} /> : <Redirect to="/" />
      }
      {...rest}
    />
  );
};
export default ProtectedRoute;
