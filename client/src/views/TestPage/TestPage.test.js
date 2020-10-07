import React from "react";
import { render } from "@testing-library/react";
import TestPage from "./TestPage";

it("renders TestPage", () => {
  const div = document.createElement("div");
  render(<TestPage />, div);
});
