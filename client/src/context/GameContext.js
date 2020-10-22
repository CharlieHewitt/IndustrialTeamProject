import React, { createContext, useReducer } from "react";

export const GameContext = createContext();

const reducer = (state, pair) => {
  const newState = { ...state, ...pair };
  localStorage.setItem("gameState", JSON.stringify(newState));
  return newState;
};
const initialState = { ...JSON.parse(localStorage.getItem("gameState")) } || {
  hostName: "",
  lobbyId: "",
  userName: "",
  timeSetting: "",
  roundCount: "",
  categories: "",
  playerId: "",
  numQuestions: "",
  answerTime: "",
};

export function GameProvider(props) {
  const [state, update] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, update }}>
      {props.children}
    </GameContext.Provider>
  );
}
