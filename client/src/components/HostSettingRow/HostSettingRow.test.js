import React from "react";
import { render } from "@testing-library/react";
import HostSettingRow from "./HostSettingRow";

it("renders HostSettingRow", () => {
  const div = document.createElement("div");
  render(<HostSettingRow />, div);
});
