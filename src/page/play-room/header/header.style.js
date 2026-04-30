import styled from "styled-components";

export const HeaderWrapper = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    //background: #eabd41;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    z-index: 1;  
`;

export const LineGroup = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;

    & > svg {
        height: 40px;
        width: 40px;
    }
`;
