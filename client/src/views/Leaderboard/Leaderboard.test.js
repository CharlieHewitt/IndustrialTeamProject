import React from "react";
import { render } from "@testing-library/react";
import Leaderboard from "./Leaderboard";

it("renders Leaderboard", () => {
  const div = document.createElement("div");
  render(<Leaderboard />, div);
});
