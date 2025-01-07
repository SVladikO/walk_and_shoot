import styled from "styled-components";

export const Wrapper = styled.div`
    overflow: hidden;
`;
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

export const SettingsWrapper = styled.div`
    position: absolute;
    top: 70px;
    width: 100%;
`;

export const SettingsInnerWrapper = styled.div`
    min-height: 200px;
    width: 400px;
    padding: 20px 40px;
    margin: 0 auto;
    color: white;
    background: #45516a;
    border: solid 1px black;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    
    & > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        gap: 10px;
    }
`;

export const SettingsItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const MoreLessWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    & > div {
        display: flex;
        gap: 10px;
        align-items: center;
    }
    
    & > div > button {
        min-width: 40px !important;
    }
`;

export const Title = styled.div`
    text-align: center;
    margin: 0 0 20px;
`;

export const CanvasBoardWrapper = styled.div`
  position: relative;
    height: 100vh;
`;

export const CanvasBoard = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
`;


