import {createSlice, configureStore} from '@reduxjs/toolkit'
import {game} from "../util/game";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        selectedLevel: 1,
        editLevel: 1,
        gameSpeed: 1,
        userBulletsInClip: 0,
        maxUserBulletsInClip: 0,
        isGamePaused: false,
        isSoundEnabled: false,
        isShowSettings: false,
    },
    reducers: {
        setSelectedLevel: ((state, payload) => {
            state.selectedLevel = payload.value;
        }),
        setUserBulletsInClip: (state, {payload}) => {
            state.userBulletsInClip = payload
        },
        setMaxUserBulletsInClip: (state, {payload}) => {
            state.maxUserBulletsInClip = payload
        },
        incrementSelectedLevel: (state) => {
            state.selectedLevel++
        },
        decrementSelectedLevel: (state) => {
            state.selectedLevel--
        },
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
    }
})
export const {
    enableAutoShoot,
    disableAutoShoot,
    incrementSelectedLevel,
    decrementSelectedLevel,
    enableSound,
    disableSound,
    setUserBulletsInClip,
    setMaxUserBulletsInClip,
    openSettings,
    closeSettings,
} = appSlice.actions;

const store = configureStore({
    reducer: appSlice.reducer
})

store.subscribe(() => console.log(1111, store.getState()))

export default appSlice.reducer;