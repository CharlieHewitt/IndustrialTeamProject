import React, { useEffect, useState } from "react";

import "./index.css";
// import EnterName from "../../components/EnterName";
import Modal from "../../components/Modal/Modal";

const Home = ({ location: { search }, history }) => {

  const modalRef = React.useRef();
  let inputValue;

  const openModal = () => {
    modalRef.current.openModal()
  };
  useEffect(() => {

  }, [search, history]);

  const handleHost = (e) => {
    console.log(inputValue.value);
    history.push(`/host-settings?hostName=${inputValue.value}`);
  }

  return (
    <div>
      <div className="banner">
        THE QUIZ
        {/*<div className="settings">Settings</div>*/}
      </div >
      {/* <EnterName /> */}

      <form onSubmit = {handleHost}>
        <input 
          ref={ input => inputValue = input }
          type="text" 
          name="userName" 
          placeholder="Enter name..."
          // onChange = {handleInput}
          style={{
              backgroundColor: '#ffffff',
              width: '890px', 
              height: '130px',
              position: 'absolute',
              fontSize: '70px',
              left: '515px',
              top:'393px'
          }} 
        />
        <div onClick = {handleHost} className="hostbtn" type="submit">
          Host Game
        </div>
      </form>

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
          <button onClick={() => history.push("/joinwaiting")}>Join Game</button>
          <button onClick={() => modalRef.current.close()}>Close!</button>
          </Modal>
    </div>
  );
};

export default Home;

// {() => history.push("/host-settings")}