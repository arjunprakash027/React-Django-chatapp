import React from 'react';
import { useState } from 'react';

function RoomPopup({ onClose , handleRoomCreation }){
    const [roomName , setRoomName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRoomCreation(roomName);
        setRoomName("");
        onClose();
    };

    return(
        
            <div className="room-popup-content">
                <h2> Create a new room </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        placeholder="Enter room name" 
                    />
                    <button type="submit">Create</button>
                </form>
            </div>
        
    );
}

export default RoomPopup;