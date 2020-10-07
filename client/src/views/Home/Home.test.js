import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";

it("renders Home", () => {
  const div = document.createElement("div");
  render(<Home />, div);
});
