import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    width: 180px;
    //border:solid 1px black;
    
    & > div {
        border-radius: 50%;
        background: black;
        height: 10px;
        width: 10px;
    }
`;