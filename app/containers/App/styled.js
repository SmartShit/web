import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Box = styled(Link)`
  margin: 0 -16px;
    box-shadow: 0 2px 3px rgba(0,0,0,0.11);
    border-radius: 2px;
    background-color: #fff;
    padding: 15px 24px 24px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    height: 300px;
    min-width: 296px;
    margin: 8px;
    float: left;
    width: calc(100% - 16px);
    text-decoration: none;
    
    @media (min-width: 768px){
      width: calc(33% - 16px);
    }
    
    
    @media (min-width: 1081px){
      width: calc(25% - 16px);
    }
    
    color: #333;
    
`;

export const Percentage = styled.div`
  margin-top: auto;
  line-height: 45px;
  font-weight: bold;
      color: #333;
    text-align: right;
    img {
    width: 40px;
    
    margin-right: 18px;
    }
`;

export const GreyText = styled.span`
    font-size: 18px;
    opacity: 0.6;
`;
