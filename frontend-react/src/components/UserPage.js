import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RoomList from './RoomList';



function UserPage({ token }) {

    const [data , setData ] = useState(null);


      useEffect(() => {

        axios.get("http://127.0.0.1:8000/api/chat/room/",{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+token
            }
        }).then((response) => {
            console.log(response['data']);
            setData(response['data']);
          }, (error) => {
            console.log(error);
          }
        );
      }, [token]);

      return(
        <div>
            <RoomList rooms={data} token={token}/>
        </div>
      );
}

export default UserPage;