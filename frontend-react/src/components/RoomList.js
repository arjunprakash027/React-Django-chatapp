import React from 'react';
import { useState } from 'react';
import ChatWindow from './ChatWindow';

function RoomList({rooms, token}){
    const [chatOpen, setChatOpen] = useState(false);
    const [roomSelect, setRoomSelect] = useState(null);

    const handleRoomClick = (room) => {
        console.log("room clicked");
        setRoomSelect(room);
        setChatOpen(true);
      }

    const onBack = () => {
        setChatOpen(false);
        setRoomSelect(null);
    }

    if (rooms === null){
        return(
            <div>
                <h1>RoomList is loading</h1>
            </div>
        );
    }

    return(
        <div>
            <button className='back-button' onClick={onBack}>
                back
            </button>
            {chatOpen && <ChatWindow room={roomSelect} token={token} />}
            {
            rooms.map((room) => 
            (
                <div key={room.id} onClick={() => handleRoomClick(room)}>
                    <div className='card'>
                    <h1>{room.name}</h1>
                    </div>
                </div>
            )
            )}
            
        </div>
    );
}

export default RoomList;