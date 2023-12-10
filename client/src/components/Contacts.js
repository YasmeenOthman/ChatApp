import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import userLogo from "../assets/user.png";
import { useNavigate } from "react-router-dom";

function Contacts({ allUsers, currentUser, handleChatChange }) {
  const navigate = useNavigate();
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelectedChat, setCurrentSelectedChat] = useState(undefined);
  const [currentUserSelected, setCurrentUserSelected] = useState(false);

  useEffect(() => {
    if (currentUser) {
      //   setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, user) => {
    // this state will be used for changing the selected chat background
    setCurrentSelectedChat(index);
    // this will render the user name in the chat container
    handleChatChange(user);
  };

  return (
    <>
      {currentUserName && (
        <Container>
          <div className="brand">
            <TbTriangleInvertedFilled />
            <h1>Ready!!!</h1>
          </div>
          <div className="contacts">
            {allUsers.map((user, index) => {
              return (
                <div
                  key={index}
                  className={`contact ${
                    index === currentSelectedChat ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, user)}
                >
                  <div className="avatar">
                    <img src={userLogo} alt="avatar" />
                  </div>
                  <div className="username">
                    <h3>{user.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            onClick={() => changeCurrentChat(undefined)}
            className="current-user"
          >
            <div className="avatar">
              <img src={userLogo} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  /* background-color: #a21232;
  background-color: #20615b; */
  background-color: #090723;
  padding: 0.3rem;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    svg {
      color: #a21232;
      height: 3rem;
      width: 3rem;
    }
    h1 {
      text-transform: uppercase;
      color: #dece9c;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    margin: 0.3rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #20615b;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      display: flex;
      align-items: center;
      background-color: #1a1831;
      min-height: 5rem;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      cursor: pointer;
      transition: 0.4s ease-in-out;
      color: #dece9c;
      color: #dece9c;
    }
    .avatar {
      img {
        height: 3rem;
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #dece9c;
      background-color: #a21232;
      /* color: #1a1831; */
    }
  }
  .current-user {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 2rem;
    background-color: #1a1831;
    background-color: #20615b;
    cursor: pointer;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: #dece9c;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts;
