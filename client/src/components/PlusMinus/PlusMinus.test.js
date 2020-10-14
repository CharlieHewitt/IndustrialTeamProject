import React from "react";
import { render } from "@testing-library/react";
import PlusMinus from "./PlusMinus";

it("renders PlusMinus", () => {
  const div = document.createElement("div");
  render(<PlusMinus />, div);
});
