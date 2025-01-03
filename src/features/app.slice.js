import { createSlice, configureStore } from '@reduxjs/toolkit';

/**
 * Define the initial state for the application slice.
 */
const initialState = {
  selectedLevel: 1,
  editLevel: 1, // Example field, not currently updated in the reducers below
  isGamePaused: false,
  selectedGun: null,
  userBulletsInClip: 0,
  maxUserBulletsInClip: 0,
  settings: {
    isSoundEnabled: true,
    isAutoShootEnabled: true,
    gameSpeed: 1,
  },
};

/**
 * Slice configuration
 * name: A unique string name for the slice
 * initialState: The slice's initial state
 * reducers: Define your reducer functions and auto-generate action creators
 */
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    /**
     * Sets the selected level to a specific numeric value.
     * Expected payload: { value: number }
     */
    setSelectedLevel: (state, { payload }) => {
      state.selectedLevel = payload.value;
    },

    /**
     * Updates the current bullet count in the user's clip.
     * Expected payload: number
     */
    setUserBulletsInClip: (state, { payload }) => {
      state.userBulletsInClip = payload;
    },

    /**
     * Updates the maximum bullet capacity of the user's clip.
     * Expected payload: number
     */
    setMaxUserBulletsInClip: (state, { payload }) => {
      state.maxUserBulletsInClip = payload;
    },

    /**
     * Increment the selected level by one (unbounded).
     */
    incrementSelectedLevel: (state) => {
      state.selectedLevel += 1;
    },

    /**
     * Decrement the selected level by one (could go below zero if not handled).
     */
    decrementSelectedLevel: (state) => {
      state.selectedLevel -= 1;
    },

    /**
     * Turn on sound in settings.
     */
    enableSound: (state) => {
      state.settings.isSoundEnabled = true;
    },

    /**
     * Turn off sound in settings.
     */
    disableSound: (state) => {
      state.settings.isSoundEnabled = false;
    },

    /**
     * Increase the game speed by a given payload.
     * Expected payload: number
     */
    increaseGameSpeed: (state, { payload }) => {
      state.settings.gameSpeed += payload;
    },

    /**
     * Decrease the game speed by a given payload.
     * Expected payload: number
     */
    decreaseGameSpeed: (state, { payload }) => {
      state.settings.gameSpeed -= payload;
    },

    /**
     * Enable auto-shoot in settings.
     */
    enableAutoShoot: (state) => {
      state.settings.isAutoShootEnabled = true;
    },

    /**
     * Disable auto-shoot in settings.
     */
    disableAutoShoot: (state) => {
      state.settings.isAutoShootEnabled = false;
    },
  },
});

/**
 * Export each action for easy usage across your application.
 */
export const {
  setSelectedLevel,
  setUserBulletsInClip,
  setMaxUserBulletsInClip,
  incrementSelectedLevel,
  decrementSelectedLevel,
  enableSound,
  disableSound,
  increaseGameSpeed,
  decreaseGameSpeed,
  enableAutoShoot,
  disableAutoShoot,
} = appSlice.actions;

/**
 * Create a Redux store with our single reducer. 
 * Typically, you'd configure your store in a separate file 
 * if you have multiple slices or middleware.
 */
const store = configureStore({
  reducer: appSlice.reducer,
});

/**
 * Optional: Subscribe to store changes (for debugging).
 * This logs state after every action dispatch.
 */
store.subscribe(() => console.log('STORE_UPDATE:', store.getState()));

/**
 * Finally, export the slice's reducer as the default to be 
 * referenced in a larger root reducer if needed.
 */
export default appSlice.reducer;
