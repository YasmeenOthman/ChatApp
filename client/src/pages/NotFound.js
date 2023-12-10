import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <Container>
      <div className="container">
        <div className="header">
          <h1>404</h1>
        </div>
        <div className="details">
          <span>Sorry, the page not found</span>
          <p>
            The link you followed probably broken or the page has been removed
          </p>
        </div>
        <button>
          <Link to="/login">Login</Link>{" "}
        </button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #0d0c1e;
  .container {
    height: 70vh;
    width: 70vw;
    background-color: #1a1831;
    padding: 1rem;
    .header {
      h1 {
        color: #dece9c;
        font-size: 6rem;
      }
    }
    .details {
      span,
      p {
        color: #dece9c;
        font-size: 1.5rem;
      }
    }
    button {
      margin-top: 3rem;
      height: 5rem;
      width: 12rem;
      background-color: #a21232;
      font-size: 1.8rem;
      border: none;
      border-radius: 0.3rem;
      &:hover {
        background-color: #0d0c1e;
        color: #dece9c;
      }
      a {
        text-decoration: none;
        color: #dece9c;
      }
    }
  }
`;
export default NotFound;
