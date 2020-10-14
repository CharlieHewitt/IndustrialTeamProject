import React from "react";

import Home from "./views/Home";
import NotFound from "./views/NotFound";
import HostSettings from "./views/HostSettings";
import HowTo from "./views/HowTo"
import NavBar from "./components/NavBar";

import { Route, Switch, Redirect } from "react-router-dom";

export const Routes = () => {
  return (
    <>

      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/HowTo" component={ HowTo }/>
        <Route exact path="/host-settings" component={HostSettings} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};
