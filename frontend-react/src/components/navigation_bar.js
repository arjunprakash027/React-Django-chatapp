import React, { useState } from 'react';
import RoomPopup from './NewRoompopUp';
import axios from 'axios';

function Navbar({ profile, logout, token }) {
  const [roomPopupOpen, setRoomPopupOpen] = useState(false);

  const handleNewRoomClick = () => {
    setRoomPopupOpen(true);
  };

  const handleRoomPopupClose = () => {
    setRoomPopupOpen(false);
  };

  const handleRoomCreation = (roomName) => {
    if(roomName){
      axios.post("http://127.0.0.1:8000/api/chat/room/",{name:roomName},{
        headers : {
          'Content-Type': 'application/json',
          'Authorization': 'Token '+token
        }

      }).then((response) => {
        console.log(response['data']);
        window.location.reload();
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <nav>
      <div className="logo">
        <img src={profile['picture']} alt={profile['name']} />
        <h2>Welcome, {profile['name']}!</h2>
      </div>
      <div className="profile-info">
        <button onClick={logout}>Logout</button>
        <button onClick={handleNewRoomClick}>New Room</button>
      </div>
      {roomPopupOpen && <RoomPopup onClose={handleRoomPopupClose} handleRoomCreation={handleRoomCreation} />}
    </nav>
  );
}

export default Navbar;