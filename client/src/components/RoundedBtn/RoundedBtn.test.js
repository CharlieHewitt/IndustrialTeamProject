import React from "react";
import { render } from "@testing-library/react";
import RoundedBtn from "./RoundedBtn";

it("renders RoundedBtn", () => {
  const div = document.createElement("div");
  render(<RoundedBtn />, div);
});
