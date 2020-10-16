import React from "react";
import { render } from "@testing-library/react";
import NotFound from "./NotFound";

it("renders NotFound", () => {
  const div = document.createElement("div");
  render(<NotFound />, div);
});
