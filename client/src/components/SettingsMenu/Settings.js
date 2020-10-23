import React, { useState } from 'react'
import Modal from './SettingsModal'
import "../../index.css";

const BUTTON_WRAPPER_STYLES = {
  position: 'fixed',
  top: 5,
  right: 5,
  zIndex: 1,
}

export default function Options() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log('Options Opened')}>
        <button onClick={() => setIsOpen(true)}>Settings</button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <body>
              <h1>Options</h1>
          </body>
        </Modal>
      </div>
    </>
  )
}

