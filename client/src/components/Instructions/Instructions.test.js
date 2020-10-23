import React from "react";
import { render } from "@testing-library/react";
import Instructions from "./Instructions";

it("renders Instructions", () => {
  const div = document.createElement("div");
  render(<Instructions />, div);
});
