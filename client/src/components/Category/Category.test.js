import React from "react";
import { render } from "@testing-library/react";
import Category from "./Category";

it("renders Category", () => {
  const div = document.createElement("div");
  render(<Category />, div);
});
