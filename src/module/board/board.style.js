import styled from 'styled-components';
import { headerHeight } from '../../App.style';

/**
 * Wrapper for the main canvas area.
 * Positions the canvas stack (layers) in a relative container.
 * Ensures the height spans the viewport minus the header.
 */
export const CanvasBoardWrapper = styled.div`
  position: relative;
  /* Subtract headerHeight to ensure the canvas fits below the header */
  height: calc(100vh - ${headerHeight}px);
`;

/**
 * A single canvas layer, absolutely positioned at top-left (0, 0).
 * Multiple CanvasBoard components can be stacked over one another.
 */
export const CanvasBoard = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  /* Optionally:
     width: 100%;
     height: 100%;
     object-fit: cover; 
     If you prefer the canvas to auto-resize to container. 
  */
`;
