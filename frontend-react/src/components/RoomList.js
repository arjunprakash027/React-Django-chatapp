import React from 'react';

function RoomList({rooms, handleRoomClick}){

    if (rooms === null){
        return(
            <div>
                <h1>RoomList is loading</h1>
            </div>
        );
    }

    return(
        <div>
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