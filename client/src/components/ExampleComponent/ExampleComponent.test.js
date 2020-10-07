import React from "react";
import { render } from "@testing-library/react";
import ExampleComponent from "./ExampleComponent";

it("renders ExampleComponent", () => {
  const div = document.createElement("div");
  render(<ExampleComponent />, div);
});
