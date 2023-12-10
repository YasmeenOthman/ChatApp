import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();

  function handleLogOut() {
    if (window.confirm("Are you sure?")) {
      localStorage.clear();
      navigate("/login");
    }
  }
  return (
    <Button>
      <BiPowerOff onClick={handleLogOut} />
    </Button>
  );
}
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  background-color: #a21232;
  svg {
    font-size: 1.3rem;
    color: white;
  }
`;

export default Logout;
