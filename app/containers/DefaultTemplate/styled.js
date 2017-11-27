import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Logo = styled.img`
  width: 120px;
`;

export const Header = styled.div`
  background: #f7f7f7;
  img {
  width: 100px;
  padding: 15px;
  }
`;
export const Button = styled.a`
      text-transform: uppercase;
    background-color: #333;
    border: none;
    color: #fff;
    padding: 20px;
    border-radius: 4px;
    float: right;
    margin-top: 30px;
    margin-right: 15px;
    text-decoration: none;
  
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
