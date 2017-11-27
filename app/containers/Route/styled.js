import styled from 'styled-components';

export const Box = styled.div`
      margin: 0 -16px;
    box-shadow: 0 2px 3px rgba(0,0,0,0.11);
    border-radius: 2px;
    background-color: #fff;
    padding: 30px 24px 24px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    min-width: 296px;
    margin: 8px;
    float: left;
    width: 96%;
    @media (min-width: 768px) {
      width: ${(props) => props.width || "auto"}
    }
`;
export const Wrapper = styled.div`
    @media (max-width: 767px) {
    display: flex;
    flex-flow: column;
    align-items: center;
    }
`;
