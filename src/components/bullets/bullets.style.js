import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 3px;
    width: 180px;
    //border:solid 1px black;

    & > div {
        border-radius: 50%;
        background: black;
        height: 10px;
        width: 10px;
    }
`;

export const Notification = styled.div`
    padding: 10px;
    background: rgb(179, 0, 0);
    color: white;
    height: 60px;
    width: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    animation: example 1s infinite;

    @keyframes example {
        25% {
            background-color: rgb(179, 0, 0);
        }
        100% {
            background-color: #000000;
        }
    }
`;