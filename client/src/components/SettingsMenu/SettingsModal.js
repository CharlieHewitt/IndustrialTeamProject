import React from "react";
import ReactDom from "react-dom";
import { useHistory } from "react-router-dom";

const SETTINGS_MODAL = {
  position: "fixed",
  top: "30%",
  left: "45%",
  backgroundColor: "#0e1c42",
  padding: "50px",
  zIndex: 1000,
  textAlign: "center",
};

const SETTINGS_OVERLAY = {
  position: "fixed",
  top: "30%",
  left: "27%",
  height: "50%",
  width: "50%",
  backgroundColor: "#0e1c42",
  zIndex: 1000,
  textAlign: "center",
};

export default function Modal({ open, children, onClose, history }) {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div style={SETTINGS_OVERLAY} />
      <div style={SETTINGS_MODAL}>
        {children}
        <button onClick={onClose}>Return to Game</button>
        <p></p>
        <div>
          <button
            onClick={() => {
              history.push("/Home");
              onClose();
            }}
          >
            Leave Game
          </button>
          <p></p>

        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
  //The Leave button currently has the URL applicable to my localhost, this must be changed for the final project
}
