import styled from "styled-components";

export const Wrapper = styled.div`
    overflow: hidden;
`;
export const HeaderWrapper = styled.div`
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    z-index: 1;
    position: relative;
    // border-bottom: solid 4px black;
`;

export const LineGroup = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
`;

export const SoundWrapper = styled.div`
    & > svg {
        height: 40px;
        width: 40px;
    }
`;

export const CanvasBoardWrapper = styled.div`
  position: relative;
    height: 100vh;
    border: solid 2px black;
`;

export const CanvasBoard = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
    border: solid 8px black;
`;
