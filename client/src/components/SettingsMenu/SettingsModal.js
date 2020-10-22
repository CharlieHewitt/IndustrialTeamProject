import React from 'react'
import ReactDom from 'react-dom'

const SETTINGS_MODAL = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  height: '50%',
  width: '40%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '##3D5B84',
  padding: '50px',
  zIndex: 1000,
  textAlign: "center",
}

const SETTINGS_OVERLAY = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .5)',
  zIndex: 1000,
  textAlign: "center",
}
const slider = document.getElementById("slider");
const selector = document.getElementById("selector");

/*slider.oninput = function (){
  selector.style.left = this.value + "%"
}*/
//This is the function that allows the slider to move, normally in a <script> placed after "const selector", however i can seem to get it working :(

export default function Modal({ open, children, onClose, history }) {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div style={SETTINGS_OVERLAY} />
      <div style={SETTINGS_MODAL}>
        {children}
        <button onClick={onClose}>Return to Game</button>
        <p></p>
        <div><button onClick={() => window.location.replace("http://localhost:3002/Home")}>Leave Game</button>
        <p></p>
        </div>

        <div id="volumeSlider">
          <div class="volume">

            <input type="range" min="0" max="100" value="50" id="slider"></input>
            <div id="selector">
                <div class="SelectBtn">    </div>
            </div>
          </div>
        </div>
    </div>  
    </>,
    document.getElementById('portal')
  )
  //The Leave button currently has the URL applicable to my localhost, this must be changed for the final project
}