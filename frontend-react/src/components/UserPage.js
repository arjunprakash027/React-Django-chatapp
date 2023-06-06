import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function UserPage({ profile }) {

    const [token, setToken] = useState(null);
    const [data , setData ] = useState(null);

    useEffect(() => {

        const delay = 3000;

        const credentials = {
          username: profile['id'],
          password: 'random123'
        };
        
        const timeout = setTimeout(() => {
        axios.post('http://127.0.0.1:8000/api/auth/login/', credentials)
          .then((response) => {
            console.log(response['data']);
            setToken(response['data']['token']);
          });
        }, delay);
        
        return () => clearTimeout(timeout);
      }, []); // Empty dependency array to run the effect only once

      useEffect(() => {

        axios.get("http://127.0.0.1:8000/api/auth/hello/",{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+token
            }
        }).then((response) => {
            console.log(response['data']);
            setData(response['data']['message']);
          }, (error) => {
            console.log(error);
          }
        );
      }, [token]);

      return(
        <div>
            <h2> User Page </h2>
            <br />
            <p> {data} </p>
        </div>
      );
}

export default UserPage;