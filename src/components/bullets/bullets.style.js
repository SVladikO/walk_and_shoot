import styled from "styled-components";

/**
 * Wrapper
 * Main container that holds bullet indicators and notification panel.
 */
export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end; /* More semantic than "right" */
  align-items: flex-start;   /* More semantic than "top" */
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3px;
  width: 180px;
  position: relative;
`;

/**
 * BulletWrapper
 * A container to position bullets absolutely within the Wrapper.
 */
export const BulletWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  position: absolute;
`;

/**
 * Bullet
 * Represents an active bullet (e.g., loaded in a gun).
 * 
 * Consider using a dynamic 'background-color'
 * through props or theme context for theming.
 */
export const Bullet = styled.div`
  background: #000;
  height: 10px;
  width: 10px;
  border-radius: 50%;
`;

/**
 * UsedBulletWrapper
 * A grouping container for bullets that have been used or spent.
 */
export const UsedBulletWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
`;

/**
 * UsedBullet
 * Represents a bullet that has already been fired or is no longer available.
 */
export const UsedBullet = styled.div`
  background: #bababc;
  height: 10px;
  width: 10px;
  border-radius: 50%;
`;

/**
 * Notification
 * A styled box that can be used to display an alert or message.
 * 
 * Animates background color in a cycle. Consider using theme-based
 * animations or user-configurable intervals for production code.
 */
export const Notification = styled.div`
  padding: 10px;
  background: rgb(179, 0, 0);
  color: #fff;
  height: 60px;
  width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  animation: alertBlink 1s infinite;

  @keyframes alertBlink {
    25% {
      background-color: rgb(181, 1, 1);
    }
    60% {
      background-color: rgb(191, 15, 15);
    }
    75% {
      background-color: rgb(0, 63, 179);
    }
    100% {
      background-color: rgb(11, 73, 186);
    }
  }
`;
