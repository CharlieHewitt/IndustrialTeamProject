import React from "react";

import Home from "./views/Home";
import NotFound from "./views/NotFound";
import HostSettings from "./views/HostSettings";
import HowTo from "./views/Waiting";

import Answer from "./views/Quizing";
import Score from "./views/Score";
import Total from "./views/TotalScore";
import Waiting from "./views/Waiting";
import JoinWaiting from "./views/JoinWaiting";

import { Switch, Redirect } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import ContextRoute from "./ContextRoute";

export const Routes = () => {
  return (
    <GameProvider>
      <Switch>
        <ContextRoute exact path="/Home" component={Home} />
        <ContextRoute exact path="/">
          <Redirect to="/Home" />
        </ContextRoute>
        <ContextRoute exact path="/HowTo" component={HowTo} />
        <ContextRoute exact path="/host-settings" component={HostSettings} />

        <ContextRoute path="/Quizing" component={Answer} />
        <ContextRoute path="/Score" component={Score} />
        <ContextRoute path="/Totalscore" component={Total} />
        <ContextRoute path="/Waiting" component={Waiting} />
        <ContextRoute path="/JoinWaiting" component={JoinWaiting} />

        <ContextRoute component={NotFound} />
      </Switch>
    </GameProvider>
  );
};
