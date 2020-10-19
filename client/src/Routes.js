import React from "react";

import Home from "./views/Home";
import NotFound from "./views/NotFound";
import HostSettings from "./views/HostSettings";
import HowTo from "./views/Waiting";

import Answer from "./views/Quizing";
import Score from "./views/Score";
import Total from "./views/TotalScore";

import { Route, Switch, Redirect } from "react-router-dom";
import Waiting from "./views/Waiting";

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

        <Route path="/Quizing" component={Answer} />
        <Route path="/Score" component={Score} />
        <Route path="/Totalscore" component={Total} />
        <Route path="/Waiting" component={Waiting} />

        <Route component={NotFound} />
      </Switch>
    </>
  );
};
