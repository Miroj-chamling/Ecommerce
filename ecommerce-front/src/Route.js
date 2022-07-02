import React from "react";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./Core/Home";
import Menu from "./Core/Menu";

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route exact path="/" component={withRouter(Home)} />
        <Route exact path="/signin" component={withRouter(Signin)} />
        <Route exact path="/signup" component={withRouter(Signup)} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
