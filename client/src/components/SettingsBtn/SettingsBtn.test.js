import React from "react";
import { render } from "@testing-library/react";
import SettingsBtn from "./SettingsBtn";

it("renders SettingsBtn", () => {
  const div = document.createElement("div");
  render(<SettingsBtn />, div);
});
