
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Navbar from './components/navigation_bar';
import UserPage from './components/UserPage';
import axios from 'axios';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('login failed:', error)
  });

  useEffect(() => {
    const stroedProfile = sessionStorage.getItem('profile');
    const storedToken = sessionStorage.getItem('token');

    if (storedToken){
      setToken(storedToken);
    }
    if (stroedProfile){
      setProfile(JSON.parse(stroedProfile));
    }

  },[]);

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${user['access_token']}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user['access_token']}`
          }
        })
        .then(
          (response) => {
            console.log('changes');
            setProfile(response['data']);
            sessionStorage.setItem('profile', JSON.stringify(response['data']));
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [user]);

  useEffect(() => {
    if (profile === null) {
      console.log('profile null');
    } else {
      console.log('sending data to django');

      const profileData = {
        name: profile['name'],
        email: profile['email'],
        username: profile['id']
      };

      console.log(profileData);

      axios.post('http://127.0.0.1:8000/api/auth/register/', profileData).then(
        (response) => {
          console.log(response['data']);

          const credentials = {
            username: profile['id'],
            password: 'random123'
          };
          const timeout = setTimeout(() => {
            axios.post('http://127.0.0.1:8000/api/auth/login/', credentials)
              .then((response) => {
                console.log(response['data']);
                setToken(response['data']['token']);
                sessionStorage.setItem('token', JSON.stringify(response['data']['token']));
              });
            }, 3000);
            //console.log("printing token");
            //console.log(token);
            return () => clearTimeout(timeout);
            
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [profile]);


  const logout = () => {
    googleLogout();
    sessionStorage.removeItem('profile');
    sessionStorage.removeItem('token');
    setProfile(null);
  };

  return (
    <div>
      {profile ? (
        <div>
          <Navbar profile={profile} logout={logout} token={token}/>
          <UserPage token={token}/>
        </div>
      ) : (
        <div className="login-container">
          <h2 className="login-heading">Google Login</h2>
          <button className="login-button" onClick={login}>
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
