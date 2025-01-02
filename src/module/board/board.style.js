import styled from "styled-components";
import {headerHeight} from "../../App.style";

export const CanvasBoardWrapper = styled.div`
  position: relative;
    height: calc(100vh - ${headerHeight}px);
`;

export const CanvasBoard = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
`;