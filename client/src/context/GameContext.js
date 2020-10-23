import React, { createContext, useReducer } from "react";

export const GameContext = createContext();

const reducer = (state, pair) => {
  const newState = { ...state, ...pair };
  localStorage.setItem("gameState", JSON.stringify(newState));
  return newState;
};
const initialState =
  { ...JSON.parse(localStorage.getItem("gameState")) } || initialState;
export function GameProvider(props) {
  const [state, update] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, update }}>
      {props.children}
    </GameContext.Provider>
  );
}
