import React, { useState } from "react";
import Modal from "./SettingsModal";
import "../../index.css";
import { useHistory } from "react-router-dom";

const BUTTON_WRAPPER_STYLES = {
  position: "fixed",
  top: 5,
  right: 5,
  zIndex: 1,
};

export default function Options() {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  return (
    <>
      <div
        style={BUTTON_WRAPPER_STYLES}
        onClick={() => console.log("Options Opened")}
      >
        <button onClick={() => setIsOpen(true)}>Settings</button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)} history={history}>
          <body>
            <h1>Options</h1>
          </body>
        </Modal>
      </div>
    </>
  );
}
