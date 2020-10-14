import React, { useState } from "react";
import { overlay } from "react-bootstrap";
import Modal from "react-modal";
import "./HowTo.css";

Modal.setAppElement('#root')
function HowTo() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    return(
        <div className="HowTo">
            <button onClick={() => setModalIsOpen(true)}>How To?</button>
            <Modal className="ModalBox" isOpen={modalIsOpen} 
            shouldCloseOnEsc={true} 
            shouldCloseOnOverlayClick={true} 
            onRequestClose={() => setModalIsOpen(false)}>
                <h2>Instructions</h2>
                <h3>The instructions go here</h3>
                <button onClick={() => setModalIsOpen(false)}>Close</button>
            </Modal>
        </div>
    );
}

export default HowTo;