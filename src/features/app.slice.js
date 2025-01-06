import {configureStore, createSlice} from '@reduxjs/toolkit'
import {game} from "../util/game";
import {LOCAL_STORAGE_KEY, LocalStorage} from "../util/localStorage";
import {levels} from "../util/levels.data";

const defaultState = {
    selectedLevel: 1,
    levelForEditIndex: 0,
    gameSpeed: 1,
    isUserDead: false,
    isGamePaused: false,
    isSoundEnabled: false,
    isShowSettings: false,
    levels
}

const state = LocalStorage.get(LOCAL_STORAGE_KEY.REDUX_STATE)?.app || defaultState;

const appSlice = createSlice({
    name: 'app',
    initialState: state,
    reducers: {
        setSelectedLevel: ((state, {payload}) => {
            state.selectedLevel = payload;
        }),
        enableSound: state => {
            game.isSoundEnabled = true;
            state.isSoundEnabled = true;
        },
        disableSound: state => {
            game.isSoundEnabled = false;
            state.isSoundEnabled = false;
        },
        increaseGameSpeed: (state, {payload}) => {
            state.healthLevelgameSpeed += payload
        },
        decreaseGameSpeed: (state, {payload}) => {
            state.healthLevelgameSpeed -= payload
        },
        openSettings: state => {
            state.isShowSettings = true;
            state.isGamePaused = true;
            game.inPlay = false;
        },
        closeSettings: state => {
            state.isShowSettings = false;
            state.isGamePaused = false;
            game.inPlay = true;
        },
        setIsUserDead: (state, {payload}) => {
            state.isUserDead = payload;
        },
        setLevelForEditIndex: (state, {payload}) => {
            console.log('setLevelForEditIndex', payload)
            state.levelForEditIndex = payload;
        },
        updateLevels: (state, {payload}) => {
            state.levels = payload;
        },
    }
})
export const {
    setSelectedLevel,
    enableSound,
    disableSound,
    openSettings,
    closeSettings,
    setIsUserDead,
    setLevelForEditIndex,
    updateLevels,
    setLevelForEdit
} = appSlice.actions;

const store = configureStore({
    reducer: appSlice.reducer
})

store.subscribe(() => console.log(1111, store.getState()))

export default appSlice.reducer;