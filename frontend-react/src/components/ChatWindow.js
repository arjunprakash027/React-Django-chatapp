import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './ChatWindow.css';

function ChatWindow ({ room,token }){
    const handleMessageCreation = (message,profile) => {
        if(message){
          axios.post("http://127.0.0.1:8000/api/chat/message/",
          {value:message,
            room:room.id,
            user:profile['id']},
        {
            headers : {
              'Content-Type': 'application/json',
              'Authorization': 'Token '+token
            }
    
          }).then((response) => {
            console.log(response['data']);
          }).catch((error) => {
            console.log(error);
          });
        }
      };
    const [messages, setMessages] = useState([]);
    const [sendMessage, setSendMessage] = useState("");
    console.log("romm id:",room.id);

    const handleSubmit = (e) => {
        e.preventDefault(e);
        const profile = JSON.parse(sessionStorage.getItem('profile'));
        handleMessageCreation(sendMessage,profile);
        setSendMessage("");
        console.log(profile['id']);
        
    };

    useEffect(() => {
        const fetchMessages = async () => {
          try {
            const response = await axios.get(
              `http://127.0.0.1:8000/api/chat/message/?room=${room.id}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Token ' + token
                }
              }
            );
            const MessageArray = Object.values(response.data);
            console.log("message array:",MessageArray);
            console.log("response:",response.data);
            setMessages(MessageArray);
            /*console.log("message:",messages);*/
          } catch (error) {
            console.log(error);
          }
        };

        const interval = setInterval(() => {
            fetchMessages();
        },3000);
        return () => clearInterval(interval);

      }, [room, token]);

    return(
        <div className="chat-window">
          <div className="chat-header">
            <h2>{room.name}</h2>
          </div>
          <div className="chat-messages">
            {messages.map((message) => (
              <div className="message" key={message.id}>
                <p className="message-info">
                  <span className="message-user">{message.user}</span> - {message.date}
                </p>
                <p className="message-text">{message.value}</p>
              </div>
            ))}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={sendMessage}
                        onChange={(e) => setSendMessage(e.target.value)}
                        placeholder="" 
                    />
                    <button type="submit">send</button>
                </form>
          </div>
        </div>
      );
};

export default ChatWindow;