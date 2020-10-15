import React from 'react'
import ReactDom from 'react-dom'

const SETTINGS_MODAL = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '##3D5B84',
  padding: '50px',
  zIndex: 1000
}

const SETTINGS_OVERLAY = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .5)',
  zIndex: 1000
}

export default function Modal({ open, children, onClose }) {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div style={SETTINGS_OVERLAY} />
      <div style={SETTINGS_MODAL}>
        {children}
        <button onClick={onClose}>Leave Game</button>
      </div>
    </>,
    document.getElementById('portal')
  )

}
