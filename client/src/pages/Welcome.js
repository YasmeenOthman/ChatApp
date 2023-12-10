import React from "react";
import styled from "styled-components";
import Rocket from "../assets/rocket.gif";
import Logout from "../components/Logout";
function Welcome({ currentUser }) {
  return (
    <Container>
      <div className="logout-container">
        <Logout />
      </div>

      <img src={Rocket} alt="rocket" />
      <h1>
        Welcome,<span>{currentUser}</span>
      </h1>
      <h3>Connect with your dearest ones by selecting a chat!</h3>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: wheat;
  .logout-container {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin: 1rem;
    position: relative;
    bottom: 11vh;
    right: 2rem;
  }
  img {
    height: 15rem;
    margin-top: 1rem;
  }
  span {
    color: #a21232;
  }
`;

export default Welcome;
