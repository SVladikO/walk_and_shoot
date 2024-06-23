import styled from 'styled-components';

export const Wrapper = styled.div`
    /*display: none;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    color: red;
    gap: 40px;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 40px 0 0 0;
    background: black;
    overflow-y: auto;
`;
export const Canvas = styled.canvas`
    width: 200px;
    height: 100px;
`;
export const LevelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
`;
export const SubWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    max-width: 800px;
`;
export const LevelTitle = styled.div`
    font-size: 20px;
    display: flex;
    justify-content: center;
    color: black;
`;

