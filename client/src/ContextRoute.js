import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { GameContext } from "./context/GameContext";

export default ({ component, ...routeProps }) => {
  const { state, update } = useContext(GameContext);
  const Component = component;

  return (
    <Route
      {...routeProps}
      render={() => (
        <Component gameState={state} gameUpdate={update} {...routeProps} />
      )}
    />
  );
};
