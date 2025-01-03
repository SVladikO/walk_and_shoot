import {createSlice, configureStore} from '@reduxjs/toolkit'
import {game} from "../util/game";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        selectedLevel: 1,
        editLevel: 1,
        isGamePaused: false,
        selectedGun: null,
        userBulletsInClip: 0,
        maxUserBulletsInClip: 0,
        isSoundEnabled: true,
        isAutoShootEnabled: true,
        gameSpeed: 1,
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
        enableAutoShoot: state => {
            game.isAutoShootEnabled = true;
            state.isAutoShootEnabled = true
        },
        disableAutoShoot: state => {
            game.isAutoShootEnabled = false;
            state.isAutoShootEnabled = false
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
} = appSlice.actions;

const store = configureStore({
    reducer: appSlice.reducer
})

store.subscribe(() => console.log(1111, store.getState()))

export default appSlice.reducer;