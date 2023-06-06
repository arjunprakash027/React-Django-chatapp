import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { googleLogout,useGoogleLogin } from '@react-oauth/google';
import Navbar from './components/navigation_bar';
import UserPage from './components/UserPage';
import axios from 'axios';

function App() {


  const [user, setUser] = useState(null);
  const [ profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('login failed:',error)
  });

  // if (user){
  // console.log(user);
  // }
  
  useEffect(() => {
    if (user) {
      axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+user['access_token'], {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+user['access_token']
          }
        })
        .then((response) => {
          console.log("changes");
          setProfile(response['data']);
        }, (error) => {
          console.log(error);
        });
  }
  }, [user]);

  useEffect(() => {
    if (profile ==  null){
      console.log("profile null");
    }
    else{
    console.log("sending data to django");

    const ProfileData = {
      name: profile['name'],
      email: profile['email'],
      username: profile['id']
    };
    console.log(ProfileData);
    axios.post('http://127.0.0.1:8000/api/auth/register/', ProfileData)
    .then((response) => {
      console.log(response['data']);
    });
    }
  }, [profile]);


  const logout = () => {
    googleLogout();
    setProfile(null);
  };

  if (profile){
    console.log("profile present");
    console.log(profile);
  }

  
  return (
    <div>
      {profile ? (
        <div>
        <Navbar profile={profile} logout={logout} />
        <UserPage profile={profile} />
        </div>
      ) : (
        <div>
        <h2> Google login </h2>
        <br />
        <br />
        <button onClick={()=>login()}>Sign in with google </button>
        </div>
      )}
    </div>
  );
}

export default App;
