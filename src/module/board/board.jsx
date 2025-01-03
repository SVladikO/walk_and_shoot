import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// Styles
import { CanvasBoard, CanvasBoardWrapper } from "./board.style";

// Game imports
import { game } from "../../util/game";
import { levels } from "../../util/levels.data";

// Redux actions
import {
  setUserBulletsInClip,
  setMaxUserBulletsInClip
} from "../../features/app.slice";

/**
 * Board
 * A React component that renders two <canvas> elements:
 *   - A static background (static_canvas_game_board)
 *   - A dynamic layer for animations (canvas_game_board)
 */
const Board = () => {
  const dispatch = useDispatch();

  // Dispatchers for bullet status
  const handleBulletsInClip = (amount) => {
    dispatch(setUserBulletsInClip(amount));
  };
  const handleMaxBulletsInClip = (amount) => {
    dispatch(setMaxUserBulletsInClip(amount));
  };

  // The main effect to initialize and start the game
  useEffect(() => {
    // Defensive check: ensure game object is properly loaded
    if (!game) {
      console.error("Game object is unavailable; cannot initialize game logic.");
      return;
    }

    /**
     * Initialize the game instance with callback references
     * so that the game can update the Redux store about bullet states.
     */
    game.init({
      onSetUserBulletsInClip: handleBulletsInClip,
      onSetMaxUserBulletsInClip: handleMaxBulletsInClip
      // You may also pass other callback references for UI if needed
    });

    // Start the game with the first level (or any other level)
    if (levels && levels.length > 0) {
      game.start(levels[0]);
    } else {
      console.warn("No levels found. Game start skipped.");
    }

    // Cleanup function: remove event listeners on unmount
    return () => {
      game.removeListeners();
    };
  }, [handleBulletsInClip, handleMaxBulletsInClip]);

  return (
    <CanvasBoardWrapper id="canvas_board_wrapper">
      {/* The static canvas (for background) */}
      <CanvasBoard id="static_canvas_game_board" />
      {/* The dynamic canvas (for rendering bullets, animations, etc.) */}
      <CanvasBoard id="canvas_game_board" />
    </CanvasBoardWrapper>
  );
};

export default Board;
