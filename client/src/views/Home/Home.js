import React from "react";
import "./index.css";
import EnterName from "../../components/EnterName";
import Modal from "../../components/Modal/Modal";

const Home = ({ history }) => {

  const modalRef = React.useRef();

  const openModal = () => {
    modalRef.current.openModal()
  };

  return (
    <div>


      <div className="banner">
        THE QUIZ
        <div className="settings">Settings</div>
      </div >
      <EnterName />

      <div onClick={() => history.push("/host-settings")} className="hostbtn">
        Host Game
      </div>

      <div onClick={openModal} className="joinbtn">

        Join Game
      </div>
      <Modal ref={modalRef}>
                <input 
                    type="text" 
                    name="title" 
                    maxLength="5"
                    style={{
                        backgroundColor: '#ffffff',
                        width: '50%', 
                        height: '25%',
                        position: 'relative',
                        fontSize: '20px',
                    }}
                    placeholder="Enter game code..." 
                />
          <button onClick={() => history.push("/waiting")}>Join Game</button>
          <button onClick={() => modalRef.current.close()}>Close!</button>
          </Modal>
    </div>
  );
};

export default Home;