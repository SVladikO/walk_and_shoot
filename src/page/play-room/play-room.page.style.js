import styled from "styled-components";
import {headerHeight} from "../../App.style";

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
    height: calc(100vh - ${headerHeight}px);
`;

export const CanvasBoard = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
`;
