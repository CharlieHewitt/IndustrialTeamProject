import React from "react";
import { render } from "@testing-library/react";
import CategoryList from "./CategoryList";

it("renders CategoryList", () => {
  const div = document.createElement("div");
  render(<CategoryList />, div);
});
