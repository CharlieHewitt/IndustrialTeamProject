import React, { useState } from 'react'
import Modal from './Modal'
import "../../index.css";


const BUTTON_WRAPPER_STYLES = {
  position: 'fixed',
  top: 5,
  right: 5,
  zIndex: 1
}

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log('Settings Opened')}>
        <button onClick={() => setIsOpen(true)}>Settings</button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <body>
              Settings Menu
            <p>Volume</p>
            <p>Fullscreen</p>
            <p>Return to game</p>
          </body>
        </Modal>
      </div>
    </>
  )
}

