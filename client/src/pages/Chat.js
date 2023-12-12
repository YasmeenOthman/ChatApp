import React, { useEffect, useState } from "react";
import Contacts from "../components/Contacts";
import axios from "axios";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Welcome from "./Welcome";
import ChatContainer from "../components/ChatContainer";
import io from "socket.io-client";

function Chat() {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const socket = io("http://localhost:8000");

  let token;
  let decoded;
  let userId;

  try {
    token = localStorage.getItem("authToken");
    decoded = jwtDecode(token);
    userId = decoded.userId;
  } catch (error) {
    navigate("/login");
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      let user = decoded.username;
      setCurrentUser(user);
    }
  });
  useEffect(() => {
    async function getAllUsers() {
      if (currentUser) {
        let res = await axios.get(
          `http://localhost:8000/api/auth/allusers/${userId}`
        );
        setAllUsers(res.data);
      }
    }
    getAllUsers();
  }, [currentUser]);

  useEffect(() => {
    if (currentChat) {
      // Join the room corresponding to the current chat
      socket.emit("join-room", currentChat._id);
    }

    // Ensure the socket is connected before trying to leave the room
    if (socket.connected) {
      return () => {
        // Leave the room when the component unmounts or chat changes
        if (currentChat) {
          socket.emit("leave-room", currentChat._id);
        }
      };
    }
  }, [socket, currentChat]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts
          allUsers={allUsers}
          currentUser={currentUser}
          handleChatChange={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            userId={userId}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1a1831;
  gap: 1rem;
  .container {
    width: 85vw;
    height: 85vh;
    background-color: #0d0c1e;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat;
