import React, { useState, useEffect } from "react";
import Logout from "./Logout";
import styled from "styled-components";
import userLogo from "../assets/user.png";
import ChatInput from "../components/ChatInput";
import Messages from "./Messages";
import axios from "axios";

function ChatContainer({ currentChat, userId, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  // ------- get all the messages --------
  useEffect(() => {
    async function getAllMessages() {
      const res = await axios.get("http://localhost:8000/api/msg/get", {
        params: {
          senderId: userId,
          receiverId: currentChat._id,
        },
      });
      setMessages(res.data);
    }
    getAllMessages();
  }, [currentChat]);

  // ------send a message -------
  const handleSendMsg = async (msg) => {
    socket.emit("send-msg", {
      senderId: userId,
      receiverId: currentChat._id,
      message: msg,
    });
  };

  //  ----- handle receiving message in socket

  useEffect(() => {
    // Set up message listeners
    const handleReceiveMessage = (msg) => {
      setArrivalMessage(msg);
    };
    socket.on("receive-msg", handleReceiveMessage);
    return () => {
      socket.off("receive-msg", handleReceiveMessage);
    };
  }, [socket]);

  // ---------- update the messages state ---------
  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
    }
  }, [arrivalMessage, setMessages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={userLogo} />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>

      <Messages messages={messages} />
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.8rem;
        font-size: 1.2rem;
        border-radius: 0.7rem;
        color: #d1d1d1;
      }
    }
    .sended {
      justify-content: flex-start;
      .content {
        background-color: #20615b;
      }
    }
    .received {
      justify-content: flex-end;
      .content {
        background-color: #1a1831;
      }
    }
  }
`;
export default ChatContainer;
