import React, { createContext, useReducer } from "react";

export const GameContext = createContext();

const reducer = (state, pair) => ({ ...state, ...pair });

const initialState = {
  hostName: "",
  lobbyId: "",
  userName: "",
  timeSetting: "",
  roundCount: "",
  selectedCategories: "",
  playerId: "",
};

export function GameProvider(props) {
  const [state, update] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, update }}>
      {props.children}
    </GameContext.Provider>
  );
}
