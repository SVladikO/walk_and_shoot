import styled from "styled-components";

export const  headerHeight = 60;

export const Header = styled.div`
    height: ${headerHeight}px;
    background: white;
    display: ${p => p.isVisible ? 'flex' : 'none'};
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    z-index: 1;
    position: relative;
    // border-bottom: solid 4px black;
`;

export const CanvasBoardWrapper = styled.div`
  position: relative;
`;

export const CanvasBoard = styled.canvas`
    display: ${p => p.isVisible ? 'flex' : 'none'};
    position: absolute;
    top: 0;
    left: 0;
    // border: solid 8px black;
`;

export const LineGroup = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
`;
