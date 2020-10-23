import React, { createContext, useReducer } from "react";
import initialState from "./initialState";

export const GameContext = createContext();

const reducer = (state, pair) => {
  const newState = { ...state, ...pair };
  localStorage.setItem("gameState", JSON.stringify(newState));
  return newState;
};
const inState =
  { ...JSON.parse(localStorage.getItem("gameState")) } || initialState;
export function GameProvider(props) {
  const [state, update] = useReducer(reducer, inState);

  return (
    <GameContext.Provider value={{ state, update }}>
      {props.children}
    </GameContext.Provider>
  );
}
