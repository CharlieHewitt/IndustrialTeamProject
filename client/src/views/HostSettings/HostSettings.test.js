import React from "react";
import { render } from "@testing-library/react";
import HostSettings from "./HostSettings";

it("renders HostSettings", () => {
  const div = document.createElement("div");
  render(<HostSettings />, div);
});
