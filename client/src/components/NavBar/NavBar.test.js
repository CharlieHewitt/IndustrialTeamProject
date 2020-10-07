import React from "react";
import { render } from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter as Router } from "react-router-dom";

it("renders NavBar", () => {
  const div = document.createElement("div");
  render(
    <Router>
      <NavBar />
    </Router>,
    div
  );
});
