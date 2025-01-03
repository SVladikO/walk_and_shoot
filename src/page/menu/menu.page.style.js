import styled from 'styled-components';

export const Wrapper = styled.div`
    /*display: none;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    gap: 40px;
    position: absolute;
    top: 0;
    width: 100%;
    height: 200%;
    padding: 40px 0 1000px 0;
    background: #000000;
    overflow: auto;
`;
export const GameTitle = styled.h1`
    color: #950101;
`;
export const Canvas = styled.canvas`
    width: 200px;
    height: 100px;
`;
export const LevelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    border: solid 2px white;
    
    & > div {
        display: flex;
        gap: 10px;
        justify-content: space-between;
        padding: 4px 0;
    }
`;
export const SubWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    max-width: 1200px;
`;
export const LevelTitle = styled.div`
    font-size: 20px;
    display: flex;
    justify-content: center;
    color: black;
`;

export const NavigationWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
`;