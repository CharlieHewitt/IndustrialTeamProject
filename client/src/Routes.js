import React from "react";

import Home from "./views/Home";
import NotFound from "./views/NotFound";
import TestPage from "./views/TestPage";
import { Route, Switch, Redirect } from "react-router-dom";

export const Routes = () => {
  return (
    <>

      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/test" component={TestPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};
