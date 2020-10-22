import React, { useEffect, useState } from "react";

import "./index.css";
// import EnterName from "../../components/EnterName";
import Modal from "../../components/Modal/Modal";

const Home = ({ location: { search }, history }) => {
  const modalRef = React.useRef();
  const [userName, setUsername] = useState("");

  let inputValue;

  useEffect(() => {

  }, [search, history]);

  const handleHost = (e) => {
    // e.preventDefault;
    console.log(inputValue.value);
    history.push(`/host-settings?hostName=${inputValue.value}`);
  }

  const openModal = (e) => {
    // e.preventDefault;
    modalRef.current.openModal()
    setUsername(inputValue.value);
  };

  const handleJoin = (e) => {
    
    history.push(`/joinwaiting?username=${userName}&lobbyId=${inputValue.value}`);
  }

  return (
    <div>
      <div className="banner">
        CRANE-IUM
        {/*<div className="settings">Settings</div>*/}
      </div >

      <form onSubmit = {handleHost}>
        <input 
          ref={ input => inputValue = input }
          type="text" 
          name="userName" 
          placeholder="Enter name..."
          required
          className="inputbox"
        />
        <div onClick = {handleHost} className="hostbtn" type="submit">
          Host Game
        </div>
        {/* The Big One  */}
        <div onClick = {openModal} className="joinbtn" type="submit">
          Join Game
        </div>
      </form>

        <Modal ref={modalRef}>
          <form onSubmit={handleJoin}>
            <input 
              ref={input => inputValue = input}
              type="text" 
              name="lobbyId" 
              maxLength="20"
              required
              style={{
                backgroundColor: '#ffffff',
                width: '50%', 
                height: '25%',
                position: 'relative',
                fontSize: '20px',
              }}
              placeholder="Enter game code..." 
            />
            {/* the small one  */}
            <button onClick={handleJoin} type="submit">Join Game</button>
            <button onClick={() => modalRef.current.close()}>Close!</button>
          </form>
        </Modal>
      
      
    </div>
  );
};

export default Home;

// {() => history.push("/host-settings")}